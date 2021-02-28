import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailDialogComponent } from '../dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';

@Directive({ selector: '[appPokemonClick]' })
export class PokemonClickDirective {

  @Output() morePokemonsRequired = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const closestMatCard = target.closest('mat-card') as HTMLElement;
    if (closestMatCard) {
      this.openDialog(closestMatCard);
    }
  }

  openDialog(element: HTMLElement): void {
    const dialogRef = this.dialog.open(PokemonDetailDialogComponent, {
      width: '100%',
      panelClass: 'dialog-responsive',
      data: {
        selfUrl: 'https://pokeapi.co/api/v2/pokemon/' + element.id,
        previous: element.previousElementSibling,
        next: element.nextElementSibling,
        selfId: element.id
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const pokemonElement = document.getElementById(result.id) as HTMLElement;
        if (pokemonElement) {
          pokemonElement.click();
        } else {
          this.morePokemonsRequired.emit(result.id);
        }
      }
    });
  }
}
