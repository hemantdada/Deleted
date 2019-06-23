import { Component, OnInit } from '@angular/core';
import { MyGrid } from '../Models/Grid/MyGrid';
import { GameOflife } from '../Models/GameOfLife/GameOfLife';
import { ShapeService } from '../Services/shape.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public gameOflife: GameOflife = new GameOflife();

  constructor(private shapeService: ShapeService) {

  }

  ngOnInit() {

    this.gameOflife.currentState = 1;
    this.gameOflife.mygrid = new MyGrid(this.gameOflife.rows, this.gameOflife.columns);
    this.shapeService.initShapeType(this.gameOflife.patterns, this.gameOflife.mygrid);
    this.start(this.gameOflife.currentState);
  }

  Update() {

    this.gameOflife.currentState = 0;
    this.gameOflife.mygrid = undefined;
    this.gameOflife.delayBetweenFrames = this.gameOflife.newdelayBetweenFrames;
    this.gameOflife.mygrid = new MyGrid(Number(this.gameOflife.rows), Number(this.gameOflife.columns));
    this.gameOflife.currentState = 1;
    this.start(this.gameOflife.currentState);
  }
  StartClick() {
    this.gameOflife.currentState = 1;
    this.start(this.gameOflife.currentState);
  }

  Stopclick() {
    this.gameOflife.currentState = 0;
  }
  start(state) {

    this.gameOflife.mygrid = this.updateGridWithGameRules();
    if (state !== 0) {
      setTimeout(() => {
        this.start(this.gameOflife.currentState);
      }, this.gameOflife.delayBetweenFrames);
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  LoadPattern() {
    this.gameOflife.currentState = 1;
    if (this.gameOflife.patterns === 0 && this.gameOflife.mygrid.getColumn().length < 50 && this.gameOflife.mygrid.getRows().length < 50) {
      this.gameOflife.mygrid = new MyGrid(50, 50);
    }
    this.shapeService.initShapeType(this.gameOflife.patterns, this.gameOflife.mygrid);
    this.start(this.gameOflife.currentState);
  }

  updateGridWithGameRules() {
    const copyGrid = new MyGrid(this.gameOflife.mygrid.getRows().length, this.gameOflife.mygrid.getColumn().length);

    for (let row = 1; row < this.gameOflife.mygrid.getRows().length - 1; row++) {
      for (let column = 1; column < this.gameOflife.mygrid.getColumn().length - 1; column++) {
        const totalCells = this.gameOflife.mygrid.checkSurroundingsCells(row, column);
        // apply the rules to each cell:
        // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
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
