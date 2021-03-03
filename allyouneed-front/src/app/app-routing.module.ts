import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { SeriesComponent } from './series/series.component';
import { RegisterComponent } from './register/register.component';
import { MovieComponent } from './movie/movie.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { SerieFormComponent } from './serie-form/serie-form.component';
import { UserComponent } from './user/user.component';
import { SerieComponent } from './serie/serie.component';

const routes: Routes = [
  { path:'', component: MainComponent},
  { path:'editPass', component: EditPasswordComponent},
  { path:'series', component: SeriesComponent},
  { path:'login', component: LoginComponent},
  { path:'user', component: UserComponent},
  { path:'register', component: RegisterComponent},
  { path:'movie/:id', component: MovieComponent},
  { path:'movieForm/:id', component: MovieFormComponent},
  { path:'serie/:id', component: SerieComponent},
  { path:'serieForm/:id', component: SerieFormComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
