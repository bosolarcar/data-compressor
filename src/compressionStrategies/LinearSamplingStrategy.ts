import * as Rx from "rxjs/Rx";
import { DateValuePoint } from "../model/DateValuePoint";
import { ArrayUtil } from "../util/ArrayUtil";
import { ICompressionStrategy } from "./ICompressionStrategy";

export class LinearSamplingStrategy implements ICompressionStrategy {

    constructor(private points: number) {}

    public compressGeneric(data: any[]): any[] {
        const result: any = [];
        let samplingRate: number = data.length / this.points;
        samplingRate = Math.round(samplingRate);

        let samplePoint: number = 0;
        while (samplePoint < data.length && result.length < this.points) {
            result.push(data[samplePoint]);
            samplePoint += samplingRate;
        }

        return result;
    }

    public compress(raw: number[]): number[]{
        return this.compressGeneric(raw);
    }

    public compressWithDate(raw: DateValuePoint[]): DateValuePoint[] {
        return this.compressGeneric(raw);
    }

    public compressObservable(data: Rx.Observable<any>, samplingRate: number): Rx.Observable<any> {
            return data.bufferCount(samplingRate).map((arr) => arr[arr.length - 1]);
}
}
