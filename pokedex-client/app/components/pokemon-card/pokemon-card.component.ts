import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: any;
  @Output() typeClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getId(url: string = ''): string {
    return url.split('pokemon/')[1]?.split('/')[0];
  }

  onTypeClick(type: string): void {
    this.typeClick.emit(type);
  }

}
