import { TestDataLoader } from "./visualisation/TestDataUtil";
import { RamerDouglasPeuckerStrategy } from "../src/compressionStrategies/RamerDouglasPeuckerStrategy";

describe("RDP", () => {

           it("sample numbers with epsilon 1", () => {

               // Arrange
               const strategy = new RamerDouglasPeuckerStrategy();
               const numbers: number[] = [0, 0.1, -0.1, 5, 6, 7, 8.1, 9, 9, 9];

               // Act
               const result = strategy.compress(numbers, 1);

               // Assert
               expect(result).toEqual([0, -0.1, 5, 9, 9]);
           });

           it("sample datavaluepoints with epsilon 1", () => {

            // Arrange
            const strategy = new RamerDouglasPeuckerStrategy();
            const loader: TestDataLoader = new TestDataLoader();
            const data = loader.load("ramerDouglasPeucker.json");

            // Act
            const actual = strategy.compressWithDate(data, 3);

            // Assert
            const expected = loader.load("ramerDouglasPeucker.json");
            expect(actual).toEqual(expected);
        });

   });
