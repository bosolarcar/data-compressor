import * as Rx from "rxjs/Rx";
import { DateValuePoint } from "../model/DateValuePoint";
import { Point } from "../model/Point";

export interface ICompressionStrategy {
    compressWithDate(raw: DateValuePoint[]): DateValuePoint[];
    compress(raw: number[]): number[];

    compressStreamWithDate(raw: Rx.Observable<DateValuePoint>): Rx.Observable<DateValuePoint>;
    compressStream(raw: Rx.Observable<number>): Rx.Observable<number>;
}
