import { DateValuePoint } from "../model/DateValuePoint";
import { LinearFunction } from "../model/LinearFunction";
import { Point } from "../model/Point";
import {log} from "../util/Logger";
import { SwingingDoorOptions } from "./options/SwingingDoorOptions";

export class SwingingDoorStrategy {

    public compress(data: number[], opt: SwingingDoorOptions): number[] {
        const output: number[] = [];
        let minDoor: LinearFunction;
        let maxDoor: LinearFunction;

        const reference: Point = new Point(0, data[0]);
        log.debug("new reference value: " + reference);
        output.push(reference.y);

        let snapshot: Point = new Point(1, data[1]);
        log.debug("New snapshot value: " + data[1]);

        minDoor = this.calculateMinDoor(snapshot, reference, opt.maxDeviation);
        maxDoor = this.calculateMaxDoor(snapshot, reference, opt.maxDeviation);

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

            } else {
                log.debug("value: " + snapshot.y + " in swinging door: " + lowerY + " - " + upperY);

            }
            minDoor = this.calculateMinDoor(snapshot, reference, opt.maxDeviation);
            maxDoor = this.calculateMaxDoor(snapshot, reference, opt.maxDeviation);
           }

        return output;
    }

    public compressWithDate(data: DateValuePoint[], opt: SwingingDoorOptions): DateValuePoint[] {
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

        minDoor = this.calculateMinDoor(snapPoint, refPoint, opt.maxDeviation);
        maxDoor = this.calculateMaxDoor(snapPoint, refPoint, opt.maxDeviation);

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

            } else {
                log.debug("value: " + snapshot.value + " in swinging door: " + lowerY + " - " + upperY);

            }
            minDoor = this.calculateMinDoor(snapPoint, refPoint, opt.maxDeviation);
            maxDoor = this.calculateMaxDoor(snapPoint, refPoint, opt.maxDeviation);
           }

        return output;
    }

    private calculateMinDoor(snapshot: Point, reference: Point, maxDeviation: number): LinearFunction {
        const lowerBound: number = snapshot.y - maxDeviation;
        const minDoor: LinearFunction = new LinearFunction(reference, new Point(snapshot.x, lowerBound));
        log.debug("calculated minimum door: " + minDoor);
        return minDoor;
    }

    private calculateMaxDoor(snapshot: Point, reference: Point, maxDeviation: number): LinearFunction {
        const upperBound: number = snapshot.y + maxDeviation;
        const maxDoor: LinearFunction = new LinearFunction(reference, new Point(snapshot.x, upperBound));
        log.debug("calculated maximum door: " + maxDoor);
        return maxDoor;
    }
}
