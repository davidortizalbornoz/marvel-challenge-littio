/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { Character } from './model/character.model';

@Injectable()
export class AppService
{
  async init(): Promise<Character[]> 
  {
    const personajesArray = await this.getPersonajes();
    personajesArray.sort((a, b) => b.available - a.available);
    personajesArray.forEach((character, index) => {
      character.order = index + 1;
      delete character.available;
    });
    return personajesArray;
  }

  async getPersonajes(): Promise<Character[]> {
    const personajesArray: Character[] = [];
    const rawData = fs.readFileSync('personajes.json', 'utf8');
    const items = JSON.parse(rawData);

    for (const item of items) {
      const segments = item.resourceURI.split('/');
      const id = segments[segments.length - 1];
      const responsePersonaje = await this.getCharacterById(id);
      const available: number =
        responsePersonaje.data.data.results[0].comics.available;
      const description = responsePersonaje.data.data.results[0].description;
      const personajeObj = new Character(
        id,
        item.name,
        description,
        'url',
        available,
      );
      personajesArray.push(personajeObj);
    }
    return personajesArray;
  }

  async getCharacterById(id: string): Promise<any> {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: {
          apikey: '811177f58e832a06f7a4c8e2d7258a67',
          ts: '2025-01-14T21:40:23-03:00',
          hash: 'a7abddbdf6473f23bbc694879ab7408b',
        },
      },
    );
    return response;
  }
}
