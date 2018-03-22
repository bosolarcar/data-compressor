import { DeadBandCompressionStrategy } from "../src/compressionStrategies/DeadBandCompressionStrategy";
import { DateValuePoint } from "../src/model/DateValuePoint";
import { TestDataLoader } from "./util/TestDataUtil";

describe("DeadbandSampling", () => {

    it("Deadband without previous", () => {

        // Arrange
        const strategy = new DeadBandCompressionStrategy(2, false);
        const numbers: number[] = [5, 4, 6, 9, 8, 1];

        // Act
        const result = strategy.compress(numbers);

        // Assert
        expect(result).toEqual([5, 9, 1]);
    });

    it("Deadband with previous", () => {

        // Arrange
        const strategy = new DeadBandCompressionStrategy(2, true);
        const numbers: number[] = [5, 4, 6, 9, 8, 1];

        // Act
        const result = strategy.compress(numbers,);

        // Assert
        expect(result).toEqual([5, 6, 9, 8, 1]);
    });

    it("Deadband with date and withou previous", () => {

        const loader: TestDataLoader = new TestDataLoader();

        // Arrange
        const strategy = new DeadBandCompressionStrategy(2, false);
        const raw = loader.load("temperatur.json");

        // Act
        const actual = strategy.compressWithDate(raw);

        // Assert
        const expected = loader.load("deadbandWithoutPrevious.json");
        expect(actual).toEqual(expected);
    });
});
