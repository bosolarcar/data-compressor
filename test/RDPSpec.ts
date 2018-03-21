import { TestDataLoader } from "./visualisation/TestDataUtil";
import { RamerDouglasPeuckerStrategy } from "../src/compressionStrategies/RamerDouglasPeuckerStrategy";

describe("RDP", () => {

           it("sample numbers with epsilon 3", () => {

               // Arrange
               const strategy = new RamerDouglasPeuckerStrategy();
               //const numbers: number[] = [1, 3, 9, 5, 7];
               const numbers: number[] = [0, 0.1, -0.1, 5, 6, 7, 8.1, 9, 9, 9];

               // Act
               const result = strategy.compress(numbers, 1);

               // Assert
               expect(result).toEqual([0, -0.1, 5, 9, 9]);
           });

   });
