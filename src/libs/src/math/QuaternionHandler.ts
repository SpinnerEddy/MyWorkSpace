import { MathUtility } from "./MathUtility";
import { Quaternion } from "./quaternion/Quaternion";
import { Vector3 } from "./vector/Vector3";
import { Vector4 } from "./vector/Vector4";
import { VectorHandler } from "./VectorHandler";

export class QuaternionHandler{
    static create(x: number, y: number, z: number, w: number): Quaternion{
        return new Quaternion(x, y, z, w);
    }

    static createFromEuler(roll: number, pitch: number, yaw: number){
        const h = QuaternionHandler.create(0, -MathUtility.sin(pitch * 0.5), 0, MathUtility.cos(pitch * 0.5));
        const p = QuaternionHandler.create(-MathUtility.sin(roll * 0.5), 0, 0, MathUtility.cos(roll * 0.5));
        const b = QuaternionHandler.create(0, 0, -MathUtility.sin(yaw * 0.5), MathUtility.cos(yaw * 0.5));

        const hp = QuaternionHandler.multiply(h, p);
        const hpb = QuaternionHandler.multiply(hp, b);
        return hpb;
    }

    static createFromAxisAndRadians(axis: Vector3, radians: number){
        const normalizeAxis = VectorHandler.normalize(axis);
        const h = radians * 0.5;
        const s = MathUtility.sin(h);

        return QuaternionHandler.create(normalizeAxis.x * s, normalizeAxis.y * s, normalizeAxis.z * s, MathUtility.cos(h));
    }

    static identity(): Quaternion{
        return new Quaternion(0, 0, 0, 1);
    }

    static add(a: Quaternion, b: Quaternion): Quaternion{
        const x = a.x + b.x;
        const y = a.y + b.y;
        const z = a.z + b.z;
        const w = a.w + b.w;

        return QuaternionHandler.create(x, y, z, w);
    }

    static sub(a: Quaternion, b: Quaternion): Quaternion{
        const x = a.x - b.x;
        const y = a.y - b.y;
        const z = a.z - b.z;
        const w = a.w - b.w;

        return QuaternionHandler.create(x, y, z, w);
    }

    static multiply(a: Quaternion, b: Quaternion): Quaternion{
        const w = a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z;
        const x = a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y;
        const y = a.w*b.y + a.y*b.w + a.z*b.x - a.x*b.z;
        const z = a.w*b.z + a.z*b.w + a.x*b.y - a.y*b.x;

        return QuaternionHandler.create(x, y, z, w);
    }

    static scale(a: Quaternion, s: number): Quaternion{
        const x = a.x * s;
        const y = a.y * s;
        const z = a.z * s;
        const w = a.w * s;

        return QuaternionHandler.create(x, y, z, w);
    }

    static dot(a: Quaternion, b: Quaternion): number{
        return a.x*b.x + a.y*b.y + a.z*b.z + a.w*b.w;
    }

    static conjugate(q: Quaternion): Quaternion{
        return QuaternionHandler.create(-q.x, -q.y, -q.z, q.w);
    }

    static normalize(q: Quaternion): Quaternion{
        const length = Math.sqrt(q.x*q.x + q.y*q.y + q.z*q.z + q.w*q.w);
        if(length == 0){
            throw new Error("Zero length quaternion. Cannot normalize!!")
        }

        const invLength = 1 / length;

        return QuaternionHandler.scale(q, invLength);
    }

    static inverse(q: Quaternion): Quaternion{
        const lengthSquared = q.x*q.x + q.y*q.y + q.z*q.z + q.w*q.w;
        if(lengthSquared == 0){
            throw new Error("Zero length quaternion. Cannot inverse!!")
        }

        const invLengthSquared = 1 / lengthSquared;
        const conjugate = QuaternionHandler.conjugate(q);
        return QuaternionHandler.scale(conjugate, invLengthSquared);
    }

    static rotateVector(q: Quaternion, v: Vector3): Vector3
    static rotateVector(q: Quaternion, v: Vector4): Vector3
    static rotateVector(q: Quaternion, v: Vector3 | Vector4): Vector3{
        const qVec = QuaternionHandler.toQuaternion(v);
        const inverse = QuaternionHandler.inverse(q);

        const temp = QuaternionHandler.multiply(q, qVec);
        const result = QuaternionHandler.multiply(temp, inverse);

        return new Vector3(result.x, result.y, result.z);
    }

    static slerp(a: Quaternion, b: Quaternion, t: number): Quaternion{
        const dot = QuaternionHandler.dot(a, b);
        if(dot < 0.0){
            return a;
        }

        const theta = Math.acos(dot);
        const q1 = QuaternionHandler.scale(a, MathUtility.sin(theta * (1 - t)) / MathUtility.sin(theta));
        const q2 = QuaternionHandler.scale(b, MathUtility.sin(theta * t) / MathUtility.sin(theta));
        return QuaternionHandler.add(q1, q2);
    }

    private static toQuaternion(vector: Vector3): Quaternion
    private static toQuaternion(vector: Vector4): Quaternion
    private static toQuaternion(vector: Vector3 | Vector4): Quaternion{
        return QuaternionHandler.create(vector.x, vector.y, vector.z, 0);
    }
}