export class MathUtility{

    public static clamp(inputValue : number, minValue : number, maxValue : number)
    {
        return Math.max(Math.min(inputValue, maxValue), minValue);
    }
}