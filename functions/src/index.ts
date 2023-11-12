import * as cors from 'cors';
import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { formatDocumentsAsString } from "langchain/util/document";
import { StringOutputParser } from "langchain/schema/output_parser";

const corsHandler = cors({ origin: true });
const openAIApiKey = process.env.OPENAI_KEY;
const storage = new Storage();
const bucketName = 'default-bucket';

admin.initializeApp();

// Cloud function to process user input and generate a response using GPT model
export const generateGPTResponse = onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
       
        // Retrieve user input, file name for context data, model selection, and chat history from the request
        const userInputPrompt = request.body.prompt ?? 'This is a test message.';
        const contextFileName = request.body.fileName ?? 'default-context-file.json';
        const modelName = request.body.model ?? 'gpt-3.5-turbo';
        const conversationHistory = request.body.chatHistory ?? [];

        try {
            // Accessing the cloud storage bucket to retrieve context data
            const cloudStorageBucket = storage.bucket(bucketName);
            const contextFile = cloudStorageBucket.file(contextFileName);
            const [contextDataContent] = await contextFile.download();

            // Converting file content to string for processing
            const contextDataAsString = contextDataContent.toString('utf8')

            // Initializing the GPT model with API key, model name, and token limits
            const gptModel = new ChatOpenAI({openAIApiKey, modelName, maxTokens: 200});

            // Creating a retriever to fetch relevant documents based on the model's context
            const documentVectorStore = await HNSWLib.fromDocuments([new Document({ pageContent: contextDataAsString })], new OpenAIEmbeddings({openAIApiKey}));
            const vectorStoreRetriever = documentVectorStore.asRetriever();

            // Function to format chat history into a readable string format
            const formatChatHistory = (history: Array<{ human: string; ai: string }>) => {
                return history.map(interaction => `Human: ${interaction.human}\nAI: ${interaction.ai}`).join('\n\n');
            };

            // Template for structuring the prompt to be sent to the model
            const modelPromptTemplate = PromptTemplate.fromTemplate(
                `Enter your instructions for the model here.
                ----------------
                CONTEXT: {context}
                ----------------
                CHAT HISTORY: {chatHistory}
                ----------------
                QUESTION: {question}
                ----------------
                Helpful Answer:`
            );

            // Sequence of operations for generating the GPT response
            const operationSequence = RunnableSequence.from([
                {
                    // Extract the question from the input
                    question: (input: { question: string; chatHistory?: Array<{ human: string; ai: string }> }) =>
                    input.question,
                    // Format the chat history for the model
                    chatHistory: (input: { question: string; chatHistory?: Array<{ human: string; ai: string }> }) =>
                    formatChatHistory(input.chatHistory || []) ?? "",
                    // Retrieve and serialize relevant documents as context for the model
                    context: async (input: { question: string; chatHistory?: Array<{ human: string; ai: string }> }) => {
                    const relevantDocuments = await vectorStoreRetriever.getRelevantDocuments(input.question);
                    const serializedContext = formatDocumentsAsString(relevantDocuments);
                    return serializedContext;
                    },
                },
                modelPromptTemplate,
                gptModel,
                new StringOutputParser(),
            ]);

            // Invoke the operation sequence with the user's input and chat history
            const gptResponse = await operationSequence.invoke({
                chatHistory: conversationHistory,
                question: userInputPrompt,
            });
            
            // Send the generated response back to the user
            response.send({ answer: gptResponse });

        } catch (error) {
            // Handle any errors during the process
            response.status(500).send('Internal Server Error');
        }
    });
});