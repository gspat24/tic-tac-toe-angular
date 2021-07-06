import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  public blocks: any[] = [];
  public xIsNext: boolean = false;
  public winner: string | null = null;

  constructor() { }

  public ngOnInit(): void {
    this.newGame();
  }

  public newGame() {
    this.winner = null;
    this.xIsNext = true;
    this.blocks = Array(9).fill(null);
  }

  public get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  public clickBlocks(index: number) {
    if (this.winner) { return; }

    if (!this.blocks[index]) {
      this.blocks.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  private calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.blocks[a] &&
        this.blocks[a] === this.blocks[b] &&
        this.blocks[a] === this.blocks[c]
      ) {
        return this.blocks[a];
      }
    }
    return null;
  }

}
