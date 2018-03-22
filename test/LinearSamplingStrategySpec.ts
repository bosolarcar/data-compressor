import { LinearSamplingStrategy } from "../src/compressionStrategies/LinearSamplingStrategy";
import { TestDataLoader } from "./util/TestDataUtil";

describe("Linearsampling", () => {
           it("sampling values", () => {

               // Arrange
               const strategy = new LinearSamplingStrategy(3, 0);
               const numbers: number[] = [1, 3, 9, 5, 7];

               // Act
               const result = strategy.compress(numbers);

               // Assert
               expect(result).toEqual([1, 9, 7]);
           });

           it("sampling values with dates", () => {
            const loader: TestDataLoader = new TestDataLoader();

            // Arrange
            const strategy = new LinearSamplingStrategy(4, 0);
            const data = loader.load("temperatur.json");

            // Act
            const actual = strategy.compressWithDate(data);
            const expected = loader.load("linearSampling.json");

            // Assert
            expect(actual).toEqual(expected);
        });
   });
