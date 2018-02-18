import { DeltaSamplingStrategy } from "../src/compressionStrategies/DeltaSamplingStrategy";

describe("Sampler", () => {

       describe("sample", () => {

           it("returns the sampled data", () => {

               // Arrange
               const strategy = new DeltaSamplingStrategy();
               const numbers: number[] = [1, 3, 9, 5, 7];

               // Act
               const result = strategy.compress(numbers, 3);

               // Assert
               expect(result).toEqual([1, 9, 5]);
           });
       });
   });
