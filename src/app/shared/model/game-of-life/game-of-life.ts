import { MyGrid } from '../mygrid/my-grid';

export class GameOflife {
    public mygrid: MyGrid;
    public rows: number = 50;
    public columns: number = 50;
    public currentState: number = 0;
    public delayBetweenFrames: number = 500;
    public newdelayBetweenFrames: number = 500;
    public patterns: boolean = false;
}
