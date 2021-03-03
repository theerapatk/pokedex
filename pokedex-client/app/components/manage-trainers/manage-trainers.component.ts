import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '@dialogs/delete-dialog/delete-dialog.component';
import { UserDialogComponent } from '@dialogs/user-dialog/user-dialog.component';
import { User } from '@models/user.model';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-trainers',
  templateUrl: './manage-trainers.component.html',
  styleUrls: ['./manage-trainers.component.scss']
})
export class ManageTrainersComponent implements OnInit {

  displayedColumns = ['email', 'name', '_id', 'role', 'action'];
  selectedFilterColumn = 'email';

  readonly pageSizeOptions = [6, 16, 30];
  readonly USER_COLUMN_MAP: any = {
    email: 'Email',
    name: 'Name',
    _id: 'Trainer ID',
    role: 'Rank'
  };

  isLoading = true;
  selectColumnOptions: any = [];
  excludedSelectColumnOptions = ['action'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(
    private service: UserService,
    private toastrService: ToastrService,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(isCreatingNew = false): void {
    this.isLoading = true;
    this.service.getUsers().subscribe(
      users => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(users as User[]);
        this.proceedSuccessResponse(isCreatingNew, '_id');
      },
      errorResponse => this.isLoading = false
    );
  }

  proceedSuccessResponse(isCreatingNew = true, columnId: string): void {
    this.sort.sortChange.subscribe(() => this.paginator.firstPage());

    if (isCreatingNew) {
      if (this.sort.direction !== 'desc' && columnId) {
        this.sort.sort({ disableClear: true, id: columnId, start: 'desc' });
      }
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initSelectColumnOptions();
    this.setUpFilterPredicate();
  }

  initSelectColumnOptions(): void {
    this.selectColumnOptions = Array.from(this.displayedColumns)
      .filter(column => !this.excludedSelectColumnOptions.includes(column))
      .map(optionValue => {
        return {
          value: optionValue,
          viewValue: this.USER_COLUMN_MAP[optionValue]
        };
      });
  }

  setUpFilterPredicate(): void {
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const rowValue = row[this.selectedFilterColumn];
      if (rowValue) {
        if (Array.isArray(rowValue)) {
          return rowValue.map(value => value.toLowerCase()).includes(filter);
        } else {
          return rowValue.toString().toLowerCase().includes(filter);
        }
      } else {
        return false;
      }
    };
  }

  onCreateOrEditClicked(row?: User): void {
    this.openUpdateDialog(UserDialogComponent, row).afterClosed().subscribe(
      result => {
        if (result && result.success === true) {
          this.checkIfSelfUpdate(result);
          this.getUsers(result.isCreatingNew);
          let toastMessage = `The trainer whose email is ${result.entityId} has been created`;
          if (!result.isCreatingNew) {
            toastMessage = `Trainer ID: ${result.entityId} has been updated`;
          }
          this.toastrService.success(toastMessage);
        }
      }
    );
  }

  private checkIfSelfUpdate(result: any): void {
    const currentUser = this.authService.currentUser;
    if (!result.isCreatingNew && currentUser._id === result.user._id) {
      this.authService.updateCurrentUser(result.user);
      const newRole = result.user.role?.text || '';
      if (newRole.toLowerCase() !== 'admin') {
        this.router.navigate(['/pokedex']);
      }
    }
  }

  openUpdateDialog(dialogComponent: any, row: any): MatDialogRef<UserDialogComponent> {
    return this.dialog.open(dialogComponent, {
      data: { row },
      autoFocus: true,
      disableClose: true,
      width: '100%',
      panelClass: 'login-dialog-responsive',
    });
  }

  onDeleteClientClicked(row: User): void {
    this.openDeleteDialog({
      title: 'Delete Trainer',
      content: `Are you sure you want to delete the trainer whose email is <em><u>${row.email}</u></em> ?`,
      dataType: 'trainer',
      row
    }).afterClosed().subscribe(
      result => {
        if (result && result.success === true) {
          this.getUsers();
          this.toastrService.success(`The trainer whose email is ${result.entityId} has been deleted`);
        }
      }
    );
  }

  openDeleteDialog(data: any): MatDialogRef<DeleteDialogComponent> {
    return this.dialog.open(DeleteDialogComponent, {
      data,
      autoFocus: false,
      disableClose: true,
      width: '100%',
      panelClass: 'login-dialog-responsive',
    });
  }

  onSelectColumnChanged(column: string): void {
    this.selectedFilterColumn = column;
  }

  onFilterTextChanged(filterText: string): void {
    this.dataSource.filter = filterText.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFilterTextCleared(filterText: string): void {
    this.dataSource.filter = filterText;
  }

}
