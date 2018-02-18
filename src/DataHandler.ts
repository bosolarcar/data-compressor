import { BinningStrategy } from "./compressionStrategies/BinningStrategy";
import { LinearSamplingStrategy } from "./compressionStrategies/LinearSamplingStrategy";
import { BinningOptions} from "./compressionStrategies/options/BinningOptions";
import { LinearSamplingOptions} from "./compressionStrategies/options/LinearSamplingOptions";
import {AggregateDataPoint} from "./model/AggregateDataPoint";

class DataHandler {

    public static Instance() {
        if (this.instance == null) {
            this.instance = new DataHandler();
        }
        return this.instance;
    }

    private static instance: DataHandler | null = null;

    private constructor() {}

    public dataBinning(data: number[], points: number, opt?: BinningOptions): AggregateDataPoint[] {
        if (!opt) {
            opt = {min: true, max: true, avg: true, evenArray: true};
        }
        return new BinningStrategy().compress(data, points, opt);
    }

    public linearSampling(data: number[], sampleSize: number,  opt?: LinearSamplingOptions): number[] {
        if (!opt) {
            opt = {evenArray: true};
        }
        return new LinearSamplingStrategy().compress(data, sampleSize, opt);
    }
}
