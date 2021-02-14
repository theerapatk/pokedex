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
      this.openDialog(closestMatCard);
    }
  }

  openDialog(element: HTMLElement) {
    let dialogRef = this.dialog.open(PokemonDetailDialogComponent, {
      width: '600px',
      panelClass: 'dialog-responsive',
      data: {
        selfUrl: element.id,
        previous: element.previousElementSibling,
        next: element.nextElementSibling
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let element: HTMLElement = document.getElementById(result.id) as HTMLElement;
        element?.click();
      }
    });
  }
}