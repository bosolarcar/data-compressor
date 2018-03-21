import * as Rx from "rxjs/Rx";
import { LevelCompression } from "../src/compressionStrategies/LevelCompression";

describe("LevelCompression", () => {
           it("Compresses with level compression", () => {

               // Arrange
               const strategy = new LevelCompression();
               const numbers: number[] = [1, 3, 9, 5, 7, 3, 5, 6, 8];

               // Act
               const result: number[][] = strategy.compress(numbers, 3);

               // Assert
               expect(result).toEqual([numbers, [4.333333333333333, 5, 6.333333333333333], [5.222222222222221]]);
           });
   });
