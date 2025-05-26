import { Component, OnInit } from '@angular/core';
import { ProfileService, Game } from './profile.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
  template: `
    <div class="profile-container" *ngIf="profile">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>Player Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="profile-info">
            <h2>{{ profile.userId }}</h2>
            <p><mat-icon>email</mat-icon> {{ profile.email }}</p>
            <p><mat-icon>stars</mat-icon> Rating: {{ profile.rating }}</p>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="match-history-card">
        <mat-card-header>
          <mat-card-title>Match History</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="matchHistory" class="match-table">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let match">{{ match.playedAt | date:'medium' }}</td>
            </ng-container>

            <ng-container matColumnDef="result">
              <th mat-header-cell *matHeaderCellDef>Result</th>
              <td mat-cell *matCellDef="let match">
                <span [ngClass]="{
                  'win': match.result === 'WIN',
                  'loss': match.result === 'LOSS',
                  'draw': match.result === 'DRAW'
                }">{{ match.result }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="ratingChange">
              <th mat-header-cell *matHeaderCellDef>Rating Change</th>
              <td mat-cell *matCellDef="let match">
                <span [ngClass]="{
                  'positive': match.ratingChange > 0,
                  'negative': match.ratingChange < 0
                }">{{ match.ratingChange > 0 ? '+' : '' }}{{ match.ratingChange }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="userColor">
              <th mat-header-cell *matHeaderCellDef>User Color</th>
              <td mat-cell *matCellDef="let match">{{ match.userColor }}</td>
            </ng-container>

            <ng-container matColumnDef="gameMode">
              <th mat-header-cell *matHeaderCellDef>Game Mode</th>
              <td mat-cell *matCellDef="let match">{{ match.opponentUserId ? 'Friend' : 'Computer' }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.profile-email {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0 0 1.5rem 0;
}

.profile-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.profile-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.section-title mat-icon {
  color: #3498db;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.achievement-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s;
}

.achievement-card:hover {
  transform: translateY(-2px);
}

.achievement-icon {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.achievement-name {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.achievement-desc {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.game-history {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.game-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.game-card:hover {
  background: #e9ecef;
}

.game-result {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}

.result-win {
  background: #2ecc71;
}

.result-loss {
  background: #e74c3c;
}

.result-draw {
  background: #95a5a6;
}

.game-details {
  flex: 1;
}

.game-opponent {
  font-weight: 500;
  color: #2c3e50;
}

.game-date {
  font-size: 0.9rem;
  color: #666;
}

.settings-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.settings-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.settings-menu {
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  overflow: hidden;
}

.settings-menu-item {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #2c3e50;
  transition: background-color 0.2s;
}

.settings-menu-item:hover {
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .profile-stats {
    justify-content: center;
  }

  .profile-content {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
} 
  `]
})
export class ProfileComponent implements OnInit {
  profile: any;
  matchHistory: Game[] = [];
  displayedColumns: string[] = ['date', 'result', 'ratingChange', 'userColor', 'gameMode'];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loadMatchHistory();
      },
      error: () => this.profile = null
    });
  }

  private loadMatchHistory() {
    this.profileService.getMatchHistory().subscribe({
      next: (matches) => {
        this.matchHistory = matches;
        this.displayedColumns = ['date', 'result', 'ratingChange', 'userColor', 'gameMode'];
      },
      error: (error) => console.error('Error loading match history:', error)
    });
  }
} 