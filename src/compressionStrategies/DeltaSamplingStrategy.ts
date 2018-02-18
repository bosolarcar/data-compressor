import {log} from "../util/Logger";
import {Math} from "../util/Math";

export class DeltaSamplingStrategy {
    public compress(data: number[], delta: number): number[] {
        log.debug("starting segmentation sampling");
        log.debug("Data length: " + data.length);
        log.debug("minimum delta: " + delta);

        const output: number[] = [data[0]];
        let previous: number = data[0];

        data.forEach((element) => {
            if (Math.absoluteDelta(element, previous) > delta) {
                output.push(element);
                previous = element;
            }
        });

        return output;
    }

}
