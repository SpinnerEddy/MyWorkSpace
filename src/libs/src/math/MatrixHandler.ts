import { Matrix } from "./matrix/Matrix";
import { Vector } from "./vector/Vector";
import { Vector2 } from "./vector/Vector2";
import { Vector3 } from "./vector/Vector3";
import { Vector4 } from "./vector/Vector4";
import { DefaultVectorConstants } from "./vector/VectorConstants";

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

    static createRotateMatrix2D(angle: number){
        const rotateMatrix = MatrixHandler.identity(3);
        rotateMatrix.set(0, 0, Math.cos(angle));
        rotateMatrix.set(1, 0, -Math.sin(angle));
        rotateMatrix.set(0, 1, Math.sin(angle));
        rotateMatrix.set(1, 1, Math.cos(angle));

        return rotateMatrix;
    }

    static createRotateMatrix3D(angle: number, axis: Vector3){
        const rotateMatrix = MatrixHandler.identity(4);
        if(axis == DefaultVectorConstants.AXIS2DX){
            rotateMatrix.set(1, 1, Math.cos(angle));
            rotateMatrix.set(1, 2, -Math.sin(angle));
            rotateMatrix.set(2, 1, Math.sin(angle));
            rotateMatrix.set(2, 2, Math.cos(angle));
        }
        if(axis == DefaultVectorConstants.AXIS2DY){
            rotateMatrix.set(0, 0, Math.cos(angle));
            rotateMatrix.set(0, 2, Math.sin(angle));
            rotateMatrix.set(2, 0, -Math.sin(angle));
            rotateMatrix.set(2, 2, Math.cos(angle));
        }
        if(axis == DefaultVectorConstants.AXIS2DZ){
            rotateMatrix.set(0, 0, Math.cos(angle));
            rotateMatrix.set(1, 0, -Math.sin(angle));
            rotateMatrix.set(0, 1, Math.sin(angle));
            rotateMatrix.set(1, 1, Math.cos(angle));
        }

        return rotateMatrix;
    }

    static createScaleMatrix2D(scalarX: number, scalarY: number){
        const scaleMatrix = MatrixHandler.identity(3);
        scaleMatrix.set(0, 0, scalarX);
        scaleMatrix.set(1, 1, scalarY);

        return scaleMatrix;
    }

    static createScaleMatrix3D(scalarX: number, scalarY: number, scalarZ: number){
        const scaleMatrix = MatrixHandler.identity(4);
        scaleMatrix.set(0, 0, scalarX);
        scaleMatrix.set(1, 1, scalarY);
        scaleMatrix.set(2, 2, scalarZ);

        return scaleMatrix;
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
        const translateMatrix = MatrixHandler.identity(3);
        translateMatrix.set(2, 0, b.x);
        translateMatrix.set(2, 1, b.y);

        const result = MatrixHandler.multiply(translateMatrix, a);
        return result;
    }

    static translate3D(a : Vector4, b : Vector3) : Matrix{
        const translateMatrix = MatrixHandler.identity(4);
        translateMatrix.set(3, 0, b.x);
        translateMatrix.set(3, 1, b.y);
        translateMatrix.set(3, 2, b.z);

        const result = MatrixHandler.multiply(translateMatrix, a);
        return result;
    }

    static rotate2D(vec : Vector3, angle : number) : Matrix{
        const rotateMatrix = MatrixHandler.createRotateMatrix2D(angle);

        const result = MatrixHandler.multiply(rotateMatrix, vec);
        return result;
    }

    static rotate3D(vec : Vector4, angle : number, axis : Vector3) : Matrix{
        const rotateMatrix = MatrixHandler.createRotateMatrix3D(angle, axis);

        const result = MatrixHandler.multiply(rotateMatrix, vec);
        return result;
    }

    static scale2D(vec : Vector3, scalarX : number, scalarY : number) : Matrix{
        const scaleMatrix = MatrixHandler.createScaleMatrix2D(scalarX, scalarY);

        const result = MatrixHandler.multiply(scaleMatrix, vec);
        return result;
    }

    static scale3D(vec : Vector4, scalarX : number, scalarY : number, scalarZ : number) : Matrix{
        const scaleMatrix = MatrixHandler.createScaleMatrix3D(scalarX, scalarY, scalarZ);

        const result = MatrixHandler.multiply(scaleMatrix, vec);
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

    static checkSquare(matrix : Matrix, sizeNum : number) : boolean{
        return (matrix.col == sizeNum) && (matrix.row == sizeNum);
    }
}