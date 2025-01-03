import { Matrix } from "./matrix/Matrix";
import { Vector } from "./vector/Vector";
import { Vector2 } from "./vector/Vector2";
import { Vector3 } from "./vector/Vector3";

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
            console.log(a);
            if(b instanceof Vector){
                b = b.toMatrix();
            }

            if(a.row != b.col){
                throw new Error("Not Equal A Row Number and B Col Number. Cannot Multiply!");
            }

            const result = new Matrix(a.col, b.row);
            for(let y = 0; y < a.col; y++){
                for(let x = 0; x < b.row; x++){
                    let sum = 0;
                    for(let v = 0; v < a.row; v++){
                        sum += a.get(v, y) * b.get(x, v);
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

    static translate2D(a : Vector3, b : Vector2) : Matrix{
        var translateMatrix = MatrixHandler.identity(3);
        translateMatrix.set(2, 0, b.x);
        translateMatrix.set(2, 1, b.y);

        var result = MatrixHandler.multiply(translateMatrix, a);
        return result;
    }

    static translate3D(a : Matrix, b : Vector3) : Matrix{
        var translateMatrix = MatrixHandler.identity(4);
        translateMatrix.set(3, 0, b.x);
        translateMatrix.set(3, 1, b.y);
        translateMatrix.set(3, 2, b.z);

        var result = MatrixHandler.multiply(a, translateMatrix);
        return result;
    }

    // static rotate2D(mat : Matrix, angle : number, axis : Vector3) : Matrix{

    // }

    // static rotate3D(mat : Matrix, angle : number, axis : Vector3) : Matrix{

    // }

    static checkSizeEqual(a : Matrix, b : Matrix) : boolean{
        if(a.col != b.col || a.row != b.row){
            console.log(`col : ${a.col},${b.col}`);
            console.log(`row : ${a.row},${b.row}`);
            return false;
        }

        return true;
    }

    static checkSquare(matrix : Matrix, sizeNum : number) : boolean{
        return (matrix.col == sizeNum) && (matrix.row == sizeNum);
    }
}