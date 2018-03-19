import { AggregateDataPoint } from "../model/AggregateDataPoint";
import {ArrayUtil} from "../util/ArrayUtil";
import {log} from "../util/Logger";
import { BinningOptions } from "./options/BinningOptions";
import { DateValuePoint } from "../model/DateValuePoint";

export class BinningStrategy {

    public compress(data: number[], points: number, opt: BinningOptions): number[] {
        log.debug("starting data binning");
        log.debug("Data length: " + data.length);
        log.debug("requested points: " + points);

        const output: number[] = [];

        if (opt.evenArray) {
            log.debug("Evening bins of input data");
            ArrayUtil.evenChunks(data, points);
        }

        let segmentWidth: number = data.length / points;
        segmentWidth = Math.trunc(segmentWidth);

        log.debug("Splitting data into bins");
        const bins: any[] = ArrayUtil.chunkArray(data, segmentWidth);

        while (bins.length > points) {
            bins.pop();
        }

        log.debug("Calculating average for bins");
        bins.forEach((bin) => {
            output.push(ArrayUtil.average(bin));
        });

        return output;
    }

    //TODO add option to define bin size
    //TODO add binning by timeintervall
     public compressWithDate(data: DateValuePoint[], points: number, opt: BinningOptions): DateValuePoint[] {
        log.debug("starting data binning");
        log.debug("Data length: " + data.length);
        log.debug("requested points: " + points);

        const output: DateValuePoint[] = [];

        if (opt.evenArray) {
            log.debug("Evening bins of input data");
            ArrayUtil.evenChunks(data, points);
        }

        let segmentWidth: number = data.length / points;
        segmentWidth = Math.trunc(segmentWidth);

        log.debug("Splitting data into bins");
        const bins: any[] = ArrayUtil.chunkArray(data, segmentWidth);

        while (bins.length > points) {
            bins.pop();
        }

        log.debug("Calculating average for bins");
        bins.forEach((bin) => {
            output.push(ArrayUtil.averageDateValuePoint(bin));
        });
        return output;
    }
}
