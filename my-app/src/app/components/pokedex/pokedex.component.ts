import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { PokeApi } from 'src/app/models/poke-api';
import { PokeApiResult } from 'src/app/models/poke-api-result';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  isLoading = true;
  pokemons: PokeApiResult[] = [];
  nextUrl: string = '';
  subscription: Subscription = new Subscription;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
    this.subscription = this.pokedexService.getPokemons(this.nextUrl).subscribe(
      response => this.handleSuccessfulGetPokemons(response)
    );
  }

  private handleSuccessfulGetPokemons(response: PokeApi): void {
    this.pokemons = [...this.pokemons, ...response.results];
    this.nextUrl = response.next;

    this.getPokemonDetails();
  }

  getPokemonDetails() {
    const pokemonDetailsCalls: Observable<any>[] = [];
    this.pokemons.forEach(pokemon => {
      pokemonDetailsCalls.push(this.pokedexService.getPokemon(pokemon.url))
    });
    this.isLoading = true;
    forkJoin(pokemonDetailsCalls).subscribe(pokemonDetails => {
      this.pokemons.forEach((pokemon, index) => {
        pokemon.details = pokemonDetails[index];
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      });
    });
  }

  onScroll(): void {
    if (this.nextUrl) {
      this.getPokemons();
    }
  }

  getId(url: string = ''): string {
    return url.split('pokemon/')[1]?.split('/')[0];
  }

  onTypeClick(type: string) {
    this.pokemons.length = 0;
    this.subscription = this.pokedexService.getPokemonByType(type).subscribe(
      response => this.handleSuccessfulGetPokemonByType(response)
    );
  }

  private handleSuccessfulGetPokemonByType(response: any): void {
    this.pokemons = [...this.pokemons, ...response.pokemon.map((item: { pokemon: any; }) => item.pokemon)];
    this.nextUrl = response.next;

    this.getPokemonDetails();
  }

  onResetClick() {
    this.pokemons.length = 0;
    this.nextUrl = '';
    this.getPokemons();
  }

}
