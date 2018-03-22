import { Observable } from "rxjs/Observable";
import { DateValuePoint } from "../model/DateValuePoint";
import { ArrayUtil } from "../util/ArrayUtil";
import { ICompressionStrategy } from "./ICompressionStrategy";

export class LinearSamplingStrategy implements ICompressionStrategy {

/**
 * @param points  Gibt die gewünschte Anzahl von Punkten nach der Komprimierung an. Die Samplingrate wird anhand der Eingabe automatisch bestimmt, so dass die gewünschte Anzahl an Punkten übrigbleibt.
 * @param samplingRate  Hier kann die Samplingrate manuell festgelegt werden. Dieser Wert hat nur Wirkung wenn resultPoints 0 ist.
 */

    constructor(private points: number, private samplingRate: number) {}

    public compressGeneric(data: any[]): any[] {
        const result: any = [];
        if (this.points !== 0) {
            this.samplingRate = data.length / this.points;
            this.samplingRate = Math.round(this.samplingRate);
        }

        let samplePoint: number = 0;
        while (samplePoint < data.length && result.length < this.points) {
            result.push(data[samplePoint]);
            samplePoint += this.samplingRate;
        }

        return result;
    }

    public compress(raw: number[]): number[]{
        return this.compressGeneric(raw);
    }

    public compressWithDate(raw: DateValuePoint[]): DateValuePoint[] {
        return this.compressGeneric(raw);
    }

    public compressObservable(data: Observable<any>): Observable<any> {
            return data.bufferCount(this.samplingRate).map((arr) => arr[arr.length - 1]);
}

public compressStreamWithDate(raw: Observable<DateValuePoint>): Observable<DateValuePoint> {
    return this.compressObservable(raw);
}
public compressStream(raw: Observable<number>): Observable<number> {
    return this.compressObservable(raw);
}
}
