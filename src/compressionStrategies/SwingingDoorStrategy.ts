import { DateValuePoint } from "../model/DateValuePoint";
import { LinearFunction } from "../model/LinearFunction";
import { Point } from "../model/Point";
import {log} from "../util/Logger";
import { ICompressionStrategy } from "./ICompressionStrategy";
import { Observable } from "rxjs/Observable";

export class SwingingDoorStrategy implements ICompressionStrategy {

/**
 * @param maxDeviation  Gibt die gewünschte maximale Abweichung an. Diese wird genutzt um die Türen zu berechnen. Je größer sie gewählt wird, desto mehr Daten werden verworfen.
 */
    constructor(private maxDeviation: number) {}

    public compress(data: number[]): number[] {
        const output: number[] = [];
        let minDoor: LinearFunction;
        let maxDoor: LinearFunction;

        const reference: Point = new Point(0, data[0]);
        log.debug("new reference value: " + reference);
        output.push(reference.y);

        let snapshot: Point = new Point(1, data[1]);
        log.debug("New snapshot value: " + data[1]);

        minDoor = this.calculateMinDoor(snapshot, reference, this.maxDeviation, Number.MIN_SAFE_INTEGER);
        maxDoor = this.calculateMaxDoor(snapshot, reference, this.maxDeviation, Number.MAX_SAFE_INTEGER);

        let x: number;
        for (x = 2; x < data.length; x++) {
            log.debug("Processing value at position " + x);
            snapshot = new Point(x, data[x]);
            log.debug("New snapshot value: " + snapshot);

            const lowerY: number = minDoor.calculateY(x);
            const upperY: number = maxDoor.calculateY(x);

            if (!(snapshot.y >= lowerY && snapshot.y <= upperY)) {
                log.debug("value: " + snapshot.y + " not in swinging door: " + lowerY + " - " + upperY);
                output.push(data[x - 1]);
                log.debug("Pushed value: " + data[x - 1]);

                reference.x = x - 1;
                reference.y = data[x - 1];
                log.debug("new reference value: " + reference);

                minDoor = this.calculateMinDoor(snapshot, reference, this.maxDeviation, Number.MIN_SAFE_INTEGER);
                maxDoor = this.calculateMaxDoor(snapshot, reference, this.maxDeviation, Number.MAX_SAFE_INTEGER);

            } else {
                log.debug("value: " + snapshot.y + " in swinging door: " + lowerY + " - " + upperY);

                minDoor = this.calculateMinDoor(snapshot, reference, this.maxDeviation, lowerY);
                maxDoor = this.calculateMaxDoor(snapshot, reference, this.maxDeviation, upperY);

            }
           }

        return output;
    }

    public compressWithDate(data: DateValuePoint[]): DateValuePoint[] {
        const output: DateValuePoint[] = [];
        let minDoor: LinearFunction;
        let maxDoor: LinearFunction;

        let reference: DateValuePoint = data[0];
        let refPoint: Point = new Point(reference.date.getTime(), reference.value);
        log.debug("new reference point: " + refPoint);
        output.push(reference);

        let snapshot: DateValuePoint = data[1];
        let snapPoint: Point = new Point(snapshot.date.getTime(), snapshot.value);

        log.debug("New snapshot point: " + snapPoint);

        minDoor = this.calculateMinDoor(snapPoint, refPoint, this.maxDeviation, Number.MIN_SAFE_INTEGER);
        maxDoor = this.calculateMaxDoor(snapPoint, refPoint, this.maxDeviation, Number.MAX_SAFE_INTEGER);

        let i: number;
        for (i = 2; i < data.length; i++) {
            log.debug("Processing value at position " + i);
            snapshot = data[i];
            snapPoint = new Point(snapshot.date.getTime(), snapshot.value);
            log.debug("New snapshot value: " + snapPoint);

            const lowerY: number = minDoor.calculateY(snapPoint.x);
            const upperY: number = maxDoor.calculateY(snapPoint.x);

            if (!(snapshot.value >= lowerY && snapshot.value <= upperY)) {
                log.debug("value: " + snapshot.value + " not in swinging door: " + lowerY + " - " + upperY);
                reference = data[i - 1];
                refPoint = new Point(reference.date.getTime(), reference.value);
                output.push(reference);
                log.debug("Pushed value: " + reference);
                log.debug("new reference value: " + refPoint);

                minDoor = this.calculateMinDoor(snapPoint, refPoint, this.maxDeviation, Number.MIN_SAFE_INTEGER);
                maxDoor = this.calculateMaxDoor(snapPoint, refPoint, this.maxDeviation, Number.MAX_SAFE_INTEGER);

            } else {
                log.debug("value: " + snapshot.value + " in swinging door: " + lowerY + " - " + upperY);
                minDoor = this.calculateMinDoor(snapPoint, refPoint, this.maxDeviation, lowerY);
                maxDoor = this.calculateMaxDoor(snapPoint, refPoint, this.maxDeviation, upperY);
            }

           }

        return output;
    }

    public compressStreamWithDate(raw: Observable<DateValuePoint>): Observable<DateValuePoint> {
        throw new Error("Method not implemented.");
    }
    public compressStream(raw: Observable<number>): Observable<number> {
        throw new Error("Method not implemented.");
    }

    private calculateMinDoor(snapshot: Point, reference: Point, maxDeviation: number, previous: number): LinearFunction {
        let lowerBound: number = snapshot.y - maxDeviation;
        if (lowerBound < previous) {
            log.debug("lowerbound: " + lowerBound + " smaller than " + previous);
            lowerBound = previous;
        }
        const minDoor: LinearFunction = new LinearFunction(reference, new Point(snapshot.x, lowerBound));
        log.debug("calculated minimum door: " + minDoor);
        return minDoor;
    }

    private calculateMaxDoor(snapshot: Point, reference: Point, maxDeviation: number, previous: number): LinearFunction {
        let upperBound: number = snapshot.y + maxDeviation;
        if (upperBound > previous) {
            log.debug("upperBound: " + upperBound + " greater than " + previous);
            upperBound = previous;
        }
        const maxDoor: LinearFunction = new LinearFunction(reference, new Point(snapshot.x, upperBound));
        log.debug("calculated maximum door: " + maxDoor);
        return maxDoor;
    }
}
