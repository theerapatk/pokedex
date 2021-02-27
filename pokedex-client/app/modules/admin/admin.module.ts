import { NgModule } from '@angular/core';
import { AccountMenuComponent } from '@components/account-menu/account-menu.component';
import { AdminComponent } from '@components/admin/admin.component';
import { ColumnFilterComponent } from '@components/column-filter/column-filter.component';
import { ManageTrainersComponent } from '@components/manage-trainers/manage-trainers.component';
import { DeleteDialogComponent } from '@dialogs/delete-dialog/delete-dialog.component';
import { UserDialogComponent } from '@dialogs/user-dialog/user-dialog.component';
import { SharedModule } from '@modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    ManageTrainersComponent,
    UserDialogComponent,
    DeleteDialogComponent,
    ColumnFilterComponent
  ],
  entryComponents: [
    UserDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
