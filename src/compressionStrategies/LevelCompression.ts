import * as Rx from "rxjs/Rx";
import {log} from "../util/Logger";
import { ArrayUtil } from "../util/ArrayUtil";

export class LevelCompression {

//public compress(data: Rx.Observable<number>, factor: number): Rx.Observable<Rx.Observable<number>> {
public compress(data: Rx.Observable<number>, factor: number): void {
    let bins: number[][] = [];
    let binNumber: number = 0;
    bins[0] = [];
    log.debug("initialized bin: 0");

    let subscription : Rx.Subscription = data.subscribe((value) => {

        let currentBin: number = 0;

        bins[currentBin].push(value);
        log.debug("pushed " + value + " to bin: " + currentBin);

        while (bins[currentBin].length === factor) {
            let avg: number = ArrayUtil.arrayStats(bins[currentBin], {avg: true, min: false, max: false, evenArray: false}).avg;
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
