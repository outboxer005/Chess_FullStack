import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChessMove, ComputerConfiguration, StockfishQueryParams, StockfishResponse, stockfishLevels } from './models';
import { BehaviorSubject, Observable, of, switchMap, catchError, tap, throwError } from 'rxjs';
import { Color, FENChar } from 'src/app/chess-logic/models';

@Injectable({
  providedIn: 'root'
})
export class StockfishService {
  private readonly api: string = "/api/api/s/v2.php";

  public computerConfiguration$ = new BehaviorSubject<ComputerConfiguration>({ color: Color.Black, level: 1 });

  constructor(private http: HttpClient) { }

  private convertColumnLetterToYCoord(string: string): number {
    return string.charCodeAt(0) - "a".charCodeAt(0);
  }

  private promotedPiece(piece: string | undefined): FENChar | null {
    if (!piece) return null;
    const computerColor: Color = this.computerConfiguration$.value.color;
    if (piece === "n") return computerColor === Color.White ? FENChar.WhiteKnight : FENChar.BlackKnight;
    if (piece === "b") return computerColor === Color.White ? FENChar.WhiteBishop : FENChar.BlackBishop;
    if (piece === "r") return computerColor === Color.White ? FENChar.WhiteRook : FENChar.BlackRook;
    return computerColor === Color.White ? FENChar.WhiteQueen : FENChar.BlackQueen;
  }

  private moveFromStockfishString(move: string): ChessMove {
    if (!move || move.length < 4) {
      console.error('Invalid move string from Stockfish:', move);
      return { prevX: -1, prevY: -1, newX: -1, newY: -1, promotedPiece: null };
    }

    try {
      const prevY: number = this.convertColumnLetterToYCoord(move[0]);
      const prevX: number = Number(move[1]) - 1;
      const newY: number = this.convertColumnLetterToYCoord(move[2]);
      const newX: number = Number(move[3]) - 1;
      const promotedPiece = this.promotedPiece(move[4]);

      // Validate coordinates
      if (prevX < 0 || prevX > 7 || prevY < 0 || prevY > 7 || 
          newX < 0 || newX > 7 || newY < 0 || newY > 7) {
        console.error('Invalid coordinates in move:', { prevX, prevY, newX, newY });
        return { prevX: -1, prevY: -1, newX: -1, newY: -1, promotedPiece: null };
      }

      return { prevX, prevY, newX, newY, promotedPiece };
    } catch (error) {
      console.error('Error parsing move string:', error);
      return { prevX: -1, prevY: -1, newX: -1, newY: -1, promotedPiece: null };
    }
  }

  public getBestMove(fen: string): Observable<ChessMove> {
    console.log('Getting best move for FEN:', fen);
    console.log('Computer configuration:', this.computerConfiguration$.value);

    const queryParams: StockfishQueryParams = {
      fen,
      depth: stockfishLevels[this.computerConfiguration$.value.level],
    };

    let params = new HttpParams().appendAll(queryParams);

    return this.http.get<StockfishResponse>(this.api, { 
      params,
      headers: {
        'Accept': 'application/json'
      }
    })
      .pipe(
        tap(response => {
          console.log('Stockfish API response:', response);
          if (!response.success) {
            throw new Error('Stockfish API returned unsuccessful response');
          }
        }),
        switchMap(response => {
          if (!response.bestmove) {
            console.error('No best move in response:', response);
            return throwError(() => new Error('No best move received from Stockfish'));
          }
          const bestMove: string = response.bestmove.split(" ")[1];
          console.log('Best move:', bestMove);
          return of(this.moveFromStockfishString(bestMove));
        }),
        catchError(error => {
          console.error('Error getting best move:', error);
          return throwError(() => error);
        })
      );
  }
}
