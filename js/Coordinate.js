class Coordinate {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }

    toArray() {
        return [this._x, this._y];
    }

    static subtract(coord1, coord2) {
        return new Coordinate(coord1.x - coord2.x, coord1.y - coord2.y);
    }
}