import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-trainer-card-dialog',
  templateUrl: './trainer-card-dialog.component.html',
  styleUrls: ['./trainer-card-dialog.component.scss']
})
export class TrainerCardDialogComponent implements OnInit {

  isLoading = true;
  user: User = { _id: '', email: '', name: '' };

  constructor(
    private userService: UserService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUser(this.authService.currentUser._id).subscribe(
      user => {
        this.isLoading = false;
        console.log(user);
      },
      errorResponse => this.isLoading = false
    );
  }

}
