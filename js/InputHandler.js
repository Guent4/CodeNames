class InputHandler {
    constructor(canvas) {
        this._canvas = canvas;

        this._canvas.listen("click", this._click.bind(this));
    }

    _click(e) {
        const mousePosition = this._canvas.getMousePosition(e);
        Events.dispatch(InputHandler.EVENTS.CLICK, mousePosition);
    }
}

InputHandler.EVENTS = {
    CLICK: "inputhandler-click"
};