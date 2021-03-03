import { Component } from '@angular/core';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent {

  imgSrc: string | ArrayBuffer | null = '';

  onSelectFile(event: Event): void {
    const inputElment = event.target as HTMLInputElement;
    if (inputElment.files && inputElment.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(inputElment.files[0]);
      reader.onload = (progressEvent: ProgressEvent) => {
        this.imgSrc = (progressEvent.target as FileReader).result;
      };
    }
  }

}

