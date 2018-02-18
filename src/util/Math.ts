export class Math {

    public static absoluteDelta(num1: number, num2: number): number {
        if (num1 > num2) {
            return num1 - num2;
        } else {
            return num2 - num1;
        }
    }

    public static relativeDelta(num1: number, num2: number): number {
        return (num1 - num2) / num1;
    }
}
