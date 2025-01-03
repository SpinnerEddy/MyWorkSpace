export class MathUtility{
    static degreesToRadians(degrees: number): number {
        return (Math.PI / 180.0) * degrees;
    }

    static radiansToDegrees(radians: number): number {
        return radians * (180.0 / Math.PI);
    }

    static clamp(inputValue: number, minValue: number, maxValue: number): number {
        return Math.max(Math.min(inputValue, maxValue), minValue);
    }

    static saturate(inputValue: number): number {
        return Math.max(Math.min(inputValue, 1), 0);
    }

}