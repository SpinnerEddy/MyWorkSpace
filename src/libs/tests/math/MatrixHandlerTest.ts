import { Matrix } from "../../src/math/matrix/Matrix";
import { MatrixHandler } from "../../src/math/MatrixHandler";
import { Vector2 } from "../../src/math/vector/Vector2";
import { Vector3 } from "../../src/math/vector/Vector3";
import { Vector4 } from "../../src/math/vector/Vector4";
import { DefaultVectorConstants } from "../../src/math/vector/VectorConstants";

test("Matrix Add", () => {
    let matrixA = MatrixHandler.identity(2);
    let matrixB = MatrixHandler.identity(2);

    matrixA.set(0, 1, 2);
    matrixA.set(1, 0, 3);
    matrixB.set(0, 1, 2);
    matrixB.set(1, 0, 3);

    let result = MatrixHandler.add(matrixA, matrixB);
    let exceptResult = new Matrix(2, 2);
    exceptResult.set(0, 0, 2);
    exceptResult.set(0, 1, 4);
    exceptResult.set(1, 0, 6);
    exceptResult.set(1, 1, 2);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply number", () => {
    let matrixA = MatrixHandler.identity(2);

    let result = MatrixHandler.multiply(matrixA, 5);
    let exceptResult = new Matrix(2, 2);
    exceptResult.set(0, 0, 5);
    exceptResult.set(0, 1, 0);
    exceptResult.set(1, 0, 0);
    exceptResult.set(1, 1, 5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply Matrix", () => {
    let matrixA = MatrixHandler.identity(2);
    let matrixB = MatrixHandler.identity(2);
    matrixA = MatrixHandler.multiply(matrixA, 5);
    matrixB.set(0, 1, 3);
    matrixB.set(1, 0, 2);
    let result = MatrixHandler.multiply(matrixA, matrixB);

    let exceptResult = new Matrix(2, 2);
    exceptResult.set(0, 0, 5);
    exceptResult.set(0, 1, 15);
    exceptResult.set(1, 0, 10);
    exceptResult.set(1, 1, 5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply Matrix", () => {
    let matrixA = MatrixHandler.identity(2);
    let matrixB = MatrixHandler.identity(2);
    matrixA = MatrixHandler.multiply(matrixA, 5);
    matrixB.set(0, 1, 3);
    matrixB.set(1, 0, 2);
    let result = MatrixHandler.multiply(matrixA, matrixB);

    let exceptResult = new Matrix(2, 2);
    exceptResult.set(0, 0, 5);
    exceptResult.set(0, 1, 15);
    exceptResult.set(1, 0, 10);
    exceptResult.set(1, 1, 5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply Vector", () => {
    let matrixA = new Matrix(3, 1);
    let vectorB = new Vector3(1, 2, 3);
    matrixA.set(0, 0, 1);
    matrixA.set(1, 0, 2);
    matrixA.set(2, 0, 3);
    let result = MatrixHandler.multiply(matrixA, vectorB);

    let exceptResult = new Matrix(1, 1);
    exceptResult.set(0, 0, 14);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply Matrix not square", () => {
    let matrixA = new Matrix(2, 3, 0);
    let matrixB = new Matrix(3, 2, 0);
    matrixA.set(0, 0, 1);
    matrixA.set(0, 1, 2);
    matrixA.set(0, 2, 3);
    matrixA.set(1, 0, 1);
    matrixA.set(1, 1, 2);
    matrixA.set(1, 2, 3);

    matrixB.set(0, 0, 1);
    matrixB.set(0, 1, 1);
    matrixB.set(1, 0, 2);
    matrixB.set(1, 1, 2);
    matrixB.set(2, 0, 3);
    matrixB.set(2, 1, 3);

    let result = MatrixHandler.multiply(matrixA, matrixB);

    let exceptResult = new Matrix(3, 3);
    exceptResult.set(0, 0, 2);
    exceptResult.set(1, 0, 4);
    exceptResult.set(2, 0, 6);
    exceptResult.set(0, 1, 4);
    exceptResult.set(1, 1, 8);
    exceptResult.set(2, 1, 12);
    exceptResult.set(0, 2, 6);
    exceptResult.set(1, 2, 12);
    exceptResult.set(2, 2, 18);

    expect(result.row).toEqual(exceptResult.row);
    expect(result.col).toEqual(exceptResult.col);
});

test("Vector Translate To Matrix", () => {
    let vector = new Vector3(1, 2, 3);
    let matrix = vector.toMatrix();
    
    let exceptResult = new Matrix(1, 3);
    exceptResult.set(0, 0, 1);
    exceptResult.set(0, 1, 2);
    exceptResult.set(0, 2, 3);

    expect(matrix).toEqual(exceptResult);
});

test("Vector Translate2D", () => {
    let vector = new Vector3(1, 2, 1);
    let translateVector = new Vector2(3, 4);

    let result = MatrixHandler.translate2D(vector, translateVector);
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, 4);
    exceptResult.set(1, 0, 6);
    exceptResult.set(2, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 1", () => {
    let vector = new Vector4(0, 0, 0, 1);
    let translateVector = new Vector3(1, 2, 3);

    let result = MatrixHandler.translate3D(vector, translateVector);
    let exceptResult = new Matrix(4, 1);
    exceptResult.set(0, 0, 1);
    exceptResult.set(1, 0, 2);
    exceptResult.set(2, 0, 3);
    exceptResult.set(3, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 2", () => {
    let vector = new Vector4(5, -5, 10, 1);
    let translateVector = new Vector3(2, 3, -4);

    let result = MatrixHandler.translate3D(vector, translateVector);
    let exceptResult = new Matrix(4, 1);
    exceptResult.set(0, 0, 7);
    exceptResult.set(1, 0, -2);
    exceptResult.set(2, 0, 6);
    exceptResult.set(3, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 3", () => {
    let vector = new Vector4(5, -5, 10, 1);
    let translateVector = new Vector3(0, 0, 0);

    let result = MatrixHandler.translate3D(vector, translateVector);
    let exceptResult = new Matrix(4, 1);
    exceptResult.set(0, 0, 5);
    exceptResult.set(1, 0, -5);
    exceptResult.set(2, 0, 10);
    exceptResult.set(3, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate2D 1", () => {
    let vector = new Vector3(1, 0, 1);
    let angle = Math.PI * 0.5;

    let result = MatrixHandler.rotate2D(vector, angle);
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, 0);
    exceptResult.set(1, 0, 1);
    exceptResult.set(2, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate2D 2", () => {
    let vector = new Vector3(1, 0, 1);
    let angle = Math.PI;

    let result = MatrixHandler.rotate2D(vector, angle);
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, -1);
    exceptResult.set(1, 0, 0);
    exceptResult.set(2, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate3D 1", () => {
    let vector = new Vector4(1, 0, 0, 1);
    let angle = Math.PI * 0.5;

    let result = MatrixHandler.rotate3D(vector, angle, DefaultVectorConstants.AXIS2DY);
    let exceptResult = new Matrix(4, 1);
    exceptResult.set(0, 0, 0);
    exceptResult.set(1, 0, 0);
    exceptResult.set(2, 0, -1);
    exceptResult.set(3, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate3D 2", () => {
    let vector = new Vector4(0, 1, 0, 1);
    let angle = Math.PI * 0.5;

    let result = MatrixHandler.rotate3D(vector, angle, DefaultVectorConstants.AXIS2DX);
    let exceptResult = new Matrix(4, 1);
    exceptResult.set(0, 0, 0);
    exceptResult.set(1, 0, 0);
    exceptResult.set(2, 0, 1);
    exceptResult.set(3, 0, 1);

    expect(result).toEqual(exceptResult);
});
