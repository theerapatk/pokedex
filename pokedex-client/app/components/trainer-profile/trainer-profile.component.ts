import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent implements OnInit {

  imgSrc: string | ArrayBuffer | null = '';

  constructor() { }

  ngOnInit(): void { }

  onSelectFile(event: Event) {
    const inputElment = event.target as HTMLInputElement;
    if (inputElment.files && inputElment.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(inputElment.files[0]);
      reader.onload = (event) => {
        this.imgSrc = (event.target as FileReader).result;
      }
    }
  }

}

