import { createAction, props } from '@ngrx/store';
import { ChatHistory } from '../chatBot-tab/chatBot-tab.page';

export const addUserMessage = createAction(
  '[ChatBot] Add user message to thread',
  props<{ message: string }>()
);

export const sendNewGPTMessage = createAction(
  '[ChatBot] Send New Message to thread',
  props<{ message: string, fileName: string, chatHistory: ChatHistory[] }>()
);

export const sendNewGPTMessageSuccess = createAction(
  '[ChatBot] Send New Message to thread  Success',
  props<{ newMessage: any }>()
  );
  
export const sendNewGPTMessageError = createAction(
  '[ChatBot] Send New Message to thread Error',
  props<{ error: Error }>()
);