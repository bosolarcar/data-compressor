import * as Rx from "rxjs/Rx";
import {log} from "../util/Logger";
import {Math} from "../util/Math";

export class DeltaSamplingStrategy {

    public compress(data: number[], delta: number): number[] {
        log.debug("starting segmentation sampling");
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

    public compressObservable(data: Rx.Observable<number>, delta: number): Rx.Observable<number> {
        log.debug("starting segmentation sampling");
        log.debug("minimum delta: " + delta);

        return data.distinctUntilChanged((x: number, y: number) => Math.absoluteDelta(x, y) < delta);
    }

}
