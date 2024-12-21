import { Matrix } from "./Matrix";
import { Vector } from "./Vector";

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

    static sub(a : Matrix, b : Matrix) : Matrix{
        if(!this.checkSizeEqual(a, b)){
            throw new Error("Not Equal Matrix Dimension. Cannot Calculate!")
        }
        
        const result = new Matrix(a.row, a.col);
        for(let x = 0; x < a.row; x++){
            for(let y = 0; y < a.col; y++){
                result.set(x, y, a.get(x, y) - b.get(x, y));
            }
        }

        return result;
    }

    static multiply(a : Matrix, b : Matrix): Matrix;
    static multiply(a : Matrix, b : Vector): Matrix;
    static multiply(a : Matrix, b : number): Matrix;
    static multiply(a : Matrix, b : Matrix | Vector | number) : Matrix{
        if(b instanceof Matrix || b instanceof Vector){
            if(b instanceof Vector){
                b = b.toMatrix();
            }
            
            if(a.col != b.row){
                throw new Error("Not Equal A Row Number and B Col Number. Cannot Multiply!");
            }

            const result = new Matrix(a.row, b.col);
            for(let x = 0; x < a.row; x++){
                for(let y = 0; y < a.col; y++){
                    let sum = 0;
                    for(let v = 0; v < a.col; v++){
                        sum += a.get(x, v) * b.get(v, y);
                    }
                    result.set(x, y, sum);
                }
            }
            return result;
        }
        else{
            const result = new Matrix(a.row, a.col);
            for(let x = 0; x < a.row; x++){
                for(let y = 0; y < a.col; y++){
                    result.set(x, y, a.get(x, y) * b);
                }
            }
            return result;
        }
    }

    static divide(a : Matrix, b : number) : Matrix{
        if(b == 0){
            throw new Error("b is zero. Cannot Divide!")
        }

        const result = new Matrix(a.row, a.col);
        for(let x = 0; x < a.row; x++){
            for(let y = 0; y < a.col; y++){
                result.set(x, y, a.get(x, y) / b);
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