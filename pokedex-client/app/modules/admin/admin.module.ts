import { NgModule } from '@angular/core';
import { AdminComponent } from '@components/admin/admin.component';
import { ManageTrainersComponent } from '@components/manage-trainers/manage-trainers.component';
import { DeleteDialogComponent } from '@dialogs/delete-dialog/delete-dialog.component';
import { UserDialogComponent } from '@dialogs/user-dialog/user-dialog.component';
import { SharedModule } from '@modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    ManageTrainersComponent,
    AdminComponent,
    UserDialogComponent,
    DeleteDialogComponent
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
