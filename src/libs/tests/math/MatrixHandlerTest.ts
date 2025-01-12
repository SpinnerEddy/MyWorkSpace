import { Matrix } from "../../src/math/matrix/Matrix";
import { MatrixHandler } from "../../src/math/MatrixHandler";
import { Vector2 } from "../../src/math/vector/Vector2";
import { Vector3 } from "../../src/math/vector/Vector3";
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
    let matrixA = new Matrix(3, 2, 0);
    let matrixB = new Matrix(2, 3, 0);
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
    
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, 1);
    exceptResult.set(1, 0, 2);
    exceptResult.set(2, 0, 3);

    expect(matrix).toEqual(exceptResult);
});

test("Vector Translate2D", () => {
    let vector = new Vector2(1, 2);
    let translateVector = new Vector2(3, 4);

    let result = MatrixHandler.translate2D(vector, translateVector);
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, 4);
    exceptResult.set(1, 0, 6);
    exceptResult.set(2, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 1", () => {
    let vector = new Vector3(0, 0, 0);
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
    let vector = new Vector3(5, -5, 10);
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
    let vector = new Vector3(5, -5, 10);
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
    let vector = new Vector2(1, 0);
    let angle = Math.PI * 0.5;

    let result = MatrixHandler.rotate2D(vector, angle);
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, 0);
    exceptResult.set(1, 0, 1);
    exceptResult.set(2, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate2D 2", () => {
    let vector = new Vector2(1, 0);
    let angle = Math.PI;

    let result = MatrixHandler.rotate2D(vector, angle);
    let exceptResult = new Matrix(3, 1);
    exceptResult.set(0, 0, -1);
    exceptResult.set(1, 0, 0);
    exceptResult.set(2, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate3D 1", () => {
    let vector = new Vector3(1, 0, 0);
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
    let vector = new Vector3(0, 1, 0);
    let angle = Math.PI * 0.5;

    let result = MatrixHandler.rotate3D(vector, angle, DefaultVectorConstants.AXIS2DX);
    let exceptResult = new Matrix(4, 1);
    exceptResult.set(0, 0, 0);
    exceptResult.set(1, 0, 0);
    exceptResult.set(2, 0, 1);
    exceptResult.set(3, 0, 1);

    expect(result).toEqual(exceptResult);
});

test("Matrix Inverse 2x2", () => {
    let matrix = new Matrix(2, 2, 0);
    matrix.set(0, 0, 1);
    matrix.set(0, 1, 2);
    matrix.set(1, 0, 3);
    matrix.set(1, 1, 4);

    let result = MatrixHandler.inverse(matrix);

    let exceptResult = new Matrix(2, 2, 0);
    exceptResult.set(0, 0, -2);
    exceptResult.set(0, 1, 1);
    exceptResult.set(1, 0, 1.5);
    exceptResult.set(1, 1, -0.5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Inverse 3x3", () => {
    let matrix = new Matrix(3, 3, 1);
    matrix.set(0, 2, 2);
    matrix.set(1, 1, 2);
    matrix.set(2, 0, 2);

    let result = MatrixHandler.inverse(matrix);

    let exceptResult = new Matrix(3, 3, -0.25);
    exceptResult.set(0, 2, 0.75);
    exceptResult.set(1, 1, 0.75);
    exceptResult.set(2, 0, 0.75);

    expect(result).toEqual(exceptResult);
});


test("Matrix Inverse 4x4", () => {
    let matrix = new Matrix(4, 4, 1);
    matrix.set(0, 3, -1);
    matrix.set(1, 2, -1);
    matrix.set(2, 1, -1);
    matrix.set(3, 0, -1);

    let result = MatrixHandler.inverse(matrix);

    let exceptResult = new Matrix(4, 4, 1/4);
    exceptResult.set(0, 3, -1/4);
    exceptResult.set(1, 2, -1/4);
    exceptResult.set(2, 1, -1/4);
    exceptResult.set(3, 0, -1/4);

    expect(result).toEqual(exceptResult);
});

test("Matrix Perspective", () => {
    let result = MatrixHandler.perspective(90, 16, 9, 1, 100);

    let exceptResult = MatrixHandler.create(4);
    exceptResult.set(0, 0, 0.5625);
    exceptResult.set(1, 1, 1);
    exceptResult.set(2, 2, -1.0202);
    exceptResult.set(2, 3, -2.0202);
    exceptResult.set(3, 2, -1);

    expect(result.get(0, 0)).toBeCloseTo(exceptResult.get(0, 0));
    expect(result.get(0, 1)).toBeCloseTo(exceptResult.get(0, 1));
    expect(result.get(0, 2)).toBeCloseTo(exceptResult.get(0, 2));
    expect(result.get(0, 3)).toBeCloseTo(exceptResult.get(0, 3));
    expect(result.get(1, 0)).toBeCloseTo(exceptResult.get(1, 0));
    expect(result.get(1, 1)).toBeCloseTo(exceptResult.get(1, 1));
    expect(result.get(1, 2)).toBeCloseTo(exceptResult.get(1, 2));
    expect(result.get(1, 3)).toBeCloseTo(exceptResult.get(1, 3));
    expect(result.get(2, 0)).toBeCloseTo(exceptResult.get(2, 0));
    expect(result.get(2, 1)).toBeCloseTo(exceptResult.get(2, 1));
    expect(result.get(2, 2)).toBeCloseTo(exceptResult.get(2, 2));
    expect(result.get(2, 3)).toBeCloseTo(exceptResult.get(2, 3));
    expect(result.get(3, 0)).toBeCloseTo(exceptResult.get(3, 0));
    expect(result.get(3, 1)).toBeCloseTo(exceptResult.get(3, 1));
    expect(result.get(3, 2)).toBeCloseTo(exceptResult.get(3, 2));
    expect(result.get(3, 3)).toBeCloseTo(exceptResult.get(3, 3));
});

test("Matrix Orthographic", () => {
    let result = MatrixHandler.orthographic(-2, 2, 2, -2, 1, 10);

    let exceptResult = MatrixHandler.create(4);
    exceptResult.set(0, 0, 0.5);
    exceptResult.set(1, 1, 0.5);
    exceptResult.set(2, 2, -0.222);
    exceptResult.set(2, 3, -1.222);
    exceptResult.set(3, 3, 1);

    expect(result.get(0, 0)).toBeCloseTo(exceptResult.get(0, 0));
    expect(result.get(0, 1)).toBeCloseTo(exceptResult.get(0, 1));
    expect(result.get(0, 2)).toBeCloseTo(exceptResult.get(0, 2));
    expect(result.get(0, 3)).toBeCloseTo(exceptResult.get(0, 3));
    expect(result.get(1, 0)).toBeCloseTo(exceptResult.get(1, 0));
    expect(result.get(1, 1)).toBeCloseTo(exceptResult.get(1, 1));
    expect(result.get(1, 2)).toBeCloseTo(exceptResult.get(1, 2));
    expect(result.get(1, 3)).toBeCloseTo(exceptResult.get(1, 3));
    expect(result.get(2, 0)).toBeCloseTo(exceptResult.get(2, 0));
    expect(result.get(2, 1)).toBeCloseTo(exceptResult.get(2, 1));
    expect(result.get(2, 2)).toBeCloseTo(exceptResult.get(2, 2));
    expect(result.get(2, 3)).toBeCloseTo(exceptResult.get(2, 3));
    expect(result.get(3, 0)).toBeCloseTo(exceptResult.get(3, 0));
    expect(result.get(3, 1)).toBeCloseTo(exceptResult.get(3, 1));
    expect(result.get(3, 2)).toBeCloseTo(exceptResult.get(3, 2));
    expect(result.get(3, 3)).toBeCloseTo(exceptResult.get(3, 3));
});

test("Matrix LookAt", () => {
    const eyePos = new Vector3(1, 0, 0);
    const targetPos = new Vector3(0, 0, 0);
    const up = new Vector3(0, 1, 0);
    let result = MatrixHandler.lookAt(eyePos, targetPos, up);

    let exceptResult = MatrixHandler.create(4);
    exceptResult.set(0, 2, -1);
    exceptResult.set(1, 1, 1);
    exceptResult.set(2, 0, 1);
    exceptResult.set(3, 2, -1);
    exceptResult.set(3, 3, 1);

    expect(result.get(0, 0)).toBeCloseTo(exceptResult.get(0, 0));
    expect(result.get(0, 1)).toBeCloseTo(exceptResult.get(0, 1));
    expect(result.get(0, 2)).toBeCloseTo(exceptResult.get(0, 2));
    expect(result.get(0, 3)).toBeCloseTo(exceptResult.get(0, 3));
    expect(result.get(1, 0)).toBeCloseTo(exceptResult.get(1, 0));
    expect(result.get(1, 1)).toBeCloseTo(exceptResult.get(1, 1));
    expect(result.get(1, 2)).toBeCloseTo(exceptResult.get(1, 2));
    expect(result.get(1, 3)).toBeCloseTo(exceptResult.get(1, 3));
    expect(result.get(2, 0)).toBeCloseTo(exceptResult.get(2, 0));
    expect(result.get(2, 1)).toBeCloseTo(exceptResult.get(2, 1));
    expect(result.get(2, 2)).toBeCloseTo(exceptResult.get(2, 2));
    expect(result.get(2, 3)).toBeCloseTo(exceptResult.get(2, 3));
    expect(result.get(3, 0)).toBeCloseTo(exceptResult.get(3, 0));
    expect(result.get(3, 1)).toBeCloseTo(exceptResult.get(3, 1));
    expect(result.get(3, 2)).toBeCloseTo(exceptResult.get(3, 2));
    expect(result.get(3, 3)).toBeCloseTo(exceptResult.get(3, 3));
});
