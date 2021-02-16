import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { FacebookModule } from 'ngx-facebook';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularWelcomeComponent } from './components/angular-welcome/angular-welcome.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { TestComponent } from './components/test/test.component';
import { DetailDialogLoadingComponent } from './dialogs/detail-dialog-loading/detail-dialog-loading.component';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { PokemonDetailDialogComponent } from './dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';
import { PokemonClickDirective } from './directives/pokemon-click.directive';
import { CachingInterceptor } from './interceptors/caching.interceptor';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';
import { MessageService } from './services/message.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PokedexComponent,
    AngularWelcomeComponent,
    PokemonDetailDialogComponent,
    PokemonClickDirective,
    DetailDialogLoadingComponent,
    LoginDialogComponent,
    CreateAccountComponent
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
    MatChipsModule,
    ChartsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    FacebookModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    })
  ],
  providers: [
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
