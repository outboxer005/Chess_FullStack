import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChessBoardComponent } from "../modules/chess-board/chess-board.component";
import { ComputerModeComponent } from "../modules/computer-mode/computer-mode.component";
import { AboutComponent } from "../modules/about/about.component";
import { LoginComponent } from "../modules/auth/login/login.component";
import { SignupComponent } from "../modules/auth/signup/signup.component";
import { ProfileComponent } from "../profile/profile.component";
import { AuthGuard } from "../shared/auth.guard";
import { HomeComponent } from "../modules/home/home.component";
import { LearnComponent } from "../modules/learn/learn.component";

const routes: Routes = [
    { path: "", component: HomeComponent, title: "Chess Master - Home" },
    { path: "against-friend", component: ChessBoardComponent, title: "Play against friend" },
    { path: "against-computer", component: ComputerModeComponent, title: "Play against computer" },
    { path: "learn", component: LearnComponent, title: "Learn Chess" },
    { path: "about", component: AboutComponent, title: "About NVChess" },
    { path: "login", component: LoginComponent, title: "Login" },
    { path: "signup", component: SignupComponent, title: "Sign Up" },
    { path: "profile", component: ProfileComponent, title: "Player Profile", canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }