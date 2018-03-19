import { BinningStrategy } from "../src/compressionStrategies/BinningStrategy";
import { BinningOptions } from "../src/compressionStrategies/options/BinningOptions";
import { DateValuePoint } from "../src/model/DateValuePoint";
import { TestDataLoader } from "./visualisation/TestDataUtil";

describe("Binninng", () => {

           it("binning with numbers", () => {

               // Arrange
               const strategy = new BinningStrategy();
               const numbers: number[] = [1, 3, 3, 5, 7];
               const opt: BinningOptions = {min: true, max: true, avg: true, evenArray: false};
               const expected: number[] = [2, 4];

               // Act
               const result = strategy.compress(numbers, 2, opt);

               // Assert
               expect(result).toEqual(expected);
           });

           it("binning with datevaluepoints", () => {

            // Arrange
            const strategy = new BinningStrategy();
            const loader: TestDataLoader = new TestDataLoader();
            const data = loader.load("temperatur.json");
            const opt: BinningOptions = {min: true, max: true, avg: true, evenArray: false};

            const expected: DateValuePoint[] = loader.load("binning.json");

            // Act
            const actual = strategy.compressWithDate(data, 3, opt);

            // Assert
            expect(actual).toEqual(expected);
        });
   });
