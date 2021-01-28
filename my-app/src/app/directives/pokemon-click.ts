import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailDialogComponent } from '../dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';

@Directive({ selector: '[pokemonClick]' })
export class PokemonClick {

  constructor(public dialog: MatDialog) { }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    let element = event.target as HTMLElement;
    if (element.tagName.toLowerCase() === "mat-card") {
      this.openDialog(element.id);
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