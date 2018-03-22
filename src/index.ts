import { BinningStrategy } from "./compressionStrategies/BinningStrategy";
import { ICompressionStrategy } from "./compressionStrategies/ICompressionStrategy";
import { LinearSamplingStrategy } from "./compressionStrategies/LinearSamplingStrategy";
import { RawDataStrategy } from "./compressionStrategies/RawDataStrategy";
import {AggregateDataPoint} from "./model/AggregateDataPoint";
import { DateValuePoint } from "./model/DateValuePoint";

export class DataHandler {

    public static Instance() {
        if (this.instance == null) {
            this.instance = new DataHandler();
        }
        return this.instance;
    }
    private static instance: DataHandler | null = null;
    private strategy: ICompressionStrategy = new RawDataStrategy();

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
}
