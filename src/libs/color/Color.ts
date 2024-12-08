import { MathUtility } from "../math/MathUtility";
import { Color255 } from "./Color255";

export class Color{
    private r : number;
    private g : number;
    private b : number;
    private a : number;

    constructor(r : number, g : number, b : number, a : number = 1.0)
    {
        this.r = MathUtility.clamp(r, 0.0, 1.0);
        this.g = MathUtility.clamp(g, 0.0, 1.0);
        this.b = MathUtility.clamp(b, 0.0, 1.0);
        this.a = MathUtility.clamp(a, 0.0, 1.0);
    }

    get red() : number
    {
        return this.r;
    }

    get green() : number
    {
        return this.g;
    }

    get blue() : number
    {
        return this.b;
    }

    get alpha() : number
    {
        return this.a;
    }

    public translateTo255() : Color255
    {
        const r = Math.ceil(this.r * 255.0);
        const g = Math.ceil(this.g * 255.0);
        const b = Math.ceil(this.b * 255.0);
        const a = Math.ceil(this.a * 255.0);

        return new Color255(r, g, b, a);
    }
}