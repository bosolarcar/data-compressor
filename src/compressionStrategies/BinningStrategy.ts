import { AggregateDataPoint } from "../model/AggregateDataPoint";
import { DateValuePoint } from "../model/DateValuePoint";
import {ArrayUtil} from "../util/ArrayUtil";
import {log} from "../util/Logger";
import { ICompressionStrategy } from "./ICompressionStrategy";
import { Observable } from "rxjs/Observable";

export class BinningStrategy implements ICompressionStrategy {

    constructor(private points: number) {}

    public compress(data: number[]): number[] {
        log.debug("starting data binning");
        log.debug("Data length: " + data.length);
        log.debug("requested points: " + this.points);

        const output: number[] = [];

        let segmentWidth: number = data.length / this.points;
        segmentWidth = Math.trunc(segmentWidth);

        log.debug("Splitting data into bins");
        const bins: any[] = ArrayUtil.chunkArray(data, segmentWidth);

        while (bins.length > this.points) {
            bins.pop();
        }

        log.debug("Calculating average for bins");
        bins.forEach((bin) => {
            output.push(ArrayUtil.average(bin));
        });

        return output;
    }

     public compressWithDate(data: DateValuePoint[]): DateValuePoint[] {
        log.debug("starting data binning");
        log.debug("Data length: " + data.length);
        log.debug("requested points: " + this.points);

        const output: DateValuePoint[] = [];

        let segmentWidth: number = data.length / this.points;
        segmentWidth = Math.trunc(segmentWidth);

        log.debug("Splitting data into bins");
        const bins: any[] = ArrayUtil.chunkArray(data, segmentWidth);

        while (bins.length > this.points) {
            bins.pop();
        }

        log.debug("Calculating average for bins");
        bins.forEach((bin) => {
            output.push(ArrayUtil.averageDateValuePoint(bin));
        });
        return output;
    }

    public compressStreamWithDate(raw: Observable<DateValuePoint>): Observable<DateValuePoint> {
        throw new Error("Method not implemented.");
    }
    public compressStream(raw: Observable<number>): Observable<number> {
        throw new Error("Method not implemented.");
    }
}
