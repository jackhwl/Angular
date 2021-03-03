import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import {
  ComposeCmp,
  ConversationCmp,
  ConversationsCmp,
  MessageCmp,
  MessagesCmp
} from './conversations';
import { Actions, Repo } from './shared/model';

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

export function conversationsResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) =>
    repo.conversations(route.params['folder']);
}

export function conversationResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) =>
    repo.conversation(+route.params['id']);
}

export function messagesResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) =>
    repo.messageTitles(+route.parent.params['id']);
}

export function messageResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) => repo.message(+route.params['id']);
}

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
