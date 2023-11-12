import * as cors from 'cors';
import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';


const corsHandler = cors({ origin: true });
const openAIApiKey = process.env.OPENAI_KEY;

admin.initializeApp();

export const getGPTResponse = onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
       
        try {

            response.send({ answer: '' });

        } catch (error) {

            response.status(500).send('Internal Server Error');
        }
    });
});