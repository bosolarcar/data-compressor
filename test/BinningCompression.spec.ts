import { BinningStrategy } from "../src/compressionStrategies/BinningStrategy";
import { BinningOptions } from "../src/compressionStrategies/options/BinningOptions";
import { AggregateDataPoint } from "../src/model/AggregateDataPoint";

describe("Sampler", () => {

       describe("sample", () => {

           it("returns the sampled data", () => {

               // Arrange
               const strategy = new BinningStrategy();
               const numbers: number[] = [1, 3, 3, 5, 7];
               const opt: BinningOptions = {min: true, max: true, avg: true, evenArray: true};
               const expected: AggregateDataPoint[] = [{min: 1, max: 3, avg: 2}, {min: 3, max: 5, avg: 4}];

               // Act
               const result = strategy.compress(numbers, 2, opt);

               // Assert
               expect(result).toEqual(expected);
           });
       });
   });
