import { MyGrid } from '../Grid/MyGrid';

export class GameOflife {
    mygrid: MyGrid;
    public rows = 50;
    public columns = 50;
    public currentState = 0;
    public delayBetweenFrames = 500;
    public newdelayBetweenFrames = 500;
    public patterns = false;
}
