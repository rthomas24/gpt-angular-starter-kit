import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBotTab } from './chatBot-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ChatBotTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatBotTabRoutingModule {}
