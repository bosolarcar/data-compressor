import { DeadBandCompressionStrategy } from "../src/compressionStrategies/DeadBandCompressionStrategy";
import { DeadBandOptions } from "../src/compressionStrategies/options/DeadBandOptions";
import { DateValuePoint } from "../src/model/DateValuePoint";
import { TestDataLoader } from "./visualisation/TestDataUtil";

describe("DeadbandSampling", () => {

    it("Deadband without previous", () => {

        // Arrange
        const strategy = new DeadBandCompressionStrategy();
        const numbers: number[] = [5, 4, 6, 9, 8, 1];

        const opt: DeadBandOptions = {deadBand: 2, sendPrevious: false, interval: 5};

        // Act
        const result = strategy.compress(numbers, opt);

        // Assert
        expect(result).toEqual([5, 9, 1]);
    });

    it("Deadband with previous", () => {

        // Arrange
        const strategy = new DeadBandCompressionStrategy();
        const numbers: number[] = [5, 4, 6, 9, 8, 1];

        const opt: DeadBandOptions = {deadBand: 2, sendPrevious: true, interval: 5};

        // Act
        const result = strategy.compress(numbers, opt);

        // Assert
        expect(result).toEqual([5, 6, 9, 8, 1]);
    });

    it("Deadband with date and withou previous", () => {

        const loader: TestDataLoader = new TestDataLoader();

        // Arrange
        const strategy = new DeadBandCompressionStrategy();
        const raw = loader.load("temperatur.json");

        const opt: DeadBandOptions = {deadBand: 2, sendPrevious: false, interval: 5};

        // Act
        const actual = strategy.compressWithDate(raw, opt);

        // Assert
        const expected = loader.load("deadbandWithoutPrevious.json");
        expect(actual).toEqual(expected);
    });
});
