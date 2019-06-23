import { MyGrid } from '../Grid/MyGrid';

export class GameOflife {
    mygrid: MyGrid;
    public rows = 50;
    public columns = 50;
    public currentState = 0;
    public delayBetweenFrames = 1000;
    public newdelayBetweenFrames = 1000;
    public patterns: number;
}
