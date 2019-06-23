import { MyGrid } from '../model/mygrid/my-grid';

export class Creater {
 public shapeType: any;
  constructor() {
    enum ShapeType {
      MyShape = 0,
      random = 1
    }
    this.shapeType = ShapeType;
  }


  public initShapeType(type: any, grid: any): void {
    switch (type) {
      case this.shapeType.MyShape:
        this.setGlinder(grid);
        break;
      case this.shapeType.random:
        this.setRandom(grid);
        break;
        default:
        break;
    }
  }


  private setGlinder(grid: MyGrid): MyGrid {
    grid.myarray[9][44] = 0;
    grid.myarray[10][42] = 0;
    grid.myarray[10][44] = 0;
    grid.myarray[11][32] = 0;
    grid.myarray[11][33] = 0;
    grid.myarray[11][40] = 0;
    grid.myarray[11][41] = 0;
    grid.myarray[11][54] = 0;
    grid.myarray[11][55] = 0;
    grid.myarray[12][31] = 0;
    grid.myarray[12][35] = 0;
    grid.myarray[12][40] = 0;
    grid.myarray[12][41] = 0;
    grid.myarray[12][54] = 0;
    grid.myarray[12][55] = 0;
    grid.myarray[13][20] = 0;
    grid.myarray[13][21] = 0;
    grid.myarray[13][30] = 0;
    grid.myarray[13][36] = 0;
    grid.myarray[13][40] = 0;
    grid.myarray[13][41] = 0;
    grid.myarray[14][20] = 0;
    grid.myarray[14][21] = 0;
    grid.myarray[14][30] = 0;
    grid.myarray[14][34] = 0;
    grid.myarray[14][36] = 0;
    grid.myarray[14][37] = 0;
    grid.myarray[14][42] = 0;
    grid.myarray[14][44] = 0;
    grid.myarray[15][30] = 0;
    grid.myarray[15][36] = 0;
    grid.myarray[15][44] = 0;
    grid.myarray[16][31] = 0;
    grid.myarray[16][35] = 0;
    grid.myarray[17][32] = 0;
    grid.myarray[17][33] = 0;
    return grid;
  }


  private setRandom(grid: MyGrid): MyGrid {
    grid._build();
// tslint:disable-next-line: typedef
    for (let row = 0; row < grid.getRows().length; row++) {
// tslint:disable-next-line: typedef
      for (let column = 0; column < grid.getColumn().length; column++) {
        grid.myarray[row][column] = Math.round(Math.random());
      }
    }
    return grid;
  }
}
