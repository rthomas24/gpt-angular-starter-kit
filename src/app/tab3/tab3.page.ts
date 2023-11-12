import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public messageHistory = ['Hi, I am your AI Helper! Please ask me any questions about your childs daily activities!']
  public chatHistory: string[] = []
  public userMessage = ''
  public isLoadingAIMessage = false
  public fileName: string = 'structuredDR.txt'
  
  // public publicGPTMessages$: Observable<string[]>

  public quickSelect = [
      "This is sample Question 1?",
      "This is sample Question 2?",
      "This is sample Question 3?",
      "This is sample Question 4?",
      "This is sample Question 5?",
      "This is sample Question 6?",
      "This is sample Question 7?",
  ]

  
  constructor() {}


   public selector(message:string) {
    this.userMessage = message
  }

}
