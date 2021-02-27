import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { CreateAccountComponent } from '@components/create-account/create-account.component';
import { PokedexComponent } from '@components/pokedex/pokedex.component';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { PokemonMoveComponent } from '@components/pokemon-move/pokemon-move.component';
import { PokemonSummaryComponent } from '@components/pokemon-summary/pokemon-summary.component';
import { TestComponent } from '@components/test/test.component';
import { DetailDialogLoadingComponent } from '@dialogs/detail-dialog-loading/detail-dialog-loading.component';
import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';
import { PokemonDetailDialogComponent } from '@dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';
import { PokemonClickDirective } from '@directives/pokemon-click.directive';
import { CachingInterceptor } from '@interceptors/caching.interceptor';
import { HttpResponseInterceptor } from '@interceptors/http-response.interceptor';
import { SharedModule } from '@modules/shared.module';
import { MessageService } from '@services/message.service';
import { RequestCache, RequestCacheWithMap } from '@services/request-cache.service';
import { ChartsModule } from 'ng2-charts';
import { FacebookModule } from 'ngx-facebook';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PokedexComponent,
    PokemonClickDirective,
    PokemonDetailDialogComponent,
    DetailDialogLoadingComponent,
    LoginDialogComponent,
    CreateAccountComponent,
    PokemonCardComponent,
    PokemonMoveComponent,
    PokemonSummaryComponent
  ],
  entryComponents: [
    PokemonDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    InfiniteScrollModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    ChartsModule,
    FacebookModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string => localStorage.getItem('accessToken') || '',
        disallowedRoutes: [new RegExp('\/auth')]
        // allowedDomains: ['localhost:3000', 'localhost:4200']
      }
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
