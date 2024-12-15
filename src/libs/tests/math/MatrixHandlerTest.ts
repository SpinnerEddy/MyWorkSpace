import { Matrix } from "../../src/math/Matrix";
import { MatrixHandler } from "../../src/math/MatrixHandler";

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