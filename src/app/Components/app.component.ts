import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Grid, MyGrid } from '../Models/Grid/grid';
import { ShapeService } from '../Services/shape.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent {
    mygrid : MyGrid;
    public rows:number =100;
    public columns:number=50;
     public currentState :number=0;
    //ctx : CanvasRenderingContext2D;
   // grid : Grid;
   // delayBetweenFrames : number;
   delayBetweenFrames = 200;
    constructor(private shapeService: ShapeService) {
        //this.delayBetweenFrames = 0;
    }
    //@ViewChild("myCanvas") myCanvas: ElementRef; 
   
    //ngAfterViewInit is called only after the view did load and the canvas is ready
    ngAfterViewInit() {
       // debugger
       this.currentState =1;
        this.mygrid = new MyGrid(this.rows,this.columns); 
         this.start(this.currentState);
     }

     valuechange() {
         debugger
         this.currentState = 0;
         this.mygrid  = undefined;
        
        this.mygrid = new MyGrid(Number(this.rows),Number(this.columns)); 
        this.currentState = 1;
        this.start(this.currentState);
      }

    start(state) {
                 
        this.mygrid = this.updateGridWithGameRules();
        if(state  != 0 )
        {
              setTimeout(() => {
            this.start(this.currentState);         
        }, this.delayBetweenFrames);
        }
    }
    // Change() {
    //     //this.clickMessage = 'You are my hero!';
    //   }

    updateGridWithGameRules() { 
        let copyGrid = new MyGrid(this.mygrid.getRows().length, this.mygrid.getColumn().length);
        
        for (let row = 1; row <  this.mygrid.getRows().length - 1; row++) { 
            for (let column = 1; column < this.mygrid.getColumn().length - 1; column++) { 
           //debugger
                let totalCells = this.mygrid.checkSurroundingsCells(row, column);
                //apply the rules to each cell:
                // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
                // Any live cell with two or three live neighbours lives on to the next generation.
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                switch (totalCells) {
                    
                    case 2:
                        copyGrid.myarray[row][column] =this.mygrid.myarray[row][column];
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

    //start is a function which loops by custom frames
    // start() {
    //     this.clearGridFromCanvas();        
    //     this.drawGridOnCanvas();
    //     this.grid = this.updateGridWithGameRules();
    //     setTimeout(() => {
    //         this.start();         
    //     }, this.delayBetweenFrames);
    // }

    // clearGridFromCanvas(){
    //     this.ctx.clearRect(0, 0, this.grid.getRows, this.grid.getColumn);
    // }

  }