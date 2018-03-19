import { LinearSamplingStrategy } from "../src/compressionStrategies/LinearSamplingStrategy";
import { LinearSamplingOptions } from "../src/compressionStrategies/options/LinearSamplingOptions";
import { TestDataLoader } from "./visualisation/TestDataUtil";

describe("Linearsampling", () => {
           it("sampling values", () => {

               // Arrange
               const strategy = new LinearSamplingStrategy();
               const numbers: number[] = [1, 3, 9, 5, 7];
               const opt: LinearSamplingOptions = {evenArray: false};

               // Act
               const result = strategy.compress(numbers, 3, opt);

               // Assert
               expect(result).toEqual([1, 9, 7]);
           });

           it("sampling values with dates", () => {
            const loader: TestDataLoader = new TestDataLoader();

            // Arrange
            const strategy = new LinearSamplingStrategy();
            const data = loader.load("temperatur.json");
            const opt: LinearSamplingOptions = {evenArray: false};

            // Act
            const actual = strategy.compress(data, 3, opt);
            const expected = loader.load("linearSampling.json");

            // Assert
            expect(actual).toEqual(expected);
        });
   });
