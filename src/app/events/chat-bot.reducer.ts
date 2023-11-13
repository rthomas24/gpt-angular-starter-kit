import { createReducer, on } from '@ngrx/store';
import { addUserMessage, sendNewGPTMessageSuccess } from './chat-bot.actions';
import { ChatHistory } from '../chatBot-tab/chatBot-tab.page';

export const chatBotFeatureKey = 'chat-bot'

export interface ChatBotState {
    chatBotMessages: ChatHistory[]
}

const initialState: ChatBotState = {
    chatBotMessages: []
};

export const chatBotReducer = createReducer(
  initialState,
  on(sendNewGPTMessageSuccess, (state: ChatBotState , { newMessage, aiMessage }) =>
  {
    const parseResponse = JSON.parse(aiMessage).answer

    const newChat: ChatHistory = {...state.chatBotMessages[state.chatBotMessages.length - 1], ai: parseResponse}

    const updatedChatBotMessages = [...state.chatBotMessages]
    updatedChatBotMessages[state.chatBotMessages.length - 1] = newChat

    return {
        ...state,
        chatBotMessages: updatedChatBotMessages
    }
  }),
  on(addUserMessage, (state: ChatBotState , { message }) =>
  {
    const constructChat: ChatHistory = {human: message, ai: ''} 
    return {
        ...state,
        chatBotMessages: [...state.chatBotMessages, constructChat]
    }
  })
);
