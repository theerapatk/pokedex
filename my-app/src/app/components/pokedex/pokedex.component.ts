import { Component, HostListener, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { PokeApi } from 'src/app/models/poke-api';
import { PokeApiResult } from 'src/app/models/poke-api-result';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  shouldShowScrollButton = false;
  value = '';
  isLoading = true;
  pokemons: PokeApiResult[] = [];
  originalPokemons: PokeApiResult[] = [];
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
    this.originalPokemons = [...this.pokemons];
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
    this.originalPokemons = [...this.pokemons];
    this.nextUrl = response.next;

    this.getPokemonDetails();
  }

  onResetClick() {
    this.pokemons.length = 0;
    this.nextUrl = '';
    this.pokemons = [...this.originalPokemons];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue !== '') {
      let filteredList = this.originalPokemons.filter(pokemon => pokemon.name.includes(filterValue));
      this.pokemons = filteredList;
    } else {
      this.pokemons = [...this.originalPokemons];
    }
  }

  onClearSearchClick(input: HTMLInputElement) {
    input.value = '';
    this.pokemons = [...this.originalPokemons];
  }

  onScrollToTopClick() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(event: any) {
    if (window.pageYOffset > 1500) {
      this.shouldShowScrollButton = true;
    } else {
      this.shouldShowScrollButton = false;
    }
  }

}
