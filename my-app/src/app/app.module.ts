import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularWelcomeComponent } from './components/angular-welcome/angular-welcome.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { TestComponent } from './components/test/test.component';
import { PokemonDetailDialogComponent } from './dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';
import { PokemonClick } from './directives/pokemon-click';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PokedexComponent,
    AngularWelcomeComponent,
    PokemonDetailDialogComponent,
    PokemonClick
  ],
  entryComponents: [
    PokemonDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
