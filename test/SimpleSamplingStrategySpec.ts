import { LinearSamplingStrategy } from "../src/compressionStrategies/LinearSamplingStrategy";
import { LinearSamplingOptions } from "../src/compressionStrategies/options/LinearSamplingOptions";

describe("Sampler", () => {

       describe("sample", () => {

           it("returns the sampled data", () => {

               // Arrange
               const strategy = new LinearSamplingStrategy();
               const numbers: number[] = [1, 3, 9, 5, 7];
               const opt: LinearSamplingOptions = {evenArray: false};

               // Act
               const result = strategy.compress(numbers, 3, opt);

               // Assert
               expect(result).toEqual([1, 9, 7]);
           });
       });
   });
