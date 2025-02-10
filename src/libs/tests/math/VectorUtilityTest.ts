import { Vector2 } from "../../src/math/vector/Vector2";
import { Vector3 } from "../../src/math/vector/Vector3";
import { VectorUtility } from "../../src/math/VectorUtility";

test("Vector Add", () => {
    const a = new Vector2(3, 4);
    const b = new Vector2(4, 5);

    const result = VectorUtility.add(a, b);
    const except = new Vector2(7, 9);
    expect(result).toEqual(except);
});

test("Vector Sub", () => {
    const a = new Vector2(3, 4);
    const b = new Vector2(4, 5);

    const result = VectorUtility.sub(a, b);
    const except = new Vector2(1, 1);
    expect(result).toEqual(except);
});

test("Vector calcDistance", () => {
    const a = new Vector2(3, 4);
    const b = new Vector2(4, 5);

    const result = VectorUtility.calcDistance(a, b);
    const except = Math.sqrt(2);
    expect(result).toEqual(except);
});

test("Vector dot", () => {
    const a = new Vector2(3, 4);
    const b = new Vector2(4, 5);

    const result = VectorUtility.dot(a, b);
    const except = 32;
    expect(result).toEqual(except);
});

test("Vector length", () => {
    const a = new Vector2(3, 4);

    const result = VectorUtility.length(a);
    const except = 5;
    expect(result).toEqual(except);
});

test("Vector normalize", () => {
    const a = new Vector2(3, 4);

    const result = VectorUtility.normalize(a);
    const except = new Vector2(0.6, 0.8);
    expect(result).toEqual(except);
});

test("Vector multiply", () => {
    const a = new Vector2(3, 4);

    const result = VectorUtility.multiply(a, 3);
    const except = new Vector2(9, 12);
    expect(result).toEqual(except);
});

test("Vector divide", () => {
    const a = new Vector2(3, 4);

    const result = VectorUtility.divide(a, 5);
    const except = new Vector2(0.6, 0.8);
    expect(result).toEqual(except);
});

test("Vector SetLength", () => {
    const a = new Vector2(3, 4);

    const result = VectorUtility.setLength(a, 10);
    const except = new Vector2(6, 8);
    expect(result).toEqual(except);
});

test("Vector calcAngle", () => {
    const a = new Vector2(0, 1);
    const b = new Vector2(1, 0);

    const result = VectorUtility.calcAngle(a, b);
    const except = Math.PI * 0.5;
    expect(result).toEqual(except);
});

test("Vector cross", () => {
    const a = new Vector3(1, 2, 3);
    const b = new Vector3(3, 4, 5);

    const result = VectorUtility.cross(a, b);
    const except = new Vector3(-2, 4, -2);
    expect(result).toEqual(except);
});

test("Vector heading2D", () => {
    const a = new Vector2(0, 1);

    const result = VectorUtility.heading2D(a);
    const except = Math.PI * 0.5;
    expect(result).toEqual(except);
});