import { Injectable, ErrorHandler } from '@angular/core';
import { QuizError } from '../models';
import { LoggerService } from './logger.service';

@Injectable()
export class QuizErrorHandlerService implements ErrorHandler {
    constructor(private loggerService: LoggerService) { }
    handleError(error: any): void {
        let customError:QuizError = new QuizError();
        customError.errorNumber = 400;
        customError.message = (<Error>error).message;
        customError.friendlyMessage = 'An system error occurred. Please try again.';

        this.loggerService.error(error.message);
    }
}