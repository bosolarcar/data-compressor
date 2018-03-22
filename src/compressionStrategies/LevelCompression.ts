import * as Rx from "rxjs/Rx";
import {log} from "../util/Logger";
import { ArrayUtil } from "../util/ArrayUtil";
import { DateValuePoint } from "../model/DateValuePoint";

export class LevelCompression {

public compress(data: number[], factor: number): number[][] {

        const bins: number[][] = [];
        bins[0] = [];
        log.debug("initialized bin: 0");

        data.forEach((value) => {

            let currentBin: number = 0;

            bins[currentBin].push(value);
            log.debug("pushed " + value + " to bin: " + currentBin);

            while (bins[currentBin].length % factor === 0) {
                let avg: number = ArrayUtil.average(bins[currentBin].slice(bins[currentBin].length - factor, bins[currentBin].length));
                currentBin++;
                if (bins[currentBin] === undefined) {
                    bins[currentBin] = [];
                    log.debug("initialized bin: " + currentBin);
                }
                bins[currentBin].push(avg);
                log.debug("pushed " + avg + " to bin: " + currentBin);
            }
        });
        return bins;
}

public compressWithDate(data: DateValuePoint[], factor: number): DateValuePoint[][] {

    const bins: DateValuePoint[][] = [];
    bins[0] = [];
    log.debug("initialized bin: 0");

    data.forEach((value) => {

        let currentBin: number = 0;

        bins[currentBin].push(value);
        log.debug("pushed " + value + " to bin: " + currentBin);

        while (bins[currentBin].length % factor === 0) {
            let avg: DateValuePoint = ArrayUtil.averageDateValuePoint(bins[currentBin].slice(bins[currentBin].length - factor, bins[currentBin].length));
            currentBin++;
            if (bins[currentBin] === undefined) {
                bins[currentBin] = [];
                log.debug("initialized bin: " + currentBin);
            }
            bins[currentBin].push(avg);
            log.debug("pushed " + avg + " to bin: " + currentBin);
        }
    });
    return bins;
}

//public compress(data: Rx.Observable<number>, factor: number): Rx.Observable<Rx.Observable<number>> {
public compressStream(data: Rx.Observable<number>, factor: number): void {

    let output: Rx.ReplaySubject<number> = new Rx.ReplaySubject(10);


    let bins: number[][] = [];
    let binNumber: number = 0;
    bins[0] = [];
    log.debug("initialized bin: 0");

    let subscription : Rx.Subscription = data.subscribe((value) => {

        let currentBin: number = 0;

        bins[currentBin].push(value);
        log.debug("pushed " + value + " to bin: " + currentBin);

        while (bins[currentBin].length === factor) {
            let avg: number = ArrayUtil.average(bins[currentBin]);
            bins[currentBin] = [];
            log.debug("Emptied bin: " + currentBin + " and got avg: " + avg);
            currentBin++;
            if (bins[currentBin] === undefined) {
                bins[currentBin] = [];
                log.debug("initialized bin: " + currentBin);
            }
            bins[currentBin].push(avg);
            log.debug("pushed " + avg + " to bin: " + currentBin);
        }

    //TODO return observables backed by bins
   //let  subject: Rx.Subject = new Rx.BehaviorSubject<Rx.Observable>();

    });
}

}
