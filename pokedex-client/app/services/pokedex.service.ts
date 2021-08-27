import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeApi } from '../models/poke-api';
import { PokemonDetail } from '../models/pokemon-detail';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class PokedexService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getPokemons(nextUrl: string): Observable<any> {
    const queryParams = nextUrl?.split('?')[1] || '';
    return this.http.get<PokeApi>(`${this.url}/poke-api/pokemons?${queryParams}`);
  }

  getPokemon(url: string): Observable<PokemonDetail> {
    const id = url.split('https://pokeapi.co/api/v2/pokemon/')[1].replace('/', '');
    return this.http.get<PokemonDetail>(`${this.url}/poke-api/pokemons/${id}/`);
  }

  getPokemonsByType(type: string): Observable<any> {
    return this.http.get<any>(`${this.url}/poke-api/types/${type}`);
  }

  getByFullUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
