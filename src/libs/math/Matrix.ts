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
        return this.data[x * this.colNum + y];
    }

    set(x : number, y : number, value : number) : void{
        this.data[x * this.colNum + y] = value;
    }

    toArray(): Float32Array{
        return this.data;
    }
}