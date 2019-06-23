import { MyGrid } from '../Grid/MyGrid';

export class GameOflife {
    mygrid: MyGrid;
    public rows = 50;
    public columns = 50;
    public currentState = 0;
    public delayBetweenFrames = 100000;
    public newdelayBetweenFrames = 100000;
    public patterns = false;
}
