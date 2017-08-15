class Playing {
    constructor(canvas, board) {
        this._canvas = canvas;
        this._board = board;
        
        // Override these fields
        this._blueText = "";
        this._redText = "";
        this._blueTextOpacity = 1;
        this._redTextOpacity = 1;
        
        // Create coordinates for the game label
        const gameLabelOffsetY = 30;
        this._gameLabelCenterCoord = new Coordinate(this._canvas.width / 2, gameLabelOffsetY);
        
        // Create coordinates to place the turn label
        const sideOffsetX = 15;
        const sideOffsetY = gameLabelOffsetY + 50;
        this._redLabelCoord = new Coordinate(sideOffsetX, sideOffsetY);
        this._blueLabelCoord = new Coordinate(this._canvas.width - sideOffsetX, sideOffsetY);
        
        // Create button to end turn
        const endTurnSize = new Size(80, 30);
        const endTurnCoord = new Coordinate((this._canvas.width - endTurnSize.width) / 2, sideOffsetY - endTurnSize.height / 2);
        this._endTurnButton = new Button(this._canvas, endTurnCoord, endTurnSize, "End")
        this._endTurnButton.callback = this._endTurn;
    }
    
    remove() {
        
    }

    _draw() {
        // Game label
        this._canvas.drawText(this._gameLabelCenterCoord, "CodeNames", "center", "50px Arial");
        
        // Show the sides
        this._canvas.drawText(this._redLabelCoord, this._redText, "left", "30px Arial", "#D6190B", this._redTextOpacity);
        this._canvas.drawText(this._blueLabelCoord, this._blueText, "right", "30px Arial", "#0E4E8B", this._blueTextOpacity);
        
        // Show a button that ends the turn
        this._endTurnButton.draw();
        
        // Draw the board
        this._board.enableDraw();
    }
    
    _endTurn() {
        Events.dispatch(Controller.SpyMasterState.EVENTS.GOTO_TRANSITION);
    }
}