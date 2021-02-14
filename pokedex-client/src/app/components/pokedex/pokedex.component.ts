import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokeApi } from 'src/app/models/poke-api';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonDetail } from 'src/app/models/pokemon-detail';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  searchingByType = '';
  isApplyingType = false;
  shouldShowScrollTopButton = false;
  isLoading = false;
  pokemons: Pokemon[] = [];
  originalPokemons: Pokemon[] = [];
  pokemonsByType: Pokemon[] = [];
  nextUrl: string = '';

  @ViewChild('searchInput') input: any;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
    this.isLoading = true;
    this.pokedexService.getPokemons(this.nextUrl).subscribe(
      response => this.handleSuccessfulGetPokemons(response),
      error => this.isLoading = false
    );
  }

  private handleSuccessfulGetPokemons(response: PokeApi): void {
    const partialPokemons = response.results as Pokemon[];
    this.pokemons = [...this.pokemons, ...partialPokemons];
    this.originalPokemons = [...this.pokemons];
    this.nextUrl = response.next;
    this.getPokemonDetails(partialPokemons);
  }

  private getPokemonDetails(pokemons: Pokemon[] = this.pokemons) {
    if (pokemons.length > 0) {
      const calls = pokemons.map((pokemon: any) => this.pokedexService.getPokemon(pokemon.url));
      this.isLoading = true;
      forkJoin(calls).subscribe(
        pokemonDetails => {
          pokemons.forEach((pokemon, index) =>
            pokemon.details = this.buildPokemonDetails(pokemonDetails[index]));
          this.isLoading = false;
        },
        error => this.isLoading = false
      );
    }
  }

  private buildPokemonDetails(pokemonDetail: PokemonDetail): PokemonDetail {
    return {
      types: pokemonDetail.types,
      sprites: {
        front_default: pokemonDetail.sprites.front_default
      }
    };
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
    this.pokedexService.getPokemonByType(type).subscribe(
      pokemonType => this.handleSuccessfulGetPokemonByType(pokemonType.pokemon),
      error => {
        this.isLoading = false;
        this.searchingByType = previousType;
      }
    );
  }

  private handleSuccessfulGetPokemonByType(pokemon: any): void {
    this.pokemonsByType = [...pokemon.map((item: { pokemon: Pokemon; }) => item.pokemon)];
    this.pokemons = [...this.pokemonsByType];
    this.applyFilterByType(this.input.nativeElement.value);
  }

  onResetClick() {
    this.onScrollToTopClick({ top: 0 });
    this.pokemons.length = 0;
    this.nextUrl = '';
    this.isApplyingType = false;
    this.input.nativeElement.value = '';
    setTimeout(() => {
      this.getPokemons();
    }, 0);
  }

  applyFilterByType(value: string) {
    const filterValue = value.trim().toLowerCase();
    if (filterValue !== '') {
      this.pokemons = this.pokemonsByType.filter(pokemon => pokemon.name.includes(filterValue));
    } else {
      this.pokemons = [...this.pokemonsByType];
    }
    this.getPokemonDetails();
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue !== '') {
      if (this.isApplyingType) {
        this.pokemons = this.pokemonsByType.filter(pokemon => pokemon.name.includes(filterValue));
        this.getPokemonDetails();
      } else {
        this.pokemons = this.originalPokemons.filter(pokemon => pokemon.name.includes(filterValue));
      }
    } else {
      this.applyNoFilter();
    }
  }

  onClearSearchClick(input: HTMLInputElement) {
    input.value = '';
    this.applyNoFilter();
  }

  private applyNoFilter() {
    if (this.isApplyingType) {
      this.pokemons = [...this.pokemonsByType];
      this.getPokemonDetails();
    } else {
      this.pokemons = [...this.originalPokemons];
    }
  }

  onScrollToTopClick(options: ScrollToOptions = { top: 0, behavior: 'smooth' }) {
    window.scroll(options);
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight() {
    this.shouldShowScrollTopButton = window.pageYOffset > 1260;
  }

}
