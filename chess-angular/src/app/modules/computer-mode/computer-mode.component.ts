import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChessBoardComponent } from '../chess-board/chess-board.component';
import { StockfishService } from './stockfish.service';
import { ChessBoardService } from '../chess-board/chess-board.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Color } from 'src/app/chess-logic/models';
import { CommonModule } from '@angular/common';
import { MoveListComponent } from '../move-list/move-list.component';
import { ActivatedRoute } from '@angular/router';
import { ComputerConfiguration } from './models';

@Component({
  selector: 'app-computer-mode',
  templateUrl: '../chess-board/chess-board.component.html',
  styleUrls: ['../chess-board/chess-board.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ChessBoardComponent,
    MoveListComponent
  ]
})
export class ComputerModeComponent extends ChessBoardComponent implements OnInit, OnDestroy {
  private computerSubscriptions$ = new Subscription();
  private isComputerThinking = false;
  private configSubscription: Subscription = new Subscription();
  private boardSubscription: Subscription = new Subscription();
  private computerConfig: ComputerConfiguration = {
    color: Color.Black,
    level: 1
  };

  constructor(
    private stockfishService: StockfishService,
    private route: ActivatedRoute
  ) {
    super(inject(ChessBoardService));
    // Initialize computer configuration
    this.stockfishService.computerConfiguration$.next(this.computerConfig);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    console.log('Computer mode initialized');

    // Set player color to White by default
    this.playerColor = Color.White;

    const computerConfiSubscription$: Subscription = this.stockfishService.computerConfiguration$.subscribe({
      next: (computerConfiguration) => {
        console.log('Computer configuration updated:', computerConfiguration);
        if (computerConfiguration.color === Color.White) {
          this.flipBoard();
          this.playerColor = Color.Black;
        }
      },
      error: (error) => console.error('Error in computer configuration:', error)
    });

    const chessBoardStateSubscription$: Subscription = this.chessBoardService.chessBoardState$.subscribe({
      next: async (FEN: string) => {
        // Prevent recursive updates
        if (this.isComputerThinking) {
          console.log('Computer is already thinking, skipping update');
          return;
        }

        console.log('Board state updated:', FEN);
        if (this.chessBoard.isGameOver) {
          console.log('Game is over, unsubscribing from board state');
          chessBoardStateSubscription$.unsubscribe();
          return;
        }

        const player: Color = FEN.split(" ")[1] === "w" ? Color.White : Color.Black;
        console.log('Current player:', player);
        console.log('Computer color:', this.stockfishService.computerConfiguration$.value.color);
        
        if (player !== this.stockfishService.computerConfiguration$.value.color) {
          console.log('Not computer\'s turn');
          return;
        }

        try {
          this.isComputerThinking = true;
          console.log('Getting computer move...');
          const { prevX, prevY, newX, newY, promotedPiece } = await firstValueFrom(this.stockfishService.getBestMove(FEN));
          console.log('Computer move:', { prevX, prevY, newX, newY, promotedPiece });
          
          // Only update if the move is valid
          if (prevX >= 0 && prevY >= 0 && newX >= 0 && newY >= 0) {
            this.updateBoard(prevX, prevY, newX, newY, promotedPiece);
          } else {
            console.error('Invalid move received from Stockfish');
          }
        } catch (error) {
          console.error('Error getting computer move:', error);
        } finally {
          this.isComputerThinking = false;
        }
      },
      error: (error) => console.error('Error in board state subscription:', error)
    });

    this.computerSubscriptions$.add(chessBoardStateSubscription$);
    this.computerSubscriptions$.add(computerConfiSubscription$);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.computerSubscriptions$.unsubscribe();
  }
}
