import {log} from "../util/Logger";
import { SwingingDoorOptions } from "./options/SwingingDoorOptions";

export class SwingingDoorStrategy {

    public compress(data: number[], opt: SwingingDoorOptions): number[] {
        let output: number[] = [];
        let reference: number = data[0];
        log.debug("new reference value: " + reference);
        let referenceIndex = 0;
        output.push(reference);

        log.debug("New snapshot value: " + data[1])
        let lowerBound: number= data[1] - opt.maxDeviation;
        let upperBound: number= data[1] + opt.maxDeviation;


        let minSlope= (lowerBound - reference) / (1 - referenceIndex);
        let minB= lowerBound - minSlope * 1;
        log.debug("calculated minimum slope: " + "y="  + minSlope + "*x+" + minB);

        let maxSlope= (upperBound - reference) / (1 - referenceIndex);
        let maxB= upperBound - maxSlope * 1;
        log.debug("calculated maximum slope: " + "y="  + maxSlope + "*x+" + maxB);



        let x: number;
        for (x = 2; x < data.length; x++) {
            log.debug("Processing value at position " + x);
            let snapshotX = x;
            let snapshotY = data[x];
            log.debug("New snapshot value: " + snapshotY)

            let lowerY: number = minSlope * x + minB;
            let upperY: number = maxSlope * x + maxB;

            if (!(snapshotY >= lowerY && snapshotY <= upperY)) {
                log.debug("value: " + snapshotY + " not in swinging door: " + lowerY + " - " + upperY);
                output.push(data[x-1]);
                log.debug("Pushed value: " + data[x-1]);

                reference = data[x-1];
                log.debug("new reference value: " + data[x-1]);
                referenceIndex = x-1;

            }else{
                log.debug("value: " + snapshotY + " in swinging door: " + lowerY + " - " + upperY);

            }

            lowerBound= snapshotY - opt.maxDeviation;
            upperBound= snapshotY + opt.maxDeviation;

            //TODO make sure that new slope is narrower than previous one
            minSlope= (lowerBound - reference) / (snapshotX - referenceIndex);
            minB= lowerBound - minSlope * snapshotX;
            log.debug("calculated minimum slope: " + "y="  + minSlope + "*x+" + minB);

            //TODO make sure that new slope is narrower than previous one
            maxSlope= (upperBound - reference) / (snapshotX - referenceIndex);
            maxB= upperBound - maxSlope * snapshotX;
            log.debug("calculated maximum slope: " + "y="  + maxSlope + "*x+" + maxB);
        }

        return output;
    }

}
