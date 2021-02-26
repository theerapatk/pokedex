import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@components/admin/admin.component';
import { ManageTrainersComponent } from '@components/manage-trainers/manage-trainers.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [{
    path: 'manage-trainers', component: ManageTrainersComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
