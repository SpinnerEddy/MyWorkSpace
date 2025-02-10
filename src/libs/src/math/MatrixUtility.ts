import { MathUtility } from "./MathUtility";
import { Matrix } from "./matrix/Matrix";
import { Vector2 } from "./vector/Vector2";
import { Vector3 } from "./vector/Vector3";
import { DefaultVectorConstants } from "./vector/VectorConstants";
import { VectorUtility } from "./VectorUtility";

export class MatrixUtility{
    static create(sizeNum: number): Matrix{
        let matrix = new Matrix(sizeNum, sizeNum);
        return matrix;
    }

    static identity(sizeNum: number): Matrix{
        let matrix = this.create(sizeNum);
        for(let i = 0; i < sizeNum; i++){
            matrix.set(i, i, 1);
        }

        return matrix;
    }

    static add(a: Matrix, b: Matrix): Matrix{
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

    static sub(a: Matrix, b: Matrix): Matrix{
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

    static multiply(a: Matrix, b: Matrix): Matrix;
    static multiply(a: Matrix, b: number): Matrix;
    static multiply(a: Matrix, b: Matrix | number): Matrix{
        if(b instanceof Matrix){
            if(a.col != b.row){
                throw new Error("Not Equal A Row Number and B Col Number. Cannot Multiply!");
            }

            const result = new Matrix(a.row, b.col);
            for(let rowIndex = 0; rowIndex < a.row; rowIndex++){
                for(let colIndex = 0; colIndex < b.col; colIndex++){
                    let sum = 0;
                    for(let k = 0; k < a.col; k++){
                        sum += a.get(rowIndex, k) * b.get(k, colIndex);
                    }
                    result.set(rowIndex, colIndex, sum);
                }
            }
            
            return result;
        }
        else{
            const result = new Matrix(a.row, a.col);
            for(let rowIndex = 0; rowIndex < a.row; rowIndex++){
                for(let colIndex = 0; colIndex < a.col; colIndex++){
                    result.set(rowIndex, colIndex, a.get(rowIndex, colIndex) * b);
                }
            }
            return result;
        }
    }

    static divide(a: Matrix, b: number): Matrix{
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

    static translate2D(mat: Matrix, b: Vector2): Matrix{
        const translateMatrix = MatrixUtility.identity(4);
        translateMatrix.set(0, 3, b.x);
        translateMatrix.set(1, 3, b.y);

        const result = MatrixUtility.multiply(translateMatrix, mat);
        return result;
    }

    static translate3D(mat: Matrix, b: Vector3): Matrix{
        const translateMatrix = MatrixUtility.identity(4);
        translateMatrix.set(0, 3, b.x);
        translateMatrix.set(1, 3, b.y);
        translateMatrix.set(2, 3, b.z);

        const result = MatrixUtility.multiply(translateMatrix, mat);
        return result;
    }

    static rotate2D(mat: Matrix, angle: number): Matrix{
        const rotateMatrix = MatrixUtility.createRotateMatrix2D(angle);

        const result = MatrixUtility.multiply(rotateMatrix, mat);
        return result;
    }

    static rotate3D(mat: Matrix, angle: number, axis: Vector3): Matrix{
        const rotateMatrix = MatrixUtility.createRotateMatrix3D(angle, axis);

        const result = MatrixUtility.multiply(rotateMatrix, mat);
        return result;
    }

    static scale2D(mat: Matrix, scalarX: number, scalarY: number): Matrix{
        const scaleMatrix = MatrixUtility.createScaleMatrix2D(scalarX, scalarY);

        const result = MatrixUtility.multiply(scaleMatrix, mat);
        return result;
    }

    static scale3D(mat: Matrix, scalarX: number, scalarY: number, scalarZ: number): Matrix{
        const scaleMatrix = MatrixUtility.createScaleMatrix3D(scalarX, scalarY, scalarZ);

        const result = MatrixUtility.multiply(scaleMatrix, mat);
        return result;
    }

    static transpose(baseMatrix: Matrix): Matrix{
        const baseCol = baseMatrix.col;
        const baseRow = baseMatrix.row;
        const result = new Matrix(baseCol, baseRow);
        for(let i = 0; i < baseRow; i++){
            for(let j = 0; j < baseCol; j++){
                result.set(j, i, baseMatrix.get(i, j));
            }    
        }

        return result;
    }

    static inverse(baseMatrix: Matrix): Matrix{
        if(!baseMatrix.isSquareMatrix){
            throw new Error("Not Square Matrix. Cannot Calculate Inverse!!");
        }

        switch(baseMatrix.col){
            case 2:
                return MatrixUtility.createInverseMatrix22(baseMatrix);
            case 3:
                return MatrixUtility.createInverseMatrix33(baseMatrix);
            case 4:
                return MatrixUtility.createInverseMatrix44(baseMatrix);
            default:
                console.log("Not Calculate Inverse!")
                return Matrix.Empty;
        }
    }

    static orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix{
        const width = right - left;
        const height = top - bottom;
        const depth = far - near;

        if(width == 0){
            throw new Error('Right and Left are same value. Cannot calculate orthographic.');
        }
        if(height == 0){
            throw new Error('Top and bottom are same value. Cannot calculate orthographic.');
        }
        if(depth == 0){
            throw new Error('Far and Near are same value. Cannot calculate orthographic.');
        }

        const rw = 1 / width;
        const rh = 1 / height;
        const rd = 1 / depth;

        const result = MatrixUtility.create(4);
        result.set(0, 0, 2 * rw);
        result.set(1, 1, 2 * rh);
        result.set(2, 2, -2 * rd);
        result.set(3, 3, 1);
        result.set(0, 3, -(right + left) * rw);
        result.set(1, 3, -(top + bottom) * rh);
        result.set(2, 3, -(far + near) * rd);

        return result;
    }

    static perspective(fovDegrees: number, width: number, height:number, near: number, far: number): Matrix{
        if(height == 0){
            throw new Error('Height is zero!');
        }
        const aspect = width / height;

        const depth = far - near;
        if(depth == 0){
            throw new Error('depth is zero!');
        }

        const fovRadians = MathUtility.degreesToRadians(fovDegrees);
        const tanValue = MathUtility.tan(fovRadians / 2);
        
        const result = MatrixUtility.create(4);
        result.set(0, 0, 1 / (tanValue * aspect));
        result.set(1, 1, 1 / tanValue);
        result.set(2, 2, -(far + near) / depth);
        result.set(2, 3, -(2 * far * near) / depth);
        result.set(3, 2, -1);

        return result;
    }

    static lookAt(eyePos: Vector3, targetPos: Vector3, up: Vector3): Matrix{
        const f = VectorUtility.normalize(VectorUtility.sub(eyePos, targetPos));
        const r = VectorUtility.normalize(VectorUtility.cross(f, up));
        const u = VectorUtility.normalize(VectorUtility.cross(r, f));
        
        const result = MatrixUtility.identity(4);
        result.set(0, 0, r.x);
        result.set(1, 0, r.y);
        result.set(2, 0, r.z);
        result.set(0, 1, u.x);
        result.set(1, 1, u.y);
        result.set(2, 1, u.z);
        result.set(0, 2, -f.x);
        result.set(1, 2, -f.y);
        result.set(2, 2, -f.z);
        result.set(0, 3, -VectorUtility.dot(r, eyePos));
        result.set(1, 3, -VectorUtility.dot(u, eyePos));
        result.set(2, 3, VectorUtility.dot(f, eyePos));

        return result;
    }

    static checkSquare(matrix: Matrix, sizeNum: number): boolean{
        return (matrix.col == sizeNum) && (matrix.row == sizeNum);
    }

    private static checkSizeEqual(a: Matrix, b: Matrix): boolean{
        if(a.col != b.col || a.row != b.row){
            console.log(`col: ${a.col},${b.col}`);
            console.log(`row: ${a.row},${b.row}`);
            return false;
        }

        return true;
    }

    private static createRotateMatrix2D(angle: number): Matrix{
        const rotateMatrix = MatrixUtility.identity(4);
        rotateMatrix.set(0, 0, MathUtility.cos(angle));
        rotateMatrix.set(0, 1, -MathUtility.sin(angle));
        rotateMatrix.set(1, 0, MathUtility.sin(angle));
        rotateMatrix.set(1, 1, MathUtility.cos(angle));
        
        return rotateMatrix;
    }

    private static createRotateMatrix3D(angle: number, axis: Vector3): Matrix{
        const rotateMatrix = MatrixUtility.identity(4);
        if(axis == DefaultVectorConstants.AXIS2DX){
            rotateMatrix.set(1, 1, MathUtility.cos(angle));
            rotateMatrix.set(1, 2, -MathUtility.sin(angle));
            rotateMatrix.set(2, 1, MathUtility.sin(angle));
            rotateMatrix.set(2, 2, MathUtility.cos(angle));
        }
        if(axis == DefaultVectorConstants.AXIS2DY){
            rotateMatrix.set(0, 0, MathUtility.cos(angle));
            rotateMatrix.set(0, 2, MathUtility.sin(angle));
            rotateMatrix.set(2, 0, -MathUtility.sin(angle));
            rotateMatrix.set(2, 2, MathUtility.cos(angle));
        }
        if(axis == DefaultVectorConstants.AXIS2DZ){
            rotateMatrix.set(0, 0, MathUtility.cos(angle));
            rotateMatrix.set(0, 1, -MathUtility.sin(angle));
            rotateMatrix.set(1, 0, MathUtility.sin(angle));
            rotateMatrix.set(1, 1, MathUtility.cos(angle));
        }
        return rotateMatrix;
    }

    private static createScaleMatrix2D(scalarX: number, scalarY: number): Matrix{
        const scaleMatrix = MatrixUtility.identity(3);
        scaleMatrix.set(0, 0, scalarX);
        scaleMatrix.set(1, 1, scalarY);

        return scaleMatrix;
    }

    private static createScaleMatrix3D(scalarX: number, scalarY: number, scalarZ: number): Matrix{
        const scaleMatrix = MatrixUtility.identity(4);
        scaleMatrix.set(0, 0, scalarX);
        scaleMatrix.set(1, 1, scalarY);
        scaleMatrix.set(2, 2, scalarZ);

        return scaleMatrix;
    }

    private static createInverseMatrix22(matrix: Matrix): Matrix{
        const a = matrix.get(0, 0);
        const b = matrix.get(0, 1);
        const c = matrix.get(1, 0);
        const d = matrix.get(1, 1);

        const det = a*d - b*c;
        if(det == 0){
            return Matrix.Empty;
        }

        const invDet = 1 / det;
        const result = MatrixUtility.create(2);
        result.set(0, 0, d * invDet);
        result.set(0, 1, -b * invDet);
        result.set(1, 0, -c * invDet);
        result.set(1, 1, a * invDet);
        return result;
    }

    private static createInverseMatrix33(matrix: Matrix): Matrix{
        const a = matrix.get(0, 0);
        const b = matrix.get(0, 1);
        const c = matrix.get(0, 2);
        const d = matrix.get(1, 0);
        const e = matrix.get(1, 1);
        const f = matrix.get(1, 2);
        const g = matrix.get(2, 0);
        const h = matrix.get(2, 1);
        const i = matrix.get(2, 2);

        const det = a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h;
        if(det == 0){
            return Matrix.Empty;
        }
        
        const invDet = 1 / det;
        const result = MatrixUtility.create(3);
        result.set(0, 0,  (e*i - f*h) * invDet);
        result.set(0, 1, -(b*i - c*h) * invDet);
        result.set(0, 2,  (b*f - c*e) * invDet);
        result.set(1, 0, -(d*i - f*g) * invDet);
        result.set(1, 1,  (a*i - c*g) * invDet);
        result.set(1, 2, -(a*f - c*d) * invDet);
        result.set(2, 0,  (d*h - e*g) * invDet);
        result.set(2, 1, -(a*h - b*g) * invDet);
        result.set(2, 2,  (a*e - b*d) * invDet);
        return result;
    }

    private static createInverseMatrix44(matrix: Matrix): Matrix{
        const a = matrix.get(0, 0);
        const b = matrix.get(0, 1);
        const c = matrix.get(0, 2);
        const d = matrix.get(0, 3);
        const e = matrix.get(1, 0);
        const f = matrix.get(1, 1);
        const g = matrix.get(1, 2);
        const h = matrix.get(1, 3);
        const i = matrix.get(2, 0);
        const j = matrix.get(2, 1);
        const k = matrix.get(2, 2);
        const l = matrix.get(2, 3);
        const m = matrix.get(3, 0);
        const n = matrix.get(3, 1);
        const o = matrix.get(3, 2);
        const p = matrix.get(3, 3);

        const det = a*f*k*p + a*g*l*n + a*h*j*o 
                    - a*h*k*n - a*g*j*p - a*f*l*o
                    - b*e*k*p - c*e*l*n - d*e*j*o
                    + d*e*k*n + c*e*j*p + b*e*l*o
                    + b*g*i*p + c*h*i*n + d*f*i*o
                    - d*g*i*n - c*f*i*p - b*h*i*o
                    - b*g*l*m - c*h*j*m - d*f*k*m
                    + d*g*j*m + c*f*l*m + b*h*k*m;
        if(det == 0){
            return Matrix.Empty;
        }

        const invDet = 1 / det;
        const result = MatrixUtility.create(4);
        result.set(0, 0, (f*k*p + g*l*n + h*j*o - h*k*n - g*j*p - f*l*o) * invDet);
        result.set(0, 1, (-b*k*p - c*l*n - d*j*o + d*k*n + c*j*p + b*l*o) * invDet);
        result.set(0, 2, (b*g*p + c*h*n + d*f*o - d*g*n - c*f*p - b*h*o) * invDet);
        result.set(0, 3, (-b*g*l - c*h*j - d*f*k + d*g*j + c*f*l + b*h*k) * invDet);
        result.set(1, 0, (-e*k*p - g*l*m - h*i*o + h*k*m + g*i*p + e*l*o) * invDet);
        result.set(1, 1, (a*k*p + c*l*m + d*i*o - d*k*m - c*i*p - a*l*o) * invDet);
        result.set(1, 2, (-a*g*p - c*h*m - d*e*o + d*g*m + c*e*p + a*h*o) * invDet);
        result.set(1, 3, (a*g*l + c*h*i + d*e*k - d*g*i - c*e*l - a*h*k) * invDet);
        result.set(2, 0, (e*j*p + f*l*m + h*i*n - h*j*m - f*i*p - e*l*n) * invDet);
        result.set(2, 1, (-a*j*p - b*l*m - d*i*n + d*j*m + b*i*p + a*l*n) * invDet);
        result.set(2, 2, (a*f*p + b*h*m + d*e*n - d*f*m - b*e*p - a*h*n) * invDet);
        result.set(2, 3, (-a*f*l - b*h*i - d*e*j + d*f*i + b*e*l + a*h*j) * invDet);
        result.set(3, 0, (-e*j*o - f*k*m - g*i*n + g*j*m + f*i*o + e*k*n) * invDet);
        result.set(3, 1, (a*j*o + b*k*m + c*i*n - c*j*m - b*i*o - a*k*n) * invDet);
        result.set(3, 2, (-a*f*o - b*g*m - c*e*n + c*f*m + b*e*o + a*g*n) * invDet);
        result.set(3, 3, (a*f*k + b*g*i + c*e*j - c*f*i - b*e*k - a*g*j) * invDet);
        return result;
    }
}