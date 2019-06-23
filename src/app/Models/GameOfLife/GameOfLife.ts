import { MyGrid } from "../Grid/MyGrid";


export class GameOflife
{
    mygrid : MyGrid;
    public rows:number =100;
    public columns:number=50;
     public currentState :number=0;
    public delayBetweenFrames = 200;
    public newdelayBetweenFrames = 200;
     public patterns :MyGrid[];
}