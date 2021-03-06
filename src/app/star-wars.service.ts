import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];

  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;
  results: any[];

  constructor(logService: LogService, http: HttpClient) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
      .subscribe(
        (data) => {
          console.log(data);
          console.log(typeof data);
          const extractedChars = data['results'];
          const chars = extractedChars.map((char) => {
            return { name: char.name, side: '' };
          });

          this.characters = chars;
          this.charactersChanged.next();
        }
      );
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = { name, side };
    this.characters.push(newChar);
  }

}

