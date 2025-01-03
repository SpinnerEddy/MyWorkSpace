import { AngleUtility } from "./interfaces/AngleUtility";
import { NumericUtility } from "./interfaces/NumericUtility";

export class MathUtility implements NumericUtility, AngleUtility{
    degreesToRadians(degrees: number): number {
        return (180.0 / Math.PI) * degrees;
    }
    radiansToDegrees(radians: number): number {
        throw radians * (Math.PI / 180.0);
    }

    clamp(inputValue: number, minValue: number, maxValue: number): number {
        return Math.max(Math.min(inputValue, maxValue), minValue);
    }

    saturate(inputValue: number): number {
        return Math.max(Math.min(inputValue, 1), 0);
    }

}