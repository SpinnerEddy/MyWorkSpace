export interface NumericUtility{
    clamp(inputValue : number, minValue : number, maxValue : number): number;
    saturate(inputValue : number): number;
}