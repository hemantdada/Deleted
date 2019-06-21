
//Grid model is an extended array prototype to implement a grid
//Which structured [row][columns].
//This model can also check and return the total live nighborhood cells in a grid  
export class Grid extends Array  {
    constructor(private _rows: number, private _columns: number){
        super();
        Object.setPrototypeOf(this, Grid.prototype);
        this._build(); 
    }
    
    get getRows(){
        return this._rows;
    }

    get getColumn(){
        return this._columns;
    }

    _build(){
        for (var i = 0; i < this._rows; i++) {
            this[i] = [];
        }
    }
    //add up the total values for the surrounding cells
    checkSurroundingsCells(row,column){
        let totalCells = 0;
        totalCells += this[row - 1][column - 1] || 0; //top left
        totalCells += this[row - 1][column] || 0; //top center
        totalCells += this[row - 1][column + 1] || 0; //top right

        totalCells += this[row][column - 1] || 0; //middle left
        totalCells += this[row][column + 1] || 0; //middle right

        totalCells += this[row + 1][column - 1] || 0; //bottom left
        totalCells += this[row + 1][column] || 0; //bottom center
        totalCells += this[row + 1][column + 1] || 0; //bottom right
        return totalCells;
    }
}



export class MyGrid  {
    public myarray:number[][]=new Array();
    constructor(private _rows: number, private _columns: number){
        
        this._build(); 
       // this =new Array();
    }
    
    public getRows(){
        return new Array(this._rows);
    }

    public getColumn(){
        return  new Array(this._columns);
    }

    _build(){
        for (var i = 0; i < this._rows; i++) {
            var d= new Array();
            for (var j = 0; j < this._columns; j++) {
                d.push(1);
            }
            this.myarray.push(d);
        }
        //debugger
    }
    //add up the total values for the surrounding cells
    public checkSurroundingsCells(row,column){
        let totalCells = 0;
        
        totalCells += this.myarray[row - 1][column - 1] || 0; //top left
         totalCells += this.myarray[row - 1][column] || 0; //top center
      totalCells += this.myarray[row - 1][column + 1] || 0; //top right

      totalCells += this.myarray[row][column - 1] || 0; //middle left
    totalCells += this.myarray[row][column + 1] || 0; //middle right

       totalCells += this.myarray[row + 1][column - 1] || 0; //bottom left
      totalCells += this.myarray[row + 1][column] || 0; //bottom center
       totalCells += this.myarray[row + 1][column + 1] || 0; //bottom right
       
        return totalCells;
    }
}



