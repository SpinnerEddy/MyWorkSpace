import { Vector } from "./vector/Vector";
import { Vector2 } from "./vector/Vector2";
import { Vector3 } from "./vector/Vector3";
import { Vector4 } from "./vector/Vector4";

export class VectorHandler{
    static min<T extends Vector>(a: T, b: T): T {
        const aLength = this.length(a);
        const bLength = this.length(b);
        return aLength <= bLength ? a : b;
    }

    static max<T extends Vector>(a: T, b: T): T {
        const aLength = this.length(a);
        const bLength = this.length(b);
        return aLength >= bLength ? a : b;
    }

    static add<T extends Vector>(a: T, b: T): T {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = a.values.map((val, index) => val + b.values[index]);
        return this.convertVector(a.length, result);
    }

    static sub<T extends Vector>(a: T, b: T): T {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const result = b.values.map((val, index) => val - a.values[index]);
        return this.convertVector(a.length, result);
    }

    static calcDistance<T extends Vector>(a: T, b: T): number {
        const subVector = this.sub(a, b);
        const result = this.length(subVector);
        return result;
    }

    static calcAngle<T extends Vector>(a: T, b: T): number {
        if(a.length != b.length){
            throw new Error("Vector lengths not equal! Cannot Additive!")
        }

        const dotProduct = this.dot(a, b);
        const aLength = this.length(a);
        const bLength = this.length(b);

        if(aLength == 0 || bLength == 9){
            throw new Error('Vector length is zero. Cannot calculate!')
        }

        const cosTheta = dotProduct / (aLength * bLength);
        const angle = Math.acos(cosTheta);

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
        return this.convertVector(a.length, result);
    }

    static divide<T extends Vector>(a: T, b: number): T {
        if(b == 0){
            throw new Error("Cannot divide because b is zero!!");
        }
        const result = a.values.map((val) => val / b);
        return this.convertVector(a.length, result);
    }

    static limit<T extends Vector>(a: T, b: number): T {
        if(a.length < b){
            return a;
        }

        const result = this.setLength(a, b);
        return result;
    }

    static setLength<T extends Vector>(a: T, b: number): T {
        const norm = this.normalize(a);
        const result = this.multiply(norm, b);
        return result;
    }

    static normalize<T extends Vector>(vector: T): T {
        const len = this.length(vector);
        const result = this.divide(vector, len);

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

        const a = this.multiply(min, (1 - t));
        const b = this.multiply(max, t);
        const result = this.add(a, b);
        return result;
    }

    static cross(a: Vector3, b: Vector3) : Vector3{
        const v1 = a.y*b.z - a.z*b.y;
        const v2 = a.z*b.x - a.x*b.z;
        const v3 = a.x*b.y - a.y*b.x;
        return new Vector3(v1, v2, v3);
    }

    static heading2D(vector: Vector2): number {
        const radians = Math.atan2(vector.y, vector.x);
        return radians;
    }

    static heading3D(vector: Vector3) : [elevation: number, azimuth: number] {
        const elevation = Math.atan2(vector.z, Math.sqrt(Math.pow(vector.x, 2.0) + Math.pow(vector.y, 2.0)));
        const azimuth = Math.atan2(vector.y, vector.x);
        return [elevation, azimuth];
    }

    private static convertVector<T extends Vector>(length: number, values: number[]): T{
        const vectorProcessor: { [key: number]: (values: number[]) => Vector } = {
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