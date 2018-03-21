import * as fs from "fs";
import * as ss from "simple-statistics"
import { BinningStrategy } from "../../src/compressionStrategies/BinningStrategy";
import { DeadBandCompressionStrategy } from "../../src/compressionStrategies/DeadBandCompressionStrategy";
import { DeltaSamplingStrategy } from "../../src/compressionStrategies/DeltaSamplingStrategy";
import { LinearSamplingStrategy } from "../../src/compressionStrategies/LinearSamplingStrategy";
import { BinningOptions } from "../../src/compressionStrategies/options/BinningOptions";
import { DeadBandOptions } from "../../src/compressionStrategies/options/DeadBandOptions";
import { LinearSamplingOptions } from "../../src/compressionStrategies/options/LinearSamplingOptions";
import { SwingingDoorOptions } from "../../src/compressionStrategies/options/SwingingDoorOptions";
import { RamerDouglasPeuckerStrategy } from "../../src/compressionStrategies/RamerDouglasPeuckerStrategy";
import { SwingingDoorStrategy } from "../../src/compressionStrategies/SwingingDoorStrategy";
import { DateValuePoint } from "../../src/model/DateValuePoint";
import { log } from "../../src/util/Logger";
import { TestDataLoader } from "../util/TestDataUtil";

const loader: TestDataLoader = new TestDataLoader();
const data = loader.load("temperaturRaw.json");
let compressed: DateValuePoint[] = data;
let strategy;
log.info("loaded raw data");
logStatistics();

strategy = new DeadBandCompressionStrategy();
const opt: DeadBandOptions = {deadBand: 2, sendPrevious: false, interval: 5};
log.info("Starting Deadband Compression");
compressed = strategy.compressWithDate(data, opt);
logStatistics();
loader.write("test/visualisation/deadband.json", compressed);

//log.level = "debug";
strategy = new SwingingDoorStrategy();
const optS: SwingingDoorOptions = {maxDeviation: 3, interval: 5};
log.info("Starting swinging door compression");
compressed = strategy.compressWithDate(data, optS);
logStatistics();
loader.write("test/visualisation/door.json", compressed);
log.level = "info";

strategy = new LinearSamplingStrategy();
const optL: LinearSamplingOptions = {evenArray: false};
log.info("Starting linear sampling compression");
compressed = strategy.compress(data, 1000, optL);
logStatistics();
loader.write("test/visualisation/linear.json", compressed);


strategy = new DeltaSamplingStrategy();
//const optL: DeltaSa = {evenArray: false};
log.info("Starting delta compression");
compressed = strategy.compressWithDate(data, 2);
logStatistics();
loader.write("test/visualisation/delta.json", compressed);


strategy = new RamerDouglasPeuckerStrategy();
//const optL: DeltaSa = {evenArray: false};
log.info("Starting rdp compression");
compressed = strategy.compressWithDate(data, 2);
logStatistics();
loader.write("test/visualisation/rdp.json", compressed);

strategy = new BinningStrategy();
const optB: BinningOptions = {min: true, max: true, avg: true, evenArray: false};
log.info("Starting binning compression");
compressed = strategy.compressWithDate(data, 1000, optB);
logStatistics();
loader.write("test/visualisation/binning.json", compressed);

function logStatistics() {
    log.info("data length: " + data.length);
    log.info("length: " + compressed.length);
    log.info("percentage: " + (compressed.length / data.length) * 100);
    log.info("minimum: " + ss.min(compressed.map((a) => a.value)));
    log.info("maximum: " + ss.max(compressed.map((a) => a.value)));
    log.info("average: " + ss.average(compressed.map((a) => a.value)));
    log.info("standard derivation: " + ss.standardDeviation(compressed.map((a) => a.value)));
    log.info("\n");
    log.info("\n");
}
