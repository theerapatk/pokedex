import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularWelcomeComponent } from './components/angular-welcome/angular-welcome.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { TestComponent } from './components/test/test.component';
import { DetailDialogLoadingComponent } from './dialogs/detail-dialog-loading/detail-dialog-loading.component';
import { PokemonDetailDialogComponent } from './dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';
import { PokemonClick } from './directives/pokemon-click';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PokedexComponent,
    AngularWelcomeComponent,
    PokemonDetailDialogComponent,
    PokemonClick,
    DetailDialogLoadingComponent
  ],
  entryComponents: [
    PokemonDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
