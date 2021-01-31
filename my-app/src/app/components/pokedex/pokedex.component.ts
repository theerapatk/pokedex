import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
    this.pokedexService.getPokemons(this.nextUrl).subscribe(
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
    this.pokemons.forEach(pokemon => pokemonDetailsCalls.push(this.pokedexService.getPokemon(pokemon.url)));
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

  getId(url: string): string {
    return url.split('pokemon/')[1].split('/')[0];
  }

}
