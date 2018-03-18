import { DateValuePoint } from "../model/DateValuePoint";
import {log} from "../util/Logger";
import {Math} from "../util/Math";
import { DeadBandOptions } from "./options/DeadBandOptions";

export class DeadBandCompressionStrategy {

    public compress(data: number[], opt: DeadBandOptions): number[] {
        const output: number[] = [data[0]];

        let reference: number = data[0];
        let num: number;
        for (num = 1; num <= data.length; num++) {
            const previous: number = data[num - 1];
            const element: number = data[num];
            if (Math.absoluteDelta(element, reference) > opt.deadBand) {
                if (opt.sendPrevious) {
                    output.push(previous);
                }
                output.push(element);
                reference = element;
            }
    }
        return output;
    }

    public compressWithDate(data: DateValuePoint[], opt: DeadBandOptions): DateValuePoint[] {
        const output: DateValuePoint[] = [data[0]];

        let reference: number = data[0].value;
        let num: number;
        for (num = 1; num <= data.length; num++) {
            const previous: DateValuePoint = data[num - 1];
            const element: DateValuePoint = data[num];
            if (Math.absoluteDelta(element.value, reference) > opt.deadBand) {
                if (opt.sendPrevious && output[output.length - 1] !== previous) {
                    output.push(previous);
                }
                output.push(element);
                reference = element.value;
            }
    }
        return output;
    }
}
