import { SwingingDoorStrategy } from "../src/compressionStrategies/SwingingDoorStrategy";
import { TestDataLoader } from "./util/TestDataUtil";

describe("SwingingDoor", () => {

    it("Swingingdoor", () => {

        // Arrange
        const strategy = new SwingingDoorStrategy(2);
        const numbers: number[] = [5, 4, 6, 9, 8, 1];

        // Act
        const result = strategy.compress(numbers);

        // Assert
        expect(result).toEqual([5, 6, 8]);
    });

    it("Swingingdoor with datevaluepoints", () => {

        // Arrange
        const strategy = new SwingingDoorStrategy(2);
        const loader: TestDataLoader = new TestDataLoader();
        const numbers = loader.load("temperatur.json");
        const expected = loader.load("swingingDoor.json");

        // Act
        const actual = strategy.compressWithDate(numbers);

        // Assert
        expect(actual).toEqual(expected);
    });

    it("Swingingdoor without datevaluepoints", () => {

        // Arrange
        const strategy = new SwingingDoorStrategy(1);
        const numbers: number[] = [3, 5, 6, 4, 7, 9, 10, 8, 2, 3];

        // Act
        const result = strategy.compress(numbers);

        // Assert
        expect(result).toEqual([3, 6, 4, 10, 8, 2]);
    });

});
