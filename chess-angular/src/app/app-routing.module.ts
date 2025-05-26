import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ChessBoardComponent } from './modules/chess-board/chess-board.component';
import { ComputerModeComponent } from './modules/computer-mode/computer-mode.component';
import { LearnComponent } from './modules/learn/learn.component';
import { AboutComponent } from './modules/about/about.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'against-friend', component: ChessBoardComponent, canActivate: [AuthGuard] },
  { path: 'against-computer', component: ComputerModeComponent, canActivate: [AuthGuard] },
  { path: 'learn', component: LearnComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export default routes; 