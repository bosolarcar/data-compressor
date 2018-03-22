import * as fs from "fs";
import * as ss from "simple-statistics"
import { BinningStrategy } from "../../src/compressionStrategies/BinningStrategy";
import { DeadBandCompressionStrategy } from "../../src/compressionStrategies/DeadBandCompressionStrategy";
import { DeltaSamplingStrategy } from "../../src/compressionStrategies/DeltaSamplingStrategy";
import { LinearSamplingStrategy } from "../../src/compressionStrategies/LinearSamplingStrategy";
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

strategy = new DeadBandCompressionStrategy(3, false);
log.info("Starting Deadband Compression");
compressed = strategy.compressWithDate(data);
logStatistics();
loader.write("test/visualisation/deadband.json", compressed);

strategy = new SwingingDoorStrategy(4);
log.info("Starting swinging door compression");
compressed = strategy.compressWithDate(data);
logStatistics();
loader.write("test/visualisation/door.json", compressed);

strategy = new LinearSamplingStrategy(1000, 0);
log.info("Starting linear sampling compression");
logStatistics();
loader.write("test/visualisation/linear.json", compressed);

strategy = new DeltaSamplingStrategy(0.1);
log.info("Starting delta compression");
compressed = strategy.compressWithDate(data);
logStatistics();
loader.write("test/visualisation/delta.json", compressed);

strategy = new RamerDouglasPeuckerStrategy(3);
log.info("Starting rdp compression");
compressed = strategy.compressWithDate(data);
logStatistics();
loader.write("test/visualisation/rdp.json", compressed);

strategy = new BinningStrategy(1000);
log.info("Starting binning compression");
compressed = strategy.compressWithDate(data);
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
