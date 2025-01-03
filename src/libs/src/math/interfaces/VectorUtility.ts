import { Vector } from "../vector/Vector";
import { Vector2 } from "../vector/Vector2";
import { Vector3 } from "../vector/Vector3";

export interface VectorUtility{
    min<T extends Vector>(a : T, b: T) : T;
    max<T extends Vector>(a : T, b: T) : T;
    add<T extends Vector>(a: T, b: T) : T;
    sub<T extends Vector>(a: T, b: T) : T;
    calcDistance<T extends Vector>(a: T, b: T) : number;
    calcAngle<T extends Vector>(a: T, b: T) : number;
    dot<T extends Vector>(a: T, b: T) : number;
    multiply<T extends Vector>(a: T, b: number) : T;
    divide<T extends Vector>(a: T, b: number) : T;
    limit<T extends Vector>(a: T, b : number) : T;
    setLength<T extends Vector>(a: T, b: number) : T;
    normalize<T extends Vector>(vector: T) : T;
    length<T extends Vector>(vector: T) : number;
    lerp<T extends Vector>(min : T, max: T, t: number) : T;
    cross(a: Vector3, b: Vector3) : Vector3;
    heading2D(vector: Vector2) : number;
    heading3D(vector: Vector3) : [elevation: number, azimuth: number];
}