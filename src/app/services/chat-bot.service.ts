import { Injectable } from '@angular/core';
import { ChatHistory } from '../chatBot-tab/chatBot-tab.page';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http: HttpClient) { }

  public sendGPTMessage(prompt: string, filename: string, chatHistory: ChatHistory[]): Observable<string>{
    const model = 'gpt-4'
    const url = 'YOUR_CLOUD_FUNCTUON_API_URL_HERE'
    return this.http.post(url, {prompt, filename, model, chatHistory}, /*{ headers, responseType: 'text' }*/)
      .pipe(
        map((data: any) => data))
  }

}
