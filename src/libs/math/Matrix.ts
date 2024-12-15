export class Matrix{
    private rowNum : number;
    private colNum : number;
    private data : Float32Array;

    constructor(rowNum : number, colNum : number, initializeValue: number = 0){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.data = new Float32Array(rowNum * colNum).fill(initializeValue);
    }

    static create(sizeNum : number) : Matrix{
        let matrix = new Matrix(sizeNum, sizeNum);
        return matrix;
    }

    static identity(sizeNum : number) : Matrix{
        let matrix = this.create(sizeNum);
        for(let i = 0; i < sizeNum; i++){
            matrix.set(i, i, 1);
        }

        return matrix;
    }

    get(x : number, y : number) : number{
        return this.data[x * this.colNum + y];
    }

    set(x : number, y : number, value : number) : void{
        this.data[x * this.colNum + y] = value;
    }

    get row() : number{
        return this.rowNum;
    }

    get col() : number{
        return this.colNum;
    }
    
    get isSquareMatrix() : boolean{
        return this.rowNum == this.colNum;
    }

    toArray(): Float32Array{
        return this.data;
    }
}