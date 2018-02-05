import { Options } from "../DataHandler";

export interface ICompressionStrategy {
    compress(data: any[], points: number, opt: Options): any[];
}
