import { Matrix } from "../matrix/Matrix";
import { Quaternion } from "../quaternion/Quaternion";
import { QuaternionHandler } from "../QuaternionHandler";
import { Vector } from "./Vector";

export class Vector3 extends Vector{
    constructor(x: number, y: number, z: number){
        super(new Float32Array([x, y, z]));
    }

    get x(){
        return this.components[0];
    }

    get y(){
        return this.components[1];
    }

    get z(){
        return this.components[2];
    }

    toQuaternion(): Quaternion{
        return QuaternionHandler.create(this.x, this.y, this.z, 0);
    }

    override toMatrix(): Matrix {
        const matrix = new Matrix(3, 1);
        matrix.set(0, 0, this.x);
        matrix.set(1, 0, this.y);
        matrix.set(2, 0, this.z);
        return matrix;
    }
}