import * as Rx from "rxjs/Rx";
import { LevelCompression } from "../src/compressionStrategies/LevelCompression";

describe("LevelCompression", () => {
           it("Compresses with level compression", () => {

               // Arrange
               const strategy = new LevelCompression();
               const numbers: number[] = [1, 3, 9, 5, 7, 3, 5, 6, 8];

               // Act
               strategy.compress(Rx.Observable.from(numbers), 3);

               // Assert
               //expect(result).toEqual([1, 9, 5]);
           });
   });
