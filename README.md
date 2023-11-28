(I will add sample env files in order to get the keys set up soon)

## Introduction
This starter kit is perfect for developers looking to create applications that leverage the power of GPT for document-based question-answering interfaces, with a robust and modern frontend developed in Angular. This ia an innovative project integrating Angular, Ionic, and Capacitor with Google Cloud and Firebase. This starter kit enables you to create a chatbot interface powered by Chat GPT and the LangChain framework, leveraging a large language model (LLM) for responding to user queries. It also incorporates HNSWLib, an open-source vector storage solution, to enhance its capabilities.

## Features
- Angular-based frontend with Ionic and Capacitor for a responsive, cross-platform chat interface.
- Integration with Google Cloud Storage for retrieving text or JSON files.
- Use of LangChain framework to streamline interactions with a Chat GPT model.
- Stylish chat interface designed to provide a seamless user experience.
- HNSWLib integration for advanced vector storage and retrieval.

## Prerequisites
To use this starter kit, ensure you have the following:
- Node.js and npm installed.
- Angular CLI installed.
- Ionic and Capacitor installed.
- A Google Cloud account with billing enabled.
- Firebase project set up.
- Access to OpenAI API (require your own API key).

## Installation and Setup
1. **Clone the Repository:**
   ```
   git clone https://github.com/rthomas24/gpt-angular-starter-kit.git
   cd angular-gpt-starter-kit
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Google Cloud & Firebase Setup:**
   - Set up a Google Cloud project and enable Cloud Storage.
   - Create a Firebase project and link it to your Google Cloud project.
   - Deploy the provided cloud function to Google Cloud.
      ```
      firebase deploy --only functions
      ```
   - Upload your `.txt` or `.json` file to your Google Cloud Storage bucket.

4. **Configuration:**
   - In the project, locate the configuration file and update it with your Google Cloud and Firebase project details.
   - Specify the name of the file you uploaded to Google Cloud Storage in the code.
   - Import your OpenAI API key into the project.

## Usage
After completing the setup, you can start the project using:
```
ionic serve
```
This will launch the chat interface in your default web browser. Interact with the chatbot, and it will retrieve content from the specified file in Google Cloud Storage to answer queries.

