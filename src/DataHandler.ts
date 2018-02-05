import { ICompressionStrategy } from "./compressionStrategies/ICompressionStrategy";
import { LinearSamplingStrategy } from "./compressionStrategies/LinearSamplingStrategy";


// tslint:disable-next-line:interface-name
export interface Options {
    min: boolean;
    max: boolean;
    avg: boolean;
    evenArray: boolean;
}

class DataHandler {

    public static Instance() {
        if (this.instance == null) {
            this.instance = new DataHandler();
        }
        return this.instance;
    }

    private static instance: DataHandler | null = null;
    private compressionStrategy: ICompressionStrategy = new LinearSamplingStrategy();

    private constructor() {}

    public setSamplingStrategy(strategy: ICompressionStrategy) {
        this.compressionStrategy = strategy;
    }

    public sampleData(data: number[], points: number, opt?: Options): any[] {
        if (!opt) {
            opt = {min: true, max: true, avg: true, evenArray: true};
        }
        return this.compressionStrategy.compress(data, points, opt);
    }
}
