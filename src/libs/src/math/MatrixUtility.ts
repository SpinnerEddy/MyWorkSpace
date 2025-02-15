import { Matrix } from "./matrix/Matrix";
import { Matrix22 } from "./matrix/Matrix22";
import { Matrix33 } from "./matrix/Matrix33";
import { Matrix44 } from "./matrix/Matrix44";
import { MatrixClassAndSizePair } from "./matrix/MatrixConstants";
import { Vector2 } from "./vector/Vector2";
import { Vector3 } from "./vector/Vector3";

export class MatrixUtility{
    static identity22(): Matrix22 {
        return new Matrix22().identity();
    }

    static identity33(): Matrix33 {
        return new Matrix33().identity();
    }

    static identity44(): Matrix44 {
        return new Matrix44().identity();
    }
    
    static add<T extends Matrix<T>>(a: T, b: T): T {
        if(!this.checkSizeEqual(a, b)){
            throw new Error("Not Equal Matrix Dimension. Cannot Calculate!")
        }
        
        const result = this.createMatrixInstance<T>(a.size);
        a.add(b, result);

        return result;
    }

    static sub<T extends Matrix<T>>(a: T, b: T): T {
        if(!this.checkSizeEqual(a, b)){
            throw new Error("Not Equal Matrix Dimension. Cannot Calculate!")
        }
        
        const result = this.createMatrixInstance<T>(a.size);
        a.sub(b, result);

        return result;
    }

    static multiply<T extends Matrix<T>>(a: T, b: T): T;
    static multiply<T extends Matrix<T>>(a: T, b: number): T;
    static multiply<T extends Matrix<T>>(a: T, b: T | number): T {
        if(b instanceof Matrix){
            if(a.col != b.row){
                throw new Error("Not Equal A Row Number and B Col Number. Cannot Multiply!");
            }

            const result = this.createMatrixInstance<T>(a.size);
            a.multiply(b, result);
            
            return result;
        }
        else{
            const result = this.createMatrixInstance<T>(a.size);
            for(let rowIndex = 0; rowIndex < a.row; rowIndex++){
                for(let colIndex = 0; colIndex < a.col; colIndex++){
                    result.set(rowIndex, colIndex, a.get(rowIndex, colIndex) * b);
                }
            }
            return result;
        }
    }

    static div<T extends Matrix<T>>(a: T, b: number): T {
        if(b == 0){
            throw new Error("b is zero. Cannot Divide!")
        }

        const result = this.createMatrixInstance<T>(a.size);
        a.div(b, result);

        return result;
    }

    static translate2D(target: Matrix44, offset: Vector2): Matrix44 {
        const result = target.translate2D(target, offset);
        return result;
    }

    static translate3D(target: Matrix44, offset: Vector3): Matrix44 {
        const result = target.translate3D(target, offset);
        return result;
    }

    static rotate2D(target: Matrix44, angle: number): Matrix44 {
        const result = target.rotate2D(target, angle);
        return result;
    }

    static rotate3D(target: Matrix44, angle: number, axis: Vector3): Matrix44 {
        const result = target.rotate3D(target, angle, axis);
        return result;
    }

    static scale2D(target: Matrix44, scaleX: number, scaleY: number): Matrix44 {
        const result = target.scale2D(target, scaleX, scaleY);
        return result;
    }

    static scale3D(target: Matrix44, scaleX: number, scaleY: number, scaleZ: number): Matrix44 {
        const result = target.scale3D(target, scaleX, scaleY, scaleZ);
        return result;
    }

    static transpose<T extends Matrix<T>>(baseMatrix: T): T {
        const result = baseMatrix.transpose();
        return result;
    }

    static inverse<T extends Matrix<T>>(baseMatrix: T): T{
        const result = baseMatrix.inverse();
        return result;
    }

    static orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix44 {
        let result = new Matrix44();
        result = result.orthographic(left, right, top, bottom, near, far, result);
        return result;
    }

    static perspective(fovDegrees: number, width: number, height:number, near: number, far: number): Matrix44 {
        let result = new Matrix44();
        result = result.perspective(fovDegrees, width, height, near, far, result);
        return result;
    }

    static lookAt(eyePos: Vector3, targetPos: Vector3, up: Vector3): Matrix44 {
        let result = new Matrix44();
        result = result.lookAt(eyePos, targetPos, up, result);
        return result;
    }

    private static checkSizeEqual<T extends Matrix<T>>(a: T, b: T): boolean{
        if(a.col != b.col || a.row != b.row){
            console.log(`col: ${a.col},${b.col}`);
            console.log(`row: ${a.row},${b.row}`);
            return false;
        }

        return true;
    }


    private static createMatrixInstance<T extends Matrix<T>>(size: number): T {
        const matrixClass = MatrixClassAndSizePair[size] as new () => T;
        if(!matrixClass) {
            throw new Error('Unsupport matrix size');
        }

        return new matrixClass();

    }
}