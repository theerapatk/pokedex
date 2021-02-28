import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from '@components/pokedex/pokedex.component';
import { TestComponent } from '@components/test/test.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'pokedex', component: PokedexComponent },
  {
    path: 'admin', loadChildren: () =>
      import('./modules/admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: '**', component: PokedexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
