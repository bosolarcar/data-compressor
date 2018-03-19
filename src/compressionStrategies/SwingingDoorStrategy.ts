import { LinearFunction } from "../model/LinearFunction";
import { Point } from "../model/Point";
import {log} from "../util/Logger";
import { SwingingDoorOptions } from "./options/SwingingDoorOptions";

export class SwingingDoorStrategy {

    public compress(data: number[], opt: SwingingDoorOptions): number[] {
        const output: number[] = [];
        const reference: Point = new Point(0, data[0]);
        log.debug("new reference value: " + reference);
        output.push(reference.y);

        log.debug("New snapshot value: " + data[1]);
        let lowerBound: number = data[1] - opt.maxDeviation;
        let upperBound: number = data[1] + opt.maxDeviation;

        let minDoor: LinearFunction = new LinearFunction(reference, new Point(1, lowerBound));
        log.debug("calculated minimum door: " + minDoor);

        let maxDoor: LinearFunction = new LinearFunction(reference, new Point(1, upperBound));
        log.debug("calculated maximum door: " + maxDoor);

        let x: number;
        for (x = 2; x < data.length; x++) {
            log.debug("Processing value at position " + x);
            const snapshot: Point = new Point(x, data[x]);
            log.debug("New snapshot value: " + snapshot.y)

            const lowerY: number = minDoor.calculateY(x);
            const upperY: number = maxDoor.calculateY(x);

            if (!(snapshot.y >= lowerY && snapshot.y <= upperY)) {
                log.debug("value: " + snapshot.y + " not in swinging door: " + lowerY + " - " + upperY);
                output.push(data[x - 1]);
                log.debug("Pushed value: " + data[x - 1]);

                reference.y = data[x - 1];
                log.debug("new reference value: " + data[x - 1]);
                reference.x = x - 1;

            } else {
                log.debug("value: " + snapshot.y + " in swinging door: " + lowerY + " - " + upperY);

            }

            lowerBound = snapshot.y - opt.maxDeviation;
            upperBound = snapshot.y + opt.maxDeviation;

            //TODO make sure that new slope is narrower than previous one
            minDoor = new LinearFunction(reference, new Point(snapshot.x, lowerBound));
            log.debug("calculated minimum door: " + minDoor);

            //TODO make sure that new slope is narrower than previous one
            maxDoor = new LinearFunction(reference, new Point(snapshot.x, upperBound));
            log.debug("calculated maximum door: " + maxDoor);
        }

        return output;
    }

}
