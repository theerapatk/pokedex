import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularWelcomeComponent } from './components/angular-welcome/angular-welcome.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'angular', component: AngularWelcomeComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: '**', component: AngularWelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
