import { DateValuePoint } from "../model/DateValuePoint";
import { ICompressionStrategy } from "./ICompressionStrategy";

export class RawDataStrategy implements ICompressionStrategy {

    public compressWithDate(raw: DateValuePoint[]): DateValuePoint[] {
        return raw;

    }
    public compress(raw: number[]): number[] {
        return raw;
    }
}