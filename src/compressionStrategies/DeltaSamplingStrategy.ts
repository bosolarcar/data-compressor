import * as Rx from "rxjs/Rx";
import {log} from "../util/Logger";
import {Math} from "../util/Math";
import { DataValuePoint } from "../model/DateValuePoint";

export class DeltaSamplingStrategy {

    public compress(data: number[], delta: number): number[] {
        log.debug("starting delta sampling");
        log.debug("Data length: " + data.length);
        log.debug("minimum delta: " + delta);

        const output: number[] = [data[0]];

        let num: number;
        for (num = 1; num <= data.length; num++) {
            const previous: number = data[num - 1];
            const element: number = data[num];
            if (Math.absoluteDelta(element, previous) > delta){
                output.push(element);
            }

    }
        return output;
}

public compressWithDate(data: DataValuePoint[], delta: number): DataValuePoint[] {
    log.debug("starting delta sampling");
    log.debug("Data length: " + data.length);
    log.debug("minimum delta: " + delta);

    const output: DataValuePoint[] = [data[0]];

    let num: number;
    for (num = 1; num <= data.length; num++) {
        const previous: DataValuePoint = data[num - 1];
        const element: DataValuePoint = data[num];
        if (Math.absoluteDelta(element.value, previous.value) > delta) {
            output.push(element);
        }

}
    return output;
}

    public compressObservable(data: Rx.Observable<number>, delta: number): Rx.Observable<number> {
        log.debug("starting delta sampling");
        log.debug("minimum delta: " + delta);

        return data.distinctUntilChanged((x: number, y: number) => Math.absoluteDelta(x, y) < delta);
    }

    public compressObservableWithDate(data: Rx.Observable<DataValuePoint>, delta: number): Rx.Observable<DataValuePoint> {
        log.debug("starting delta sampling");
        log.debug("minimum delta: " + delta);

        return data.distinctUntilChanged((x: DataValuePoint, y: DataValuePoint) => Math.absoluteDelta(x.value, y.value) < delta);
    }

}
