import { createReducer, on } from '@ngrx/store';
import { addUserMessage, sendNewGPTMessageSuccess } from './chat-bot.actions';

export const chatBotFeatureKey = 'chat-bot'

export interface ChatBotState {
    chatBotMessages: string[]
}

const initialState: ChatBotState = {
    chatBotMessages: []
};

export const chatBotReducer = createReducer(
  initialState,
  on(sendNewGPTMessageSuccess, (state: ChatBotState , { newMessage }) =>
  {
    const parseResponse = JSON.parse(newMessage).answer
    return {
        ...state,
        chatBotMessages: [...state.chatBotMessages, parseResponse]
    }
  }),
  on(addUserMessage, (state: ChatBotState , { message }) =>
  {
    return {
        ...state,
        chatBotMessages: [...state.chatBotMessages, message]
    }
  })
);
