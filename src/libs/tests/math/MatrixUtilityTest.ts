import { Matrix44 } from "../../src/math/matrix/Matrix44";
import { MatrixUtility } from "../../src/math/MatrixUtility";
import { Vector2 } from "../../src/math/vector/Vector2";
import { Vector3 } from "../../src/math/vector/Vector3";
import { DefaultVectorConstants } from "../../src/math/vector/VectorConstants";

test("Matrix Add", () => {
    let matrixA = MatrixUtility.identity22();
    let matrixB = MatrixUtility.identity22();

    matrixA.set(0, 1, 2);
    matrixA.set(1, 0, 3);
    matrixB.set(0, 1, 2);
    matrixB.set(1, 0, 3);

    let result = MatrixUtility.add(matrixA, matrixB);
    let exceptResult = MatrixUtility.identity22();
    exceptResult.set(0, 0, 2);
    exceptResult.set(0, 1, 4);
    exceptResult.set(1, 0, 6);
    exceptResult.set(1, 1, 2);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply number", () => {
    let matrixA = MatrixUtility.identity22();

    let result = MatrixUtility.multiply(matrixA, 5);
    let exceptResult = MatrixUtility.identity22();
    exceptResult.set(0, 0, 5);
    exceptResult.set(0, 1, 0);
    exceptResult.set(1, 0, 0);
    exceptResult.set(1, 1, 5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply Matrix", () => {
    let matrixA = MatrixUtility.identity22();
    let matrixB = MatrixUtility.identity22();

    matrixA = MatrixUtility.multiply(matrixA, 5);
    matrixB.set(0, 1, 3);
    matrixB.set(1, 0, 2);
    let result = MatrixUtility.multiply(matrixA, matrixB);

    let exceptResult = MatrixUtility.identity22();
    exceptResult.identity();
    exceptResult.set(0, 0, 5);
    exceptResult.set(0, 1, 15);
    exceptResult.set(1, 0, 10);
    exceptResult.set(1, 1, 5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Multiply Matrix", () => {
    let matrixA = MatrixUtility.identity22();
    let matrixB = MatrixUtility.identity22();

    matrixA = MatrixUtility.multiply(matrixA, 5);
    matrixB.set(0, 1, 3);
    matrixB.set(1, 0, 2);
    let result = MatrixUtility.multiply(matrixA, matrixB);

    let exceptResult = MatrixUtility.identity22();
    exceptResult.set(0, 0, 5);
    exceptResult.set(0, 1, 15);
    exceptResult.set(1, 0, 10);
    exceptResult.set(1, 1, 5);

    expect(result).toEqual(exceptResult);
});


test("Vector Translate2D", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 1);
    mat.set(1, 3, 2);
    let translateVector = new Vector2(3, 4);

    let result = MatrixUtility.translate2D(mat, translateVector);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 3, 4);
    exceptResult.set(1, 3, 6);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 1", () => {
    let mat = MatrixUtility.identity44();
    let translateVector = new Vector3(1, 2, 3);

    let result = MatrixUtility.translate3D(mat, translateVector);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 3, 1);
    exceptResult.set(1, 3, 2);
    exceptResult.set(2, 3, 3);
    exceptResult.set(3, 3, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 2", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 5);
    mat.set(1, 3, -5);
    mat.set(2, 3, 10);
    let translateVector = new Vector3(2, 3, -4);

    let result = MatrixUtility.translate3D(mat, translateVector);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 3, 7);
    exceptResult.set(1, 3, -2);
    exceptResult.set(2, 3, 6);
    exceptResult.set(3, 3, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector Translate3D 3", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 5);
    mat.set(1, 3, -5);
    mat.set(2, 3, 10);
    let translateVector = new Vector3(0, 0, 0);

    let result = MatrixUtility.translate3D(mat, translateVector);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 3, 5);
    exceptResult.set(1, 3, -5);
    exceptResult.set(2, 3, 10);
    exceptResult.set(3, 3, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate2D 1", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 1);
    mat.set(1, 3, 0);
    let angle = Math.PI * 0.5;

    let result = MatrixUtility.rotate2D(mat, angle);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 0, 0);
    exceptResult.set(0, 1, -1);
    exceptResult.set(1, 0, 1);
    exceptResult.set(1, 1, 0);
    exceptResult.set(1, 3, 1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate2D 2", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 1);
    mat.set(1, 3, 0);
    let angle = Math.PI;

    let result = MatrixUtility.rotate2D(mat, angle);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 0, -1);
    exceptResult.set(0, 3, -1);
    exceptResult.set(1, 1, -1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate3D 1", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 1);
    mat.set(1, 3, 0);
    mat.set(2, 3, 0);
    let angle = Math.PI * 0.5;

    let result = MatrixUtility.rotate3D(mat, angle, DefaultVectorConstants.AXIS2DY);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(0, 0, 0);
    exceptResult.set(0, 2, 1);
    exceptResult.set(2, 0, -1);
    exceptResult.set(2, 2, 0);
    exceptResult.set(2, 3, -1);

    expect(result).toEqual(exceptResult);
});

test("Vector rotate3D 2", () => {
    let mat = MatrixUtility.identity44();
    mat.set(0, 3, 0);
    mat.set(1, 3, 1);
    mat.set(2, 3, 0);
    let angle = Math.PI * 0.5;

    let result = MatrixUtility.rotate3D(mat, angle, DefaultVectorConstants.AXIS2DX);
    let exceptResult = MatrixUtility.identity44();
    exceptResult.set(1, 1, 0);
    exceptResult.set(1, 2, -1);
    exceptResult.set(2, 1, 1);
    exceptResult.set(2, 2, 0);
    exceptResult.set(2, 3, 1);

    expect(result).toEqual(exceptResult);
});

test("Matrix Inverse 2x2", () => {
    let matrix = MatrixUtility.identity22();
    matrix.set(0, 0, 1);
    matrix.set(0, 1, 2);
    matrix.set(1, 0, 3);
    matrix.set(1, 1, 4);

    let result = MatrixUtility.inverse(matrix);

    let exceptResult = MatrixUtility.identity22();
    exceptResult.set(0, 0, -2);
    exceptResult.set(0, 1, 1);
    exceptResult.set(1, 0, 1.5);
    exceptResult.set(1, 1, -0.5);

    expect(result).toEqual(exceptResult);
});

test("Matrix Inverse 3x3", () => {
    let matrix = MatrixUtility.identity33();
    matrix.fillNumber(1);
    matrix.set(0, 2, 2);
    matrix.set(1, 1, 2);
    matrix.set(2, 0, 2);

    let result = MatrixUtility.inverse(matrix);

    let exceptResult = MatrixUtility.identity33();
    exceptResult.fillNumber(-0.25);
    exceptResult.set(0, 2, 0.75);
    exceptResult.set(1, 1, 0.75);
    exceptResult.set(2, 0, 0.75);

    expect(result).toEqual(exceptResult);
});


test("Matrix Inverse 4x4", () => {
    let matrix = MatrixUtility.identity44();
    matrix.fillNumber(1);
    matrix.set(0, 3, -1);
    matrix.set(1, 2, -1);
    matrix.set(2, 1, -1);
    matrix.set(3, 0, -1);

    let result = MatrixUtility.inverse(matrix);

    let exceptResult = MatrixUtility.identity44();
    exceptResult.fillNumber(1/4);
    exceptResult.set(0, 3, -1/4);
    exceptResult.set(1, 2, -1/4);
    exceptResult.set(2, 1, -1/4);
    exceptResult.set(3, 0, -1/4);

    expect(result).toEqual(exceptResult);
});

test("Matrix Perspective", () => {
    let result = MatrixUtility.perspective(90, 16, 9, 1, 100);

    let exceptResult = new Matrix44();
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
    let result = MatrixUtility.orthographic(-2, 2, 2, -2, 1, 10);

    let exceptResult = new Matrix44();
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
    let result = MatrixUtility.lookAt(eyePos, targetPos, up);

    console.log(result);

    let exceptResult = new Matrix44();
    exceptResult.set(0, 2, -1);
    exceptResult.set(1, 1, 1);
    exceptResult.set(2, 0, 1);
    exceptResult.set(2, 3, -1);
    exceptResult.set(3, 3, 1);

    console.log(exceptResult);

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
