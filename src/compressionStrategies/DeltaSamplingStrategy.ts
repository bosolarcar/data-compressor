import * as Rx from "rxjs/Rx";
import { DateValuePoint } from "../model/DateValuePoint";
import {log} from "../util/Logger";
import {Math} from "../util/Math";
import { ICompressionStrategy } from "./ICompressionStrategy";

export class DeltaSamplingStrategy implements ICompressionStrategy {

/**
 * @param delta Gibt die Größe des Deltas an. Alle Punkte, die um mehr als diesen Wert von ihren Vorgängern abweichen werden übernommen.
 */

    constructor(private delta: number) {}

    public compress(data: number[]): number[] {
        log.debug("starting delta sampling");
        log.debug("Data length: " + data.length);
        log.debug("minimum delta: " + this.delta);

        const output: number[] = [data[0]];

        let num: number;
        for (num = 1; num < data.length; num++) {
            const previous: number = data[num - 1];
            const element: number = data[num];
            if (Math.absoluteDelta(element, previous) > this.delta){
                output.push(element);
            }

    }
        return output;
}

public compressWithDate(data: DateValuePoint[]): DateValuePoint[] {
    log.debug("starting delta sampling");
    log.debug("Data length: " + data.length);
    log.debug("minimum delta: " + this.delta);

    const output: DateValuePoint[] = [data[0]];

    let num: number;
    for (num = 1; num < data.length; num++) {
        const previous: DateValuePoint = data[num - 1];
        const element: DateValuePoint = data[num];
        if (Math.absoluteDelta(element.value, previous.value) > this.delta) {
            output.push(element);
        }

}
    return output;
}

    public compressStream(data: Rx.Observable<number>): Rx.Observable<number> {
        log.debug("starting delta sampling");
        log.debug("minimum delta: " + this.delta);

        return data.distinctUntilChanged((x: number, y: number) => Math.absoluteDelta(x, y) < this.delta);
    }

    public compressStreamWithDate(data: Rx.Observable<DateValuePoint>): Rx.Observable<DateValuePoint> {
        log.debug("starting delta sampling");
        log.debug("minimum delta: " + this.delta);

        return data.distinctUntilChanged((x: DateValuePoint, y: DateValuePoint) => Math.absoluteDelta(x.value, y.value) < this.delta);
    }

}
