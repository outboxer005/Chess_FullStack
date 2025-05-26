import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  playedAt: string;
  result: string;
  ratingChange: number;
  moves: string;
  userColor: string;
  opponentUserId?: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.apiUrl}/players/me`);
  }

  getMatchHistory(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games/me`);
  }
} 