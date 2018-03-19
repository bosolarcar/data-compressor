import { SwingingDoorOptions } from "../src/compressionStrategies/options/SwingingDoorOptions";
import { SwingingDoorStrategy } from "../src/compressionStrategies/SwingingDoorStrategy";
import { TestDataLoader } from "./visualisation/TestDataUtil";

describe("SwingingDoor", () => {

    it("Swingingdoor", () => {

        // Arrange
        const strategy = new SwingingDoorStrategy();
        const numbers: number[] = [5, 4, 6, 9, 8, 1];

        const opt: SwingingDoorOptions = {maxDeviation: 2, interval: 5};

        // Act
        const result = strategy.compress(numbers, opt);

        // Assert
        expect(result).toEqual([5, 8]);
    });

    it("Swingingdoor with datevaluepoints", () => {

        // Arrange
        const strategy = new SwingingDoorStrategy();
        const loader: TestDataLoader = new TestDataLoader();
        const numbers = loader.load("temperatur.json");
        const expected = loader.load("swingingDoor.json");

        const opt: SwingingDoorOptions = {maxDeviation: 2, interval: 5};

        // Act
        const actual = strategy.compressWithDate(numbers, opt);

        // Assert
        expect(actual).toEqual(expected);
    });

    it("Swingingdoor without datevaluepoints", () => {

        // Arrange
        const strategy = new SwingingDoorStrategy();
        const numbers: number[] = [-10, 5, 6, 4, 11, 9, 10, 8, 6, 7];

        const opt: SwingingDoorOptions = {maxDeviation: 2, interval: 5};

        // Act
        const result = strategy.compress(numbers, opt);

        // Assert
        expect(result).toEqual([-10, 5, 4, 11]);
    });

});
