import { Matrix } from "../matrix/Matrix";
import { MatrixHandler } from "../MatrixHandler";
import { QuaternionHandler } from "../QuaternionHandler";
import { DefaultVectorConstants } from "../vector/VectorConstants";

export class Quaternion{
    private components: Float32Array;

    constructor(x: number, y: number, z: number, w: number){
        this.components = new Float32Array([x, y, z, w]);
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

    get w(){
        return this.components[3];
    }

    toMatrix(): Matrix{
        const matrix = MatrixHandler.identity(4);

        const x = QuaternionHandler.rotateVector(this, DefaultVectorConstants.AXIS2DX);
        const y = QuaternionHandler.rotateVector(this, DefaultVectorConstants.AXIS2DY);
        const z = QuaternionHandler.rotateVector(this, DefaultVectorConstants.AXIS2DZ);
        matrix.set(0, 0, x.x);
        matrix.set(0, 1, x.y);
        matrix.set(0, 2, x.z);
        matrix.set(0, 0, y.x);
        matrix.set(0, 1, y.y);
        matrix.set(0, 2, y.z);
        matrix.set(0, 0, z.x);
        matrix.set(0, 1, z.y);
        matrix.set(0, 2, z.z);

        return matrix;
    }

    toEuler(): {pitch: number, yaw: number, roll: number}{
        const matrix = this.toMatrix();
        const pitch = Math.atan2(matrix.get(0, 2), matrix.get(2, 2));
        const yaw = Math.asin(-matrix.get(2, 0));
        const roll = Math.atan2(matrix.get(2, 1), matrix.get(2, 2));

        return {pitch, yaw, roll};
    }
}