import * as Rx from "rxjs/Rx";
import {log} from "../util/Logger";
import { ArrayUtil } from "../util/ArrayUtil";

export class LevelCompression {

//public compress(data: Rx.Observable<number>, factor: number): Rx.Observable<Rx.Observable<number>> {
public compress(data: Rx.Observable<number>, factor: number): void {
    //TODO make dynamical
    let bin1: number[] = [];
    let bin2: number[] = [];

    let subscription : Rx.Subscription = data.subscribe((value) => {
        bin1.push(value);
        log.debug("pushed " + value + " to bin1");
        //TODO check recursively
        if (bin1.length === factor) {
            let avg: number = ArrayUtil.arrayStats(bin1, {avg: true, min: false, max: false, evenArray: false}).avg;
            bin2.push(avg);
            bin1 = [];
            log.debug("emptied bin1");
            log.debug("pushed " + avg + " to bin2");
        }
    });

    //TODO return observables backed by bins
   //let  subject: Rx.Subject = new Rx.BehaviorSubject<Rx.Observable>();

}

}
