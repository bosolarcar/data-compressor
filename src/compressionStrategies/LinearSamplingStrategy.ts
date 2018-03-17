import * as Rx from "rxjs/Rx";
import { ArrayUtil } from "../util/ArrayUtil";
import { LinearSamplingOptions } from "./options/LinearSamplingOptions";

export class LinearSamplingStrategy {

    public compress(data: any[], points: number, opt: LinearSamplingOptions): any[] {
        const result: number[] = [];

        if (opt.evenArray) {
            ArrayUtil.evenChunks(data, points);
        }

        let samplingRate: number = data.length / points;
        samplingRate = Math.round(samplingRate);

        let samplePoint: number = 0;
        while (samplePoint < data.length && result.length < points) {
            result.push(data[samplePoint]);
            samplePoint += samplingRate;
        }

        return result;
    }

    public compressObservable(data: Rx.Observable<any>, samplingRate: number): Rx.Observable<any> {
            return data.bufferCount(samplingRate).map((arr) => arr[arr.length - 1]);
}
}
