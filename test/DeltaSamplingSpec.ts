import { DeltaSamplingStrategy } from "../src/compressionStrategies/DeltaSamplingStrategy";
import { TestDataLoader } from "./util/TestDataUtil";

describe("DeltaSampling", () => {

           it("sample numbers with delta 3", () => {

               // Arrange
               const strategy = new DeltaSamplingStrategy(3);
               const numbers: number[] = [1, 3, 9, 5, 7];

               // Act
               const result = strategy.compress(numbers);

               // Assert
               expect(result).toEqual([1, 9, 5]);
           });

           it("sample data with delta 3", () => {

            // Arrange
            const strategy = new DeltaSamplingStrategy(3);
            const loader: TestDataLoader = new TestDataLoader();
            const data = loader.load("temperatur.json");

            // Act
            const actual = strategy.compressWithDate(data);

            // Assert
            const expected = loader.load("deltaSampling.json");
            expect(actual).toEqual(expected);
        });
   });
