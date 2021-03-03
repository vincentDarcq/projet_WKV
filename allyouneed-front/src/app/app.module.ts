import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { SeriesComponent } from "./series/series.component";
import { RegisterComponent } from "./register/register.component";
import { MovieComponent } from "./movie/movie.component";
import { MovieFormComponent } from "./movie-form/movie-form.component";
import { AlertComponent } from "./alert/alert.component";
import { SerieFormComponent } from "./serie-form/serie-form.component";
import { SerieComponent } from "./serie/serie.component";
import { UserComponent } from "./user/user.component";
import { EditPasswordComponent } from "./edit-password/edit-password.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
} from "angularx-social-login";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DialogModule } from "primeng/dialog";
import { StarRatingComponent } from "./star-rating/star-rating.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CheckboxesComponent } from "./checkboxes/checkboxes.component";
import { InfobulleComponent } from "./infobulle/infobulle.component";
import { CarousselComponent } from "./caroussel/caroussel.component";
import { HighlightDirective } from "./directives/highlight.directive";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { TenStarRatingComponent } from './ten-star-rating/ten-star-rating.component';

//permet d'utiliser les pipes avec la version française
registerLocaleData(localeFr);

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("230692954695226"),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    SeriesComponent,
    RegisterComponent,
    MovieComponent,
    MovieFormComponent,
    AlertComponent,
    SerieFormComponent,
    SerieComponent,
    UserComponent,
    EditPasswordComponent,
    StarRatingComponent,
    CheckboxesComponent,
    InfobulleComponent,
    CarousselComponent,
    HighlightDirective,
    TenStarRatingComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DialogModule,
    NgbModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
