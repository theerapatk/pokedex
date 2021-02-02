import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-welcome',
  templateUrl: './angular-welcome.component.html',
  styleUrls: ['./angular-welcome.component.scss']
})
export class AngularWelcomeComponent implements OnInit {

  title = 'my-app';

  constructor() { }

  ngOnInit(): void {
  }

}
