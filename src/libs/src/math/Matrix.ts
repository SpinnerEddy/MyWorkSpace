export class Matrix{
    private rowNum : number;
    private colNum : number;
    private data : Float32Array;

    constructor(rowNum : number, colNum : number, initializeValue: number = 0){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.data = new Float32Array(rowNum * colNum).fill(initializeValue);
    }

    get(x : number, y : number) : number{
        return this.data[this.rowNum * y + x];
    }

    set(x : number, y : number, value : number) : void{
        this.data[this.rowNum * y + x] = value;
    }

    get col() : number{
        return this.colNum;
    }

    get row() : number{
        return this.rowNum;
    }
    
    get isSquareMatrix() : boolean{
        return this.rowNum == this.colNum;
    }

    toArray(): Float32Array{
        return this.data;
    }
}