import { Point } from "./Point";

export class LinearFunction {
    private _slope: number = 1;
    private _yIntercept: number = 0;

    constructor(p1: Point, p2: Point) {
        this.fromPoints(p1.x, p1.y, p2.x, p2.y);
    }

    public get slope(): number {
        return this._slope;
    }

    public get yIntercept(): number {
        return this._slope;
    }

    public calculateY(x: number): number {
        return this._slope * x + this._yIntercept;
    }

    public fromPoints(x1: number, y1: number, x2: number, y2: number) {
        this._slope = (y2 - y1) / (x2 - x1);
        this._yIntercept = y2 - this._slope * x2;
    }

    public toString = (): string => {

        return `y= ${this._slope}*x + ${this._yIntercept}`;
    }

}
