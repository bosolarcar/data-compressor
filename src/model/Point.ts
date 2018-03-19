export class Point {

    constructor(private _x: number, private _y: number) {}

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    public toString = (): string => {

        return `(${this._x}/${this._y})`;
    }

}
