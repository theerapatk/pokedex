import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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

  searchingByType = '';
  isApplyingType = false;
  shouldShowScrollButton = false;
  value = '';
  isLoading = false;
  pokemons: PokeApiResult[] = [];
  originalPokemons: PokeApiResult[] = [];
  pokemonsByType: PokeApiResult[] = [];
  nextUrl: string = '';
  subscription: Subscription = new Subscription;

  @ViewChild('searchInput') input: any;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
    this.isLoading = true;
    this.subscription = this.pokedexService.getPokemons(this.nextUrl).subscribe(
      response => this.handleSuccessfulGetPokemons(response),
      error => this.isLoading = false
    );
  }

  private handleSuccessfulGetPokemons(response: PokeApi): void {
    this.pokemons = [...this.pokemons, ...response.results];
    this.originalPokemons = [...this.pokemons];
    this.nextUrl = response.next;
    this.getPokemonDetails();
  }

  private getPokemonDetails() {
    const calls: Observable<any>[] = [];
    this.pokemons.forEach(pokemon => calls.push(this.pokedexService.getPokemon(pokemon.url)));
    forkJoin(calls).subscribe(
      pokemonDetails => this.pokemons.forEach((pokemon, index) => {
        pokemon.details = pokemonDetails[index];
        this.isLoading = false;
      }),
      error => this.isLoading = false);
  }

  onScroll(): void {
    if (this.nextUrl && !this.isApplyingType) {
      this.getPokemons();
    }
  }

  getId(url: string = ''): string {
    return url.split('pokemon/')[1]?.split('/')[0];
  }

  onTypeClick(type: string) {
    this.pokemons.length = 0;
    this.isLoading = true;
    this.isApplyingType = true;
    let previousType = this.searchingByType;
    this.searchingByType = type;
    this.subscription = this.pokedexService.getPokemonByType(type).subscribe(
      response => this.handleSuccessfulGetPokemonByType(response),
      error => {
        this.isLoading = false;
        this.searchingByType = previousType;
      }
    );
  }

  private handleSuccessfulGetPokemonByType(response: any): void {
    this.pokemonsByType = [...response.pokemon.map((item: { pokemon: any; }) => item.pokemon)];
    this.pokemons = [...this.pokemonsByType];
    this.applyFilterByType(this.input.nativeElement.value);
    this.getPokemonDetails();
  }

  onResetClick() {
    this.pokemons.length = 0;
    this.nextUrl = '';
    this.isApplyingType = false;
    this.input.nativeElement.value = '';
    this.getPokemons();
  }

  applyFilterByType(value: string) {
    const filterValue = value.trim().toLowerCase();
    if (filterValue !== '') {
      this.pokemons = this.pokemonsByType.filter(pokemon => pokemon.name.includes(filterValue));
    } else {
      this.pokemons = [...this.pokemonsByType];
    }
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue !== '') {
      if (this.isApplyingType) {
        this.pokemons = this.pokemonsByType.filter(pokemon => pokemon.name.includes(filterValue));
      } else {
        this.pokemons = this.originalPokemons.filter(pokemon => pokemon.name.includes(filterValue));
      }
    } else {
      if (this.isApplyingType) {
        this.pokemons = [...this.pokemonsByType];
      } else {
        this.pokemons = [...this.originalPokemons];
      }
    }
  }

  onClearSearchClick(input: HTMLInputElement) {
    input.value = '';
    if (this.isApplyingType) {
      this.pokemons = [...this.pokemonsByType];
    } else {
      this.pokemons = [...this.originalPokemons];
    }
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
