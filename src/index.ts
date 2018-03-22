import { Observable } from "rxjs/Observable";
import { BinningStrategy } from "./compressionStrategies/BinningStrategy";
import { ICompressionStrategy } from "./compressionStrategies/ICompressionStrategy";
import { LevelCompression } from "./compressionStrategies/LevelCompression";
import { LinearSamplingStrategy } from "./compressionStrategies/LinearSamplingStrategy";
import { RawDataStrategy } from "./compressionStrategies/RawDataStrategy";
import {AggregateDataPoint} from "./model/AggregateDataPoint";
import { DateValuePoint } from "./model/DateValuePoint";

export class DataCompressor {

/**
 * @returns Liefert eine Instanz dieser Klasse nach dem Singleton Prinzip zurück
 */

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

/**
 * @param strategy Der zu verwendende Algorithmus. Dieser muss vorher instaniziert werden.
 */

    public setCompressionStrategy(strategy: ICompressionStrategy) {
        this.strategy = strategy;
    }

/**
 *  Komprimiert Daten mit dem ausgewählten Algorithmus
 * @param raw Die Rohdaten als Paar bestehend aus Zeitpunkt und Messwert
 * @returns Die komprimierten Daten
 */

    public compressWithDate(raw: DateValuePoint[]): DateValuePoint[] {
        return this.strategy.compressWithDate(raw);
    }

/**
 *  Komprimiert Daten mit dem ausgewählten Algorithmus
 * @param raw Die Rohdaten als Paar bestehend aus Messwerten
 * @returns Die komprimierten Daten
 */

    public compress(raw: number[]): number[] {
        return this.strategy.compress(raw);
    }

/**
 * Komprimiert Daten mit dem ausgewählten Algorithmus
 * @param raw Die Rohdaten als Paar bestehend aus Zeitpunkt und Messwert
 * @returns Die komprimierten Daten
 */

    public compressStreamWithDate(raw: Observable<DateValuePoint>): Observable<DateValuePoint> {
        return this.strategy.compressStreamWithDate(raw);
    }

/**
 * Komprimiert Daten mit dem ausgewählten Algorithmus
 * @param raw Die Rohdaten als Paar bestehend aus Messwerten
 * @returns Die komprimierten Daten
 */

    public compressStream(raw: Observable<number>): Observable<number> {
        return this.strategy.compressStream(raw);
    }

/**
 * Komprimiert Daten stufenweise
 * @param raw Die Rohdaten als Paar bestehend aus Messwerten
 * @returns Die komprimierten Daten
 */

    public levelCompression(data: number[], factor: number): number[][] {
        return this.levelCompressionStrategy.compress(data, factor);
    }

/**
 * Komprimiert Daten stufenweise
 * @param raw Die Rohdaten als Paar bestehend aus Zeitpunkt und Messwert
 * @returns Die komprimierten Daten
 */

    public levelCompressionWithDate(data: DateValuePoint[], factor: number): DateValuePoint[][] {
        return this.levelCompressionStrategy.compressWithDate(data, factor);
    }

}
