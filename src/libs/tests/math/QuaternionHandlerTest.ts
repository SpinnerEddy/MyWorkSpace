import { QuaternionHandler } from "../../src/math/QuaternionHandler";

test("Quaternion Add", () => {
    const a = QuaternionHandler.create(1, 2, 3, 4);
    const b = QuaternionHandler.create(4, 3, 2, 1);

    const result = QuaternionHandler.add(a, b);
    const except = QuaternionHandler.create(5, 5, 5, 5);
    expect(result).toEqual(except);
});

test("Quaternion Sub", () => {
    const a = QuaternionHandler.create(5, 4, 3, 2);
    const b = QuaternionHandler.create(4, 3, 2, 1);

    const result = QuaternionHandler.sub(a, b);
    const except = QuaternionHandler.create(1, 1, 1, 1);
    expect(result).toEqual(except);
});

test("Quaternion Multiply", () => {
    const q1 = QuaternionHandler.createFromEuler(Math.PI / 6, Math.PI / 4, Math.PI / 3);
    const q2 = QuaternionHandler.createFromEuler(-Math.PI / 6, -Math.PI / 4, -Math.PI / 3);

    const result = QuaternionHandler.multiply(q1, q2);
    const except = QuaternionHandler.create(0.2134, -0.4170, -0.0089, 0.8835);

    expect(result.x).toBeCloseTo(except.x);
    expect(result.y).toBeCloseTo(except.y);
    expect(result.z).toBeCloseTo(except.z);
    expect(result.w).toBeCloseTo(except.w);
});
