import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ComposeCmp,
  ConversationCmp,
  ConversationsCmp,
  MessageCmp,
  MessagesCmp
} from './conversations/index';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inbox' },
  {
    path: ':folder',
    children: [
      {
        path: '',
        component: ConversationsCmp,
        resolve: { conversations: 'conversationsResolver' }
      },
      {
        path: ':id',
        component: ConversationCmp,
        resolve: { conversation: 'conversationResolver' },
        children: [
          {
            path: '',
            component: MessagesCmp,
            resolve: { messages: 'messagesResolver' }
          },
          {
            path: 'messages/:id',
            component: MessageCmp,
            resolve: {
              messages: 'messagesResolver',
              message: 'messageResolver'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'compose',
    component: ComposeCmp,
    outlet: 'popup'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
