import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule]
})
export class HomeComponent {
  constructor(private router: Router) {}

  playWithComputer() {
    this.router.navigate(['/against-computer']);
  }

  playWithFriend() {
    this.router.navigate(['/against-friend']);
  }

  goToLearn() {
    this.router.navigate(['/learn']);
  }
} 