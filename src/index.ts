import { Observable } from "rxjs/Observable";
import { BinningStrategy } from "./compressionStrategies/BinningStrategy";
import { ICompressionStrategy } from "./compressionStrategies/ICompressionStrategy";
import { LevelCompression } from "./compressionStrategies/LevelCompression";
import { LinearSamplingStrategy } from "./compressionStrategies/LinearSamplingStrategy";
import { RawDataStrategy } from "./compressionStrategies/RawDataStrategy";
import {AggregateDataPoint} from "./model/AggregateDataPoint";
import { DateValuePoint } from "./model/DateValuePoint";

export class DataCompressor {

    public static Instance() {
        if (this.instance == null) {
            this.instance = new DataCompressor();
        }
        return this.instance;
    }
    private static instance: DataCompressor | null = null;
    private strategy: ICompressionStrategy = new RawDataStrategy();
    private levelCompressionStrategy: LevelCompression = new LevelCompression();

    private constructor() {}

    public setCompressionStrategy(strategy: ICompressionStrategy) {
        this.strategy = strategy;
    }

    public compressWithDate(raw: DateValuePoint[]): DateValuePoint[] {
        return this.strategy.compressWithDate(raw);
    }

    public compress(raw: number[]): number[] {
        return this.strategy.compress(raw);
    }

    public compressStreamWithDate(raw: Observable<DateValuePoint>): Observable<DateValuePoint> {
        return this.strategy.compressStreamWithDate(raw);
    }

    public compressStream(raw: Observable<number>): Observable<number> {
        return this.strategy.compressStream(raw);
    }

    public levelCompression(data: number[], factor: number): number[][] {
        return this.levelCompressionStrategy.compress(data, factor);
    }

    public levelCompressionWithDate(data: DateValuePoint[], factor: number): DateValuePoint[][] {
        return this.levelCompressionStrategy.compressWithDate(data, factor);
    }

    public levelCompressionWithStream(data: number[], factor: number): number[][] {
        throw new Error("Not implemented");
    }

}
