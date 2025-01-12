export class Matrix{
    protected rowNum: number;
    protected colNum: number;
    protected data: Float32Array;

    static Empty: Matrix = new Matrix(0, 0);

    constructor(rowNum: number, colNum: number, initializeValue: number = 0){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.data = new Float32Array(rowNum * colNum).fill(initializeValue);
    }

    get(rowIndex: number, colIndex: number): number{
        return this.data[this.rowNum * colIndex + rowIndex];
    }

    set(rowIndex: number, colIndex: number, value: number): void{
        this.data[this.rowNum * colIndex + rowIndex] = value;
    }

    get col(): number{
        return this.colNum;
    }

    get row(): number{
        return this.rowNum;
    }
    
    get isSquareMatrix(): boolean{
        return this.colNum == this.rowNum;
    }

    get isEmpty(): boolean{
        return this == Matrix.Empty;
    }

    toArray(): Float32Array{
        return this.data;
    }
}