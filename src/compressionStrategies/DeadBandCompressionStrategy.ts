import { Observable } from "rxjs/Observable";
import { DateValuePoint } from "../model/DateValuePoint";
import {log} from "../util/Logger";
import {Math} from "../util/Math";
import { ICompressionStrategy } from "./ICompressionStrategy";

export class DeadBandCompressionStrategy implements ICompressionStrategy {

/**
 * @param deadband  Gibt die Größe des Deadbands an. Je größer dieser Wert gewählt wird, desto mehr Daten fallen bei der Komprimierung raus.
 * @param sendPrevious  Wenn dieser Wert gesetzt ist, wird bei jedem Wert, der außerhalb des Deadbands liegt zusätzlich noch der Vorgänger gespeichert.
 */

    constructor(private deadband: number, private sendPrevious: boolean) {}

    public compress(data: number[]): number[] {
        const output: number[] = [data[0]];

        let reference: number = data[0];
        let num: number;
        for (num = 1; num < data.length; num++) {
            const previous: number = data[num - 1];
            const element: number = data[num];
            if (Math.absoluteDelta(element, reference) > this.deadband) {
                if (this.sendPrevious) {
                    output.push(previous);
                }
                output.push(element);
                reference = element;
            }
    }
        return output;
    }

    public compressWithDate(data: DateValuePoint[]): DateValuePoint[] {
        const output: DateValuePoint[] = [data[0]];

        let reference: number = data[0].value;
        let num: number;
        for (num = 1; num < data.length; num++) {
            const previous: DateValuePoint = data[num - 1];
            const element: DateValuePoint = data[num];
            if (Math.absoluteDelta(element.value, reference) > this.deadband) {
                if (this.sendPrevious && output[output.length - 1] !== previous) {
                    output.push(previous);
                }
                output.push(element);
                reference = element.value;
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
}
