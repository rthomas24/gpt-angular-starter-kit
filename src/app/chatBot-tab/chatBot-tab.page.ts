import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map, tap } from 'rxjs';
import { addUserMessage, sendNewGPTMessage } from '../events/chat-bot.actions';
import { getGPTMessages } from '../events/chat-bot.selectors';

@Component({
  selector: 'chatBot-tab',
  templateUrl: 'chatBot-tab.page.html',
  styleUrls: ['chatBot-tab.page.scss']
})
export class ChatBotTab {
  public messageHistory = []
  public chatHistory: ChatHistory[] = []
  public userMessage = ''
  public isLoadingAIMessage = false
  public fileName: string = 'structuredDR.txt'
  
  public GPTMessages$: Observable<string[]>

  public quickSelect = [
      "This is sample Question 1?",
      "This is sample Question 2?",
      "This is sample Question 3?",
      "This is sample Question 4?",
      "This is sample Question 5?",
      "This is sample Question 6?",
      "This is sample Question 7?",
  ]

  
  constructor(private store: Store) {
      this.GPTMessages$ = this.store.select(getGPTMessages)
      
      this.GPTMessages$.pipe(
        filter((response) => !!this.userMessage && response.length % 2 === 0),
        map((response) => {
          this.addChatHistory(response[response.length - 1])
          this.isLoadingAIMessage = false
          this.userMessage = ''
        })).subscribe()
  }


  public HNSWLibVector(){
    if(this.userMessage === '') {
      return
    }
    this.store.dispatch(addUserMessage({message: this.userMessage}))
    this.store.dispatch(sendNewGPTMessage({message: this.userMessage, fileName: 'default-file.txt', chatHistory: this.chatHistory}))
    this.isLoadingAIMessage = true
  }

  public addChatHistory(aiResponse: string) {
    const chatHistory: ChatHistory = {ai: aiResponse, human: this.userMessage}
    this.chatHistory = [...this.chatHistory, chatHistory];
  }

   public selector(message:string) {
    this.userMessage = message
  }

}


export interface ChatHistory {
  ai: string
  human: string
}