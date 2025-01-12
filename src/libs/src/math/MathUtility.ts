export class MathUtility{
    static EPSILON = 1e-6;

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

    static sin(angle: number): number{
        const value = Math.sin(angle);
        return MathUtility.roundToZero(value);
    }

    static cos(angle: number): number{
        const value = Math.cos(angle);
        return MathUtility.roundToZero(value);
    }

    static tan(angle: number): number{
        const value = Math.tan(angle);
        return MathUtility.roundToZero(value);
    }

    private static roundToZero(inputValue: number){
        return Math.abs(inputValue) < MathUtility.EPSILON ? 0 : inputValue;
    }
}