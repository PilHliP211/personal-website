import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, Signal, signal } from '@angular/core';



export type EndGameState = 'X wins' | 'O wins' | undefined;
export type Piece = 'X' | 'O' | undefined
export type BoardState = Array<Piece>;
export type GameState = { winner: EndGameState, board: BoardState }

@Component({
  selector: 'app-tic-tac-back',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './tic-tac-back.component.html',
  styleUrl: './tic-tac-back.component.scss',
})
export class TicTacBackComponent {
  currentTurn: Piece = 'O';

  board: BoardState = [
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ]


  imgSrc = '/back.png';


  playPiece(location: number, piece: Piece = this.currentTurn): boolean {
    console.log('playing');
    if (this.board[location]) {
      return false;
    }
    this.board[location] = piece;
    this.checkWinner(piece);
    this.currentTurn = piece === 'X' ? 'O' : 'X'

    return true;
  }

  checkWinner(piece: Piece): boolean {
    for (let i = 0; i < this.board.length; i += 3) {
      if (this.checkRow(i, piece)) {
        window.alert(piece === 'X' ? 'X Wins' : 'O Wins')
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (this.checkCol(i, piece)) {
        window.alert(piece === 'X' ? 'X Wins' : 'O Wins')
        return true;
      }
    }
    if (this.checkDiag('leftdown', piece) || this.checkDiag('rightup', piece)) {
      window.alert(piece === 'X' ? 'X Wins' : 'O Wins')
      return true;
    }


    return false;
  }

  private checkRow(rowIdx: number, piece: Piece): boolean {
    let hasOtherPiece: boolean = false;
    for (let i = 0; i < 3; i++) {
      hasOtherPiece = hasOtherPiece || this.board[rowIdx + i] !== piece;
    }
    return !hasOtherPiece;
  }
  private checkCol(colIdx: number, piece: Piece): boolean {
    let hasOtherPiece: boolean = false;
    for (let i = 0; i < 3; i++) {
      hasOtherPiece = hasOtherPiece || this.board[i * 3 + colIdx] !== piece;
    }
    return !hasOtherPiece;

  }
  private checkDiag(diag: 'leftdown' | 'rightup', piece: Piece): boolean {
    const checkIndecies = (i: number) => hasOtherPiece = hasOtherPiece || this.board[i] !== piece
    let hasOtherPiece = false;
    if (diag === 'leftdown') {
      [0, 4, 8].forEach(checkIndecies);
    }
    else {
      [2, 4, 6].forEach(checkIndecies);
    }
    return !hasOtherPiece;
  }



}
