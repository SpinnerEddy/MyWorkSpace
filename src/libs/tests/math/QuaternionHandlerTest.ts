import { QuaternionHandler } from "../../src/math/QuaternionHandler";

test("Quaternion Add", () => {
    const a = QuaternionHandler.create(1, 2, 3, 4);
    const b = QuaternionHandler.create(4, 3, 2, 1);

    const result = QuaternionHandler.add(a, b);
    const except = QuaternionHandler.create(5, 5, 5, 5);
    expect(result).toEqual(except);
});
