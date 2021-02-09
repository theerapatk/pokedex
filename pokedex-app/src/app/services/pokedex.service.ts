import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeApi } from '../models/poke-api';
import { PokemonDetail } from '../models/pokemon-detail';

export const pokeApiUrl = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  getPokemons(nextUrl: string = ''): Observable<any> {
    let url = nextUrl.trim() === '' ? 'https://pokeapi.co/api/v2/pokemon' : nextUrl;
    return this.http.get<PokeApi>(url);
  }

  getPokemon(url: string) {
    return this.http.get<PokemonDetail>(url);
  }

  getPokemonByType(type: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/type/${type}`);
  }

  getByFullUrl(url: string) {
    return this.http.get<any>(url);
  }

}
