import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavMenuComponent
  ],
  template: `
    <app-nav-menu></app-nav-menu>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      padding: 20px;
      min-height: calc(100vh - 64px);
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  title = 'chess-angular';
} 
