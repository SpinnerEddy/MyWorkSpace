import { MathUtility } from "./MathUtility";
import { Vector } from "./vector/Vector";
import { Vector2 } from "./vector/Vector2";
import { Vector3 } from "./vector/Vector3";
import { Vector4 } from "./vector/Vector4";

export class VectorHandler{
    static min<T extends Vector>(a: T, b: T): T {
        const aLength = VectorHandler.length(a);
        const bLength = VectorHandler.length(b);
        return aLength <= bLength ? a: b;
    }

    static max<T extends Vector>(a: T, b: T): T {
        const aLength = VectorHandler.length(a);
        const bLength = VectorHandler.length(b);
        return aLength >= bLength ? a: b;
    }

    static add<T extends Vector>(a: T, b: T): T {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = a.values.map((val, index) => val + b.values[index]);
        return VectorHandler.convertVector(a.length, result);
    }

    static sub<T extends Vector>(a: T, b: T): T {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = b.values.map((val, index) => val - a.values[index]);
        return VectorHandler.convertVector(a.length, result);
    }

    static calcDistance<T extends Vector>(a: T, b: T): number {
        const subVector = VectorHandler.sub(a, b);
        const result = VectorHandler.length(subVector);
        return result;
    }

    static calcAngle<T extends Vector>(a: T, b: T): number {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const dotProduct = VectorHandler.dot(a, b);
        const aLength = VectorHandler.length(a);
        const bLength = VectorHandler.length(b);

        if(aLength == 0 || bLength == 9){
            throw new Error('Vector length is zero. Cannot calculate!')
        }

        const cosTheta = dotProduct / (aLength * bLength);
        const angle = MathUtility.acos(cosTheta);

        return angle;
    }

    static dot<T extends Vector>(a: T, b: T): number {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = a.values.reduce((sum, value, index) => sum + value * b.values[index], 0.0);
        return result;
    }

    static multiply<T extends Vector>(a: T, b: number): T {
        const result = a.values.map((val) => val * b);
        return VectorHandler.convertVector(a.length, result);
    }

    static divide<T extends Vector>(a: T, b: number): T {
        if(b == 0){
            throw new Error("Cannot divide because b is zero!!");
        }
        const result = a.values.map((val) => val / b);
        return VectorHandler.convertVector(a.length, result);
    }

    static limit<T extends Vector>(a: T, b: number): T {
        if(a.length < b){
            return a;
        }

        const result = VectorHandler.setLength(a, b);
        return result;
    }

    static setLength<T extends Vector>(a: T, b: number): T {
        const norm = VectorHandler.normalize(a);
        const result = VectorHandler.multiply(norm, b);
        return result;
    }

    static normalize<T extends Vector>(vector: T): T {
        const len = VectorHandler.length(vector);
        const result = VectorHandler.divide(vector, len);

        return result;
    }

    static length<T extends Vector>(vector: T): number {
        const result = Math.sqrt(vector.values.reduce(
            (sum, val) => sum + Math.pow(val, 2.0), 0.0));
        return result;
    }

    static lerp<T extends Vector>(min: T, max: T, t: number): T {
        if(t == 0) return min;
        if(t == 1) return max;

        const a = VectorHandler.multiply(min, (1 - t));
        const b = VectorHandler.multiply(max, t);
        const result = VectorHandler.add(a, b);
        return result;
    }

    static cross(a: Vector3, b: Vector3): Vector3{
        const v1 = a.y*b.z - a.z*b.y;
        const v2 = a.z*b.x - a.x*b.z;
        const v3 = a.x*b.y - a.y*b.x;
        return new Vector3(v1, v2, v3);
    }

    static heading2D(vector: Vector2): number {
        const radians = MathUtility.atan2(vector.y, vector.x);
        return radians;
    }

    static heading3D(vector: Vector3): [elevation: number, azimuth: number] {
        const elevation = MathUtility.atan2(vector.z, Math.sqrt(Math.pow(vector.x, 2.0) + Math.pow(vector.y, 2.0)));
        const azimuth = MathUtility.atan2(vector.y, vector.x);
        return [elevation, azimuth];
    }

    private static convertVector<T extends Vector>(length: number, values: Float32Array): T{
        const vectorProcessor: { [key: number]: (values: Float32Array) => Vector } = {
            2: (values) => new Vector2(values[0], values[1]),
            3: (values) => new Vector3(values[0], values[1], values[2]),
            4: (values) => new Vector4(values[0], values[1], values[2], values[3]),
        };

        if(length in vectorProcessor){
            const processor = vectorProcessor[length];
            return processor(values) as T;
        }else{
            throw new Error('Cannot Convert Vector!!');
        }
    }
}