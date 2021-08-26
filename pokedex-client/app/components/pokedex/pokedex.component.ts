import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { PokeApi } from '@models/poke-api';
import { Pokemon } from '@models/pokemon';
import { PokemonDetail } from '@models/pokemon-detail';
import { PokedexService } from '@services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PokedexComponent implements AfterViewInit {

  isLoggedIn = false;
  searchingByType = '';
  isApplyingType = false;
  shouldShowElevation = false;
  shouldShowScrollTopButton = false;
  isLoading = false;
  pokemons: Pokemon[] = [];
  originalPokemons: Pokemon[] = [];
  pokemonsByType: Pokemon[] = [];
  nextUrl = '';

  @ViewChild('searchInput') input: any;

  constructor(private pokedexService: PokedexService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getPokemons();
    }, 0);
  }

  private getPokemons(pokemonId?: string): void {
    this.isLoading = true;
    this.pokedexService.getPokemons(this.nextUrl).subscribe(
      response => this.handleSuccessfulGetPokemons(response, pokemonId),
      error => this.isLoading = false
    );
  }

  private handleSuccessfulGetPokemons(response: PokeApi, pokemonId?: string): void {
    this.nextUrl = response.next;

    const partialPokemons = response.results as Pokemon[];
    if (partialPokemons?.length > 0) {
      this.getPokemonDetails(partialPokemons, pokemonId);
    }

    const filterValue = this.input.nativeElement.value;
    if (filterValue !== '' && !this.isApplyingType) {
      this.originalPokemons = [...this.originalPokemons, ...partialPokemons];
      const filteredPartialPokemons = partialPokemons.filter(pokemon => pokemon.name.includes(filterValue));
      if (filteredPartialPokemons.length === 0) {
        this.onScroll();
      } else {
        this.pokemons = [...this.pokemons, ...filteredPartialPokemons];
      }
    } else {
      this.pokemons = [...this.pokemons, ...partialPokemons];
      this.originalPokemons = [...this.pokemons];
    }
  }

  private getPokemonDetails(pokemons: Pokemon[] = this.pokemons, pokemonId?: string): void {
    if (pokemons.length > 0) {
      this.isLoading = true;
      const getPokemons$ = pokemons.map((pokemon: any) => this.pokedexService.getPokemon(pokemon.url));
      getPokemons$.forEach((getPokemon$, index: number) => {
        getPokemon$.subscribe(
          pokemonDetail => {
            pokemons[index].details = this.buildPokemonDetails(pokemonDetail);
            setTimeout(() => this.clickOnNextPokemonFromDialog(pokemonId), 0);
          },
          error => this.isLoading = false,
          () => {
            if (getPokemons$.length - 1 === index) {
              this.isLoading = false;
            }
          }
        )
      });
    }
  }

  private clickOnNextPokemonFromDialog(pokemonId: string | undefined): void {
    if (pokemonId) {
      const pokemonElement = document.getElementById(pokemonId) as HTMLElement;
      if (pokemonElement) pokemonElement.click()
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

  onScroll(pokemonId?: string): void {
    if (this.nextUrl && !this.isApplyingType && !this.isLoading) {
      this.getPokemons(pokemonId);
    }
  }

  getId(url = ''): string {
    return url.split('pokemon/')[1]?.split('/')[0];
  }

  onTypeClick(type: string): void {
    this.pokemons.length = 0;
    this.isLoading = true;
    this.isApplyingType = true;
    const previousType = this.searchingByType;
    this.searchingByType = type;
    this.pokedexService.getPokemonsByType(type).subscribe(
      pokemonType => this.handleSuccessfulGetPokemonsByType(pokemonType.pokemon),
      error => {
        this.isLoading = false;
        this.searchingByType = previousType || 'N/A';
      }
    );
  }

  private handleSuccessfulGetPokemonsByType(pokemon: any): void {
    this.pokemonsByType = [...pokemon.map((item: { pokemon: Pokemon; }) => item.pokemon)];
    this.pokemons = [...this.pokemonsByType];
    this.applyFilterByType(this.input.nativeElement.value);
  }

  onResetClick(): void {
    this.onScrollToTopClick({ top: 0 });
    this.pokemons.length = 0;
    this.nextUrl = '';
    this.isApplyingType = false;
    this.input.nativeElement.value = '';
    setTimeout(() => {
      this.getPokemons();
    }, 0);
  }

  applyFilterByType(value: string): void {
    const filterValue = value.trim().toLowerCase();
    if (filterValue !== '') {
      this.pokemons = this.pokemonsByType.filter(pokemon => pokemon.name.includes(filterValue));
    } else {
      this.pokemons = [...this.pokemonsByType];
    }
    this.getPokemonDetails();
  }

  applyFilter(event: KeyboardEvent): void {
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

  onClearSearchClick(input: HTMLInputElement): void {
    input.value = '';
    this.applyNoFilter();
  }

  private applyNoFilter(): void {
    if (this.isApplyingType) {
      this.pokemons = [...this.pokemonsByType];
      this.getPokemonDetails();
    } else {
      this.pokemons = [...this.originalPokemons];
    }
  }

  onScrollToTopClick(options: ScrollToOptions = { top: 0, behavior: 'smooth' }): void {
    window.scroll(options);
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(): void {
    this.shouldShowScrollTopButton = window.pageYOffset > 1260;
    this.shouldShowElevation = window.pageYOffset > 20;
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

}
