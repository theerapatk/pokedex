import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';
import { PokeApi } from '@models/poke-api';
import { Pokemon } from '@models/pokemon';
import { PokemonDetail } from '@models/pokemon-detail';
import { AuthenticationService } from '@services/authentication.service';
import { PokedexService } from '@services/pokedex.service';
import { UserService } from '@services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  isLoggedIn = false;
  searchingByType = '';
  isApplyingType = false;
  shouldShowScrollTopButton = false;
  isLoading = false;
  pokemons: Pokemon[] = [];
  originalPokemons: Pokemon[] = [];
  pokemonsByType: Pokemon[] = [];
  nextUrl = '';

  @ViewChild('searchInput') input: any;

  constructor(
    private pokedexService: PokedexService,
    private userService: UserService,
    public authService: AuthenticationService,
    public dialog: MatDialog
  ) { }

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

  private getPokemonDetails(pokemons: Pokemon[] = this.pokemons): void {
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

  onTypeClick(type: string): void {
    this.pokemons.length = 0;
    this.isLoading = true;
    this.isApplyingType = true;
    const previousType = this.searchingByType;
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
  }

  onLogInClick(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '460px',
      panelClass: 'dialog-responsive',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  onLogOutClick(): void {
    this.authService.logout();
  }

  onMenuClicked(): void {
    this.userService.getUser(this.authService.currentUser).subscribe(
      (response: any) => {
        console.log(response);
        setTimeout(() => {
          this.userService.getUser(this.authService.currentUser).subscribe(
            (response: any) => {
              console.log(response);
            },
            (errorResponse: any) => {
              console.log(errorResponse);
            }
          );
        }, 1000);
      },
      (errorResponse: any) => {
        console.log(errorResponse);
      }
    );
  }

}
