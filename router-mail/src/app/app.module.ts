import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  AppRoutingModule,
  conversationResolver,
  conversationsResolver,
  messageResolver,
  messagesResolver
} from './app-routing.module';

import { AppComponent } from './app.component';
import {
  ComposeCmp,
  ConversationCmp,
  ConversationsCmp,
  MessageCmp,
  MessagesCmp
} from './conversations/index';
import { MailAppCmp } from './mail';
import { Actions, Repo } from './shared/model';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    MailAppCmp,
    ConversationCmp,
    ConversationsCmp,
    MessageCmp,
    MessagesCmp,
    ComposeCmp
  ],
  providers: [
    Repo,
    Actions,
    {
      provide: 'conversationsResolver',
      useFactory: conversationsResolver,
      deps: [Repo]
    },
    {
      provide: 'conversationResolver',
      useFactory: conversationResolver,
      deps: [Repo]
    },
    { provide: 'messagesResolver', useFactory: messagesResolver, deps: [Repo] },
    { provide: 'messageResolver', useFactory: messageResolver, deps: [Repo] }
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  bootstrap: [MailAppCmp]
})
export class AppModule {}
