import { Injectable } from '@angular/core';

@Injectable()
export class BadgeService {

  constructor() { }

  getReaderBadge(mintesRead: number): string {
    if (mintesRead > 5000) {
      return 'Book Worm';
    } else if(mintesRead > 2500){
      return 'Page Turner';
    } else {
      return 'Getting Started';
    }
  }
}
