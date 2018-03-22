import { DateValuePoint } from "../model/DateValuePoint";
import { Point } from "../model/Point";

export interface ICompressionStrategy {
    compressWithDate(raw: DateValuePoint[]): DateValuePoint[];
    compress(raw: number[]): number[];
}
