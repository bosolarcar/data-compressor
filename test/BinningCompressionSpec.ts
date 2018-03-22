import { BinningStrategy } from "../src/compressionStrategies/BinningStrategy";
import { DateValuePoint } from "../src/model/DateValuePoint";
import { TestDataLoader } from "./util/TestDataUtil";
describe("Binninng", () => {

           it("binning with numbers", () => {

               // Arrange
               const strategy = new BinningStrategy(2);
               const numbers: number[] = [1, 3, 3, 5, 7];
               const expected: number[] = [2, 4];

               // Act
               const result = strategy.compress(numbers);

               // Assert
               expect(result).toEqual(expected);
           });

           it("binning with datevaluepoints", () => {

            // Arrange
            const strategy = new BinningStrategy(3);
            const loader: TestDataLoader = new TestDataLoader();
            const data = loader.load("temperatur.json");

            const expected: DateValuePoint[] = loader.load("binning.json");

            // Act
            const actual = strategy.compressWithDate(data);

            // Assert
            expect(actual).toEqual(expected);
        });
   });
