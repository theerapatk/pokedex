import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';
import { TrainerCardDialogComponent } from '@dialogs/trainer-card-dialog/trainer-card-dialog.component';
import { AuthenticationService } from '@services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    public authService: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onLogInClick(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '100%',
      panelClass: 'login-dialog-responsive',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success === true) {
        this.router.navigate(['/admin/manage-trainers']);
      }
    });
  }

  openTrainerCard() {
    const dialogRef = this.dialog.open(TrainerCardDialogComponent, {
      width: '100%',
      panelClass: 'dialog-responsive',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  onLogOutClick(): void {
    this.toastrService.success('Logged out successfully');
    this.authService.logout();
  }

}
