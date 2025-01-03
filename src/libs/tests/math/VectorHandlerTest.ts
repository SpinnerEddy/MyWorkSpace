import { Vector2 } from "../../src/math/vector/Vector2";
import { VectorHandler } from "../../src/math/VectorHandler";

test("Vector Add", () => {
    const a = new Vector2(3, 4);
    const b = new Vector2(4, 5);

    const result = VectorHandler.add(a, b);
    const except = new Vector2(7, 9);
    expect(result).toEqual(except);
});