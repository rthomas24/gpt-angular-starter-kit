import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatBotTab } from './chatBot-tab.page';

import { ChatBotTabRoutingModule } from './chatBot-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatBotTabRoutingModule
  ],
  declarations: [ChatBotTab]
})
export class ChatBotTabModule {}
