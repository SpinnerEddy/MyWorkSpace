import { Matrix } from "../../src/math/Matrix";
import { MatrixHandler } from "../../src/math/MatrixHandler";
import { Vector3 } from "../../src/math/Vector3";

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
    let matrixA = new Matrix(1, 3);
    let vectorB = new Vector3(1, 2, 3);
    matrixA.set(0, 0, 1);
    matrixA.set(0, 1, 2);
    matrixA.set(0, 2, 3);
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

    let exceptResult = new Matrix(2, 2);
    exceptResult.set(0, 0, 14);
    exceptResult.set(0, 1, 14);
    exceptResult.set(1, 0, 14);
    exceptResult.set(1, 1, 14);

    expect(result).toEqual(exceptResult);
});

