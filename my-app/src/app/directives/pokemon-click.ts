import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailDialogComponent } from '../dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';

@Directive({ selector: '[pokemonClick]' })
export class PokemonClick {

  constructor(public dialog: MatDialog) { }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    let target = event.target as HTMLElement;
    let closestMatCard = target.closest('mat-card') as HTMLElement;
    if (closestMatCard) {
      this.openDialog(closestMatCard.id);
    }
  }

  openDialog(url: string) {
    this.dialog.open(PokemonDetailDialogComponent, {
      height: '600px',
      width: '400px',
      data: { url }
    });
  }
}