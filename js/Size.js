class Size {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    set width(width) {
        this._width = width;
    }

    set height(height) {
        this._height = height;
    }

    toArray() {
        return [this._width, this._height];
    }
}