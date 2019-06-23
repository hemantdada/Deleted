export class MyGrid {
    public myarray: number[][] = new Array();
    constructor(private _rows: number, private _columns: number) {

        this._build();
    }

    public getRows(): Array<any> {
        return new Array(this._rows);
    }

    public getColumn(): Array<any> {
        return new Array(this._columns);
    }

   public _build(): void {
        for (let i: any = 0; i < this._rows; i++) {
            const d: Array<any> = new Array();
            for (let j: any = 0; j < this._columns; j++) {
                d.push(1);
            }

            this.myarray.push(d);
        }
    }
    // add up the total values for the surrounding cells
    public checkSurroundingsCells(row: any, column: any): Number {
        let totalCells: any = 0;
        totalCells += this.myarray[row - 1][column - 1] || 0; // top left
        totalCells += this.myarray[row - 1][column] || 0; // top center
        totalCells += this.myarray[row - 1][column + 1] || 0; // top right
        totalCells += this.myarray[row][column - 1] || 0; // middle left
        totalCells += this.myarray[row][column + 1] || 0; // middle right
        totalCells += this.myarray[row + 1][column - 1] || 0; // bottom left
        totalCells += this.myarray[row + 1][column] || 0; // bottom center
        totalCells += this.myarray[row + 1][column + 1] || 0; // bottom right

        return totalCells;
    }
}
