import { Matrix } from "./Matrix";

export class MatrixHandler{
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

    static add(a : Matrix, b : Matrix) : Matrix{
        if(!this.checkSizeEqual(a, b)){
            throw new Error("Not Equal Matrix Dimension. Cannot Calculate!")
        }
        
        const result = new Matrix(a.row, a.col);
        for(let x = 0; x < a.row; x++){
            for(let y = 0; y < a.col; y++){
                result.set(x, y, a.get(x, y) + b.get(x, y));
            }
        }

        return result;
    }

    static checkSizeEqual(a : Matrix, b : Matrix) : boolean{
        if(a.col != b.col || a.row != b.row){
            console.log(`col : ${a.col},${b.col}`);
            console.log(`row : ${a.row},${b.row}`);
            return false;
        }

        return true;
    }
}