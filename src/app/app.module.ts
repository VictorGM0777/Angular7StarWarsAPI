import { AppRoutingModule } from './/app-routing.module';
import { AppConfig } from './app.config';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.module';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { HeroiComponent } from './components/heroi/heroi.component';
import { HeroiDetailComponent } from './components/heroi/heroi-detail.component';
import { HeroiMasterComponent } from './components/heroi/heroi-master.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { HeroiService } from './components/heroi/heroi.service';
import { LoginService } from './components/login/login.service';
import { PaginaInicialService } from './components/pagina-inicial/pagina-inicial.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogMensagemComponent } from './components/dialog/dialog-mensagem.component';
import { DialogNovoItemComponent } from './components/dialog/dialog-novo-item.component';
import { registerLocaleData } from '@angular/common';
import localept from '@angular/common/locales/pt';
import localees from '@angular/common/locales/es';
import { MAT_DATE_LOCALE } from '@angular/material';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DialogMensagemComponent,
    DialogNovoItemComponent,
    HeroiComponent,
    HeroiDetailComponent,
    HeroiMasterComponent,
    LoginComponent,
    MenuComponent,
    PaginaInicialComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LayoutModule,
    MaterialModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  entryComponents: [
    DialogComponent,
    DialogMensagemComponent,
    DialogNovoItemComponent
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true },
    HeroiService,
    LoginService,
    PaginaInicialService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localept, 'pt');
    registerLocaleData(localees, 'es');
  }
}
