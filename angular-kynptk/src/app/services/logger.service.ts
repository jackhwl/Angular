import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {

    private getDataTime() {
        return new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString();
    }

    log(message: string): void {
        console.log(`${message} (${this.getDataTime()})`);
    }

    info(message: string): void {
        console.info(`Info: ${message} (${this.getDataTime()})`);
    }

    warn(message: string): void {
        console.warn(`Warnning: ${message} (${this.getDataTime()})`);
    }

    error(message: string): void {
        console.error(`ERROR: ${message} (${this.getDataTime()})`);
    }
}