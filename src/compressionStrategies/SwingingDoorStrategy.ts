import {log} from "../util/Logger";
import { SwingingDoorOptions } from "./options/SwingingDoorOptions";

export class SwingingDoorStrategy {

    public compress(data: number[], opt: SwingingDoorOptions): number[] {
        let output: number[] = [];
        let reference: number = data[0];
        log.debug("new reference value: " + reference);
        let referenceIndex = 0;
        output.push(reference);

        let lowerBound: number = data[1] - opt.maxDeviation;
        let upperBound: number = data[1] + opt.maxDeviation;

        //calculate minSlope
        let slopeMin: number = (lowerBound - reference) / (1 - referenceIndex);
        let bMin: number = referenceIndex / (slopeMin * reference);
        //TODO validate with snapshot point
        log.debug("calculated minimum slope: " + "y="  + slopeMin + "*x+" + bMin);

        //calculate maxSlope
        let slopeMax: number = (upperBound - reference) / (1 - referenceIndex);
        let bMax: number = referenceIndex / (slopeMax * reference);
        //TODO validate with snapshot point
        log.debug("calculated maximum slope: " + "y="  + slopeMax + "*x+" + bMax);




        let i: number;

        for (i = 2; i <= data.length; i++) {
            log.debug("processing element " + i);
            const element: number = data[i];

            let upperY: number = slopeMax * i + bMax;
            let lowerY: number = slopeMin * i + bMin;

            //not in Swinging door
            if (!(element > lowerY && element < upperY)) {
                log.debug("value: " + element + " not in swinging door: " + lowerY + " - " + upperY);
                output.push(element);



            //calculate minSlope
            slopeMin = (lowerBound - reference) / (i - referenceIndex);
            bMin = referenceIndex / (slopeMin * reference);
            //TODO validate with snapshot point
            log.debug("calculated minimum slope: " + "y="  + slopeMin + "*x+" + bMin);

            //calculate maxSlope
            slopeMax = (upperBound - reference) / (i - referenceIndex);
            bMax = referenceIndex / (slopeMax * reference);
            //TODO validate with snapshot point
            log.debug("calculated maximum slope: " + "y="  + slopeMax + "*x+" + bMax);


                reference = element;
                log.debug("new reference value: " + reference);
                referenceIndex = i;
            }else{
                log.debug("value: " + element + " in swinging door: " + lowerY + " - " + upperY);

                            //calculate minSlope
            slopeMin = (lowerBound - reference) / (i - referenceIndex);
            bMin = referenceIndex / (slopeMin * reference);
            //TODO validate with snapshot point
            log.debug("calculated minimum slope: " + "y="  + slopeMin + "*x+" + bMin);

            //calculate maxSlope
            slopeMax = (upperBound - reference) / (i - referenceIndex);
            bMax = referenceIndex / (slopeMax * reference);
            //TODO validate with snapshot point
            log.debug("calculated maximum slope: " + "y="  + slopeMax + "*x+" + bMax);
            }

    }
        return output;
    }

}
