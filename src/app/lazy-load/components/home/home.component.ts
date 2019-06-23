import { Component, OnInit } from '@angular/core';
import { MyGrid } from '../../../shared/model/mygrid/my-grid';
import { GameOflife } from '../../../shared/model/game-of-life/game-of-life';
import { Creater } from '../../../shared/common/creater';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public gameOflife: GameOflife = new GameOflife();
  public creater: Creater;
  constructor() {
    this.creater = new Creater();
  }

  public ngOnInit(): void {

    this.gameOflife.currentState = 1;
    this.gameOflife.mygrid = new MyGrid(this.gameOflife.rows, this.gameOflife.columns);
    this.creater.initShapeType(this.gameOflife.patterns, this.gameOflife.mygrid);
    this.start(this.gameOflife.currentState);
  }

  public Update(): void {

    this.gameOflife.currentState = 0;
    this.gameOflife.mygrid = undefined;
    this.gameOflife.delayBetweenFrames = this.gameOflife.newdelayBetweenFrames;
    this.gameOflife.mygrid = new MyGrid(Number(this.gameOflife.rows), Number(this.gameOflife.columns));
    this.gameOflife.currentState = 1;
    this.start(this.gameOflife.currentState);
  }

  public StartClick(): void {
    this.gameOflife.currentState = 1;
    this.start(this.gameOflife.currentState);
  }

  public Stopclick(): void {
    this.gameOflife.currentState = 0;
  }
  public start(state: number): void {

    this.gameOflife.mygrid = this.updateGridWithGameRules();
    if (state !== 0) {
      setTimeout(() => {
        this.start(this.gameOflife.currentState);
      }, this.gameOflife.delayBetweenFrames);
    }
  }

  public numberOnly(event: any): boolean {
    // tslint:disable-next-line: typedef
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  public LoadPattern(): void {
    this.gameOflife.currentState = 1;
    if (Number(this.gameOflife.patterns) === 0 &&
      this.gameOflife.mygrid.getColumn().length < 50 && this.gameOflife.mygrid.getRows().length < 50) {
      this.gameOflife.mygrid = new MyGrid(50, 50);
    }
    this.gameOflife.mygrid = new MyGrid(Number(this.gameOflife.rows), Number(this.gameOflife.columns));
    this.creater.initShapeType(Number(this.gameOflife.patterns), this.gameOflife.mygrid);
    this.start(this.gameOflife.currentState);
  }

  public updateGridWithGameRules(): MyGrid {
    // tslint:disable-next-line: typedef
    const copyGrid = new MyGrid(this.gameOflife.mygrid.getRows().length, this.gameOflife.mygrid.getColumn().length);

    // tslint:disable-next-line: typedef
    for (let row = 1; row < this.gameOflife.mygrid.getRows().length - 1; row++) {
      // tslint:disable-next-line: typedef
      for (let column = 1; column < this.gameOflife.mygrid.getColumn().length - 1; column++) {
        // tslint:disable-next-line: typedef
        const totalCells = this.gameOflife.mygrid.checkSurroundingsCells(row, column);
        switch (totalCells) {
          case 2:
            copyGrid.myarray[row][column] = this.gameOflife.mygrid.myarray[row][column];
            break;
          case 3:
            copyGrid.myarray[row][column] = 1;

            break;
          default:
            copyGrid.myarray[row][column] = 0;
        }
      }
    }
    return copyGrid;
  }
}
