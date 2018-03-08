import { SwingingDoorStrategy } from "../src/compressionStrategies/SwingingDoorStrategy";
import { SwingingDoorOptions } from "../src/compressionStrategies/options/SwingingDoorOptions";

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

});
