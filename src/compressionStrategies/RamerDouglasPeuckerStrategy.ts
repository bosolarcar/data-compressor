import { LinearFunction } from "../model/LinearFunction";
import { Point } from "../model/Point";
import { log } from "../util/Logger";

export class RamerDouglasPeuckerStrategy{

public compress(data: number[], epsilon: number): number[]{
    let output: number[] = [];

    // Find the point with the maximum distance
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

    if ( dmax > epsilon ) {
        log.debug("dmax > epsilon");
        // Recursive call
        const recResults1: number[] = this.compress(data.slice(0, index + 1), epsilon);
        const recResults2: number[] = this.compress(data.slice(index, data.length), epsilon);
        log.debug("recResults1: " + recResults1);
        log.debug("recResults2: " + recResults2);

        // Build the result list
        output = recResults1.slice(0, recResults1.length - 1);
        output = output.concat(recResults2);
    } else {
        //return start and end point
        log.debug("dmax < epsilon");
        output = [data[0], data[end]];
    }
    // Return the result
    log.debug("returned output: " + output);
    return output;

}

/* private perpendicularDistance(point: Point, line: LinearFunction): number {
    const a = line.slope;
    const b = -1;
    const c = line.yIntercept;

    return Math.abs(a * point.x + b * point.y + c) / Math.hypot(a, b);
} */

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
