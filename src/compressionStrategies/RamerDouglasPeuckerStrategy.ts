import { LinearFunction } from "../model/LinearFunction";
import { Point } from "../model/Point";
import { log } from "../util/Logger";
import { DateValuePoint } from "../model/DateValuePoint";
import { ICompressionStrategy } from "./ICompressionStrategy";

export class RamerDouglasPeuckerStrategy implements ICompressionStrategy {

    constructor(private epsilon: number) {}

public compress(data: number[]): number[] {
    let output: number[] = [];

    let dmax: number = 0;
    let index: number = 0;
    const end: number = data.length - 1;
    let i: number;
    for (i = 1; i < end; ++i) {
        const d: number = this.perpendicularDistance(new Point(i, data[i]), new Point(0, data[0]), new Point(end, data[end]));
        log.debug("Calculated distance from: (" + i + "/" + data[i] + ") = " + d);
        if ( d > dmax ) {
            index = i;
            dmax = d;
        }
    }
    log.debug("point with max distance is: (" + index + "/" + data[index] + ") = " + dmax);

    if ( dmax > this.epsilon ) {
        log.debug("dmax > epsilon");
        const recResults1: number[] = this.compress(data.slice(0, index + 1));
        const recResults2: number[] = this.compress(data.slice(index, data.length));
        log.debug("recResults1: " + recResults1);
        log.debug("recResults2: " + recResults2);

        output = recResults1.slice(0, recResults1.length - 1);
        output = output.concat(recResults2);
    } else {
        log.debug("dmax < epsilon");
        output = [data[0], data[end]];
    }
    log.debug("returned output: " + output);
    return output;

}

public compressWithDate(data: DateValuePoint[]): DateValuePoint[] {
    let output: DateValuePoint[] = [];

    let dmax: number = 0;
    let index: number = 0;
    const end: number = data.length - 1;
    let i: number;
    for (i = 1; i < end; ++i) {
        const d: number = this.perpendicularDistance(Point.fromDateValuePoint(data[i]), Point.fromDateValuePoint(data[0]), Point.fromDateValuePoint(data[end]));
        log.debug("Calculated distance from: (" + data[i].date + "/" + data[i].value + ") = " + d);
        if ( d > dmax ) {
            index = i;
            dmax = d;
        }
    }
    log.debug("point with max distance is: (" + data[index].date + "/" + data[index].value + ") = " + dmax);

    if ( dmax > this.epsilon ) {
        log.debug("dmax > epsilon");
        const recResults1: DateValuePoint[] = this.compressWithDate(data.slice(0, index + 1));
        const recResults2: DateValuePoint[] = this.compressWithDate(data.slice(index, data.length));
        log.debug("recResults1: " + JSON.stringify(recResults1));
        log.debug("recResults2: " + JSON.stringify(recResults2));

        output = recResults1.slice(0, recResults1.length - 1);
        output = output.concat(recResults2);
    } else {
        log.debug("dmax < epsilon");
        output = [data[0], data[end]];
    }
    log.debug("returned output: " + JSON.stringify(output));
    return output;

}

private perpendicularDistance(pt: Point, lineStart: Point, lineEnd: Point) {
    let dx: number = lineEnd.x - lineStart.x;
    let dy: number = lineEnd.y - lineStart.y;

    // Normalize
    const mag: number = Math.hypot(dx, dy);
    if (mag > 0.0) {
        dx /= mag;
        dy /= mag;
    }
    const pvx: number = pt.x - lineStart.x;
    const pvy: number = pt.y - lineStart.y;

    // Get dot product (project pv onto normalized direction)
    const pvdot: number = dx * pvx + dy * pvy;

    // Scale line direction vector and subtract it from pv
    const ax: number = pvx - pvdot * dx;
    const ay: number = pvy - pvdot * dy;

    return Math.hypot(ax, ay);

}

}
