interface NumetricUtility{
    clamp(inputValue : number, minValue : number, maxValue : number): number;
    saturate(inputValue : number): number;
}