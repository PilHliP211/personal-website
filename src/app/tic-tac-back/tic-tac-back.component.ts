import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-back',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './tic-tac-back.component.html',
  styleUrl: './tic-tac-back.component.scss'
})
export class TicTacBackComponent {

  imgSrc = '/back.png';
}
