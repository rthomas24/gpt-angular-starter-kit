import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatBotState, chatBotFeatureKey } from './chat-bot.reducer';

const documentDataState = createFeatureSelector<ChatBotState>(chatBotFeatureKey);

export const getGPTMessages = createSelector(
    documentDataState,
    (state: ChatBotState) => state.chatBotMessages
);