import { BinningOptions } from "../compressionStrategies/options/BinningOptions";

export class ArrayUtil {

    public static evenChunks(data: number[], points: number) {
        let rest: number = data.length % points;
        while (rest !== 0) {
            if (rest % 2 === 0) {
                data.shift();
            } else {
                data.pop();
            }
            rest--;
        }
    }

    public static chunkArray(array: any[], chunkSize: number): any[] {
        const result: any[] = [];
        while (array.length) {
            result.push(array.splice(0, chunkSize));
        }
        return result;
    }

    public static arrayStats(array: number[], opt: BinningOptions): {min?: number, max?: number, avg?: number} {
        let min: number = array[0];
        let max: number = array[0];
        let avg: number;

        let sum = 0;
        array.forEach((element) => {
            if (opt.avg) {
                sum += element;
            }

            if (opt.min && element < min) {
                min = element;
            }

            if (opt.max && element > max) {
                max = element;
            }
        });
        avg = sum / array.length;
        return {min, max, avg};
    }

}
