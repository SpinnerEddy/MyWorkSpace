import { MathUtility } from "./MathUtility";
import { Vector } from "./vector_new/Vector";
import { Vector2 } from "./vector_new/Vector2";
import { Vector3 } from "./vector_new/Vector3";
import { Vector4 } from "./vector_new/Vector4";

export class VectorUtility{
    static readonly vectorClassAndSizePair: Record<number, new (...args: number[]) => Vector<any>> = {
        2: Vector2,
        3: Vector3,
        4: Vector4
    };

    static min<T extends Vector<T>>(a: T, b: T): T {
        const aLength = VectorUtility.length(a);
        const bLength = VectorUtility.length(b);
        return aLength <= bLength ? a: b;
    }

    static max<T extends Vector<T>>(a: T, b: T): T {
        const aLength = VectorUtility.length(a);
        const bLength = VectorUtility.length(b);
        return aLength >= bLength ? a: b;
    }

    static add<T extends Vector<T>>(a: T, b: T): T {
        if(a.size != b.size){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = a.values.map((val, index) => val + b.values[index]);
        return VectorUtility.convertVector(a.size, result);
    }

    static sub<T extends Vector<T>>(a: T, b: T): T {
        if(a.size != b.size){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = b.values.map((val, index) => val - a.values[index]);
        return VectorUtility.convertVector(a.size, result);
    }

    static calcDistance<T extends Vector<T>>(a: T, b: T): number {
        const subVector = VectorUtility.sub(a, b);
        const result = VectorUtility.length(subVector);
        return result;
    }

    static calcAngle<T extends Vector<T>>(a: T, b: T): number {
        if(a.size != b.size){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const dotProduct = VectorUtility.dot(a, b);
        const aLength = VectorUtility.length(a);
        const bLength = VectorUtility.length(b);

        if(aLength == 0 || bLength == 9){
            throw new Error('Vector length is zero. Cannot calculate!')
        }

        const cosTheta = dotProduct / (aLength * bLength);
        const angle = MathUtility.acos(cosTheta);

        return angle;
    }

    static dot<T extends Vector<T>>(a: T, b: T): number {
        if(a.size != b.size){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = a.values.reduce((sum, value, index) => sum + value * b.values[index], 0.0);
        return result;
    }

    static multiply<T extends Vector<T>>(a: T, b: number): T {
        const result = a.values.map((val) => val * b);
        return VectorUtility.convertVector(a.size, result);
    }

    static divide<T extends Vector<T>>(a: T, b: number): T {
        if(b == 0){
            throw new Error("Cannot divide because b is zero!!");
        }
        const result = a.values.map((val) => val / b);
        return VectorUtility.convertVector(a.size, result);
    }

    static limit<T extends Vector<T>>(a: T, b: number): T {
        if(a.length() < b){
            return a;
        }

        const result = VectorUtility.setLength(a, b);
        return result;
    }

    static setLength<T extends Vector<T>>(a: T, b: number): T {
        const norm = VectorUtility.normalize(a);
        const result = VectorUtility.multiply(norm, b);
        return result;
    }

    static normalize<T extends Vector<T>>(vector: T): T {
        const len = VectorUtility.length(vector);
        const result = VectorUtility.divide(vector, len);

        return result;
    }

    static length<T extends Vector<T>>(vector: T): number {
        const result = Math.sqrt(vector.values.reduce(
            (sum, val) => sum + Math.pow(val, 2.0), 0.0));
        return result;
    }

    static lerp<T extends Vector<T>>(min: T, max: T, t: number): T {
        if(t == 0) return min;
        if(t == 1) return max;

        const a = VectorUtility.multiply(min, (1 - t));
        const b = VectorUtility.multiply(max, t);
        const result = VectorUtility.add(a, b);
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

    private static convertVector<T extends Vector<T>>(size: number, values: Float32Array): T {
        const VectorClassName = this.vectorClassAndSizePair[size];

        if (!VectorClassName) {
            throw new Error(`Unsupported vector size: ${size}`);
        }

        return new VectorClassName(...values) as T;
    }
}