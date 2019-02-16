import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { PlainLoggerService } from './plain-logger.service';
import { dataServiceFactory } from './data.service.factory';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { BookTrackerErrorHandlerService } from './boot-tracker-error-handler.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    // PlainLoggerService,
    // { provide: LoggerService, useExisting: PlainLoggerService },
    // { provide: LoggerService, useValue: {
    //   log: (message) => console.log(`MESSAGE: ${message}`),
    //   error: (message) => console.error(`MESSAGE: ${message}`)
    // } },
    // { provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService] }
    LoggerService, DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService}
  ],
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
