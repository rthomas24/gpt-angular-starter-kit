import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ChatBotService } from '../services/chat-bot.service';
import { sendNewGPTMessage, sendNewGPTMessageError, sendNewGPTMessageSuccess } from './chat-bot.actions';

@Injectable()
export class ChatBotEffects {
    constructor(
        private actions$: Actions,
        private chatBotService: ChatBotService
      ) {}


      sendNewMessage$ = createEffect(() => this.actions$.pipe(
        ofType(sendNewGPTMessage),
        switchMap(({message, fileName, chatHistory}) => this.chatBotService.HNSWLibVectorCall(message, fileName, chatHistory).pipe(
          map(message => sendNewGPTMessageSuccess({newMessage: message})),
          catchError(error => of(sendNewGPTMessageError({error})))
        ))
      ));


}
