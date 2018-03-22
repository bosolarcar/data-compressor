import { RamerDouglasPeuckerStrategy } from "../src/compressionStrategies/RamerDouglasPeuckerStrategy";
import { TestDataLoader } from "./util/TestDataUtil";

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

           it("sample numbers with epsilon 2", () => {

            // Arrange
            const strategy = new RamerDouglasPeuckerStrategy();
            const numbers: number[] = [3, 5, 6, 4, 7, 9, 10, 8, 2, 3];

            // Act
            const result = strategy.compress(numbers, 2);

            // Assert
            expect(result).toEqual([3, 10, 3]);
        });

           it("sample datavaluepoints with epsilon 3", () => {

            // Arrange
            const strategy = new RamerDouglasPeuckerStrategy();
            const loader: TestDataLoader = new TestDataLoader();
            const data = loader.load("temperatur.json");

            // Act
            const actual = strategy.compressWithDate(data, 2);

            // Assert
            const expected = loader.load("ramerDouglasPeucker.json");
            expect(actual).toEqual(expected);
        });

   });
