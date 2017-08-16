class Board {
    constructor(canvas, topLeftCoord, size) {
        this._canvas = canvas;
        this._topLeftCoord = topLeftCoord;
        this._size = size;
        
        // Set board card size
        this._nrows = 5;
        this._ncols = 5;
        this._nreds = 9;
        this._nblues = 8;
        this._nassassins = 1;

        // State: empty, spymaster, guesser
        this._state = Board.STATES.EMPTY;
        this._isSpymaster = false;
        
        // Give a region for cards to live in
        const xOffset = 10;
        const yOffsetTop = 150;
        const yOffsetBot = 10;
        this._cardBoxTopLeftCoord = Coordinate.add(this._topLeftCoord, new Coordinate(xOffset, yOffsetTop));
        this._cardBoxSize = new Size(this._size.width - 2 * xOffset, this._size.height - yOffsetTop - yOffsetBot);
        
        // Define card variables
        this._cardSpacing = new Coordinate(20, 20);
        
        this._cardSize = new Size(
            (this._cardBoxSize.width - ((this._nrows - 1) * this._cardSpacing.x)) / this._nrows,
            (this._cardBoxSize.height - ((this._ncols - 1) * this._cardSpacing.y)) / this._ncols
        );
        
        // Create cards
        this._cards = [];
        this._createCards();
        
        // Set card type
        this._cards = this._shuffle(this._cards);
        this._cards[0].type = Card.TYPE.ASSASSIN;
        for (let j = 1; j < this._nreds + 1; j++) {
            this._cards[j].type = Card.TYPE.RED;
        }
        for (let j = this._nreds + 1; j < this._nreds + this._nblues + 1; j++) {
            this._cards[j].type = Card.TYPE.BLUE;
        }
        for (let j = this._nreds + this._nblues + 1; j < this._ncols * this._nrows; j++) {
            this._cards[j].type = Card.TYPE.CIVILIAN;
        }
    }

    get state() {
        return this._state;
    }

    set state(s) {
        this._state = s;
        
        this._isSpymaster = this._state === Board.STATES.SPYMASTER_BLUE || this._state === Board.STATES.SPYMASTER_RED;
        
        // If the state of the board changes, then relabel the cards
        for (let card of this._cards) {
            card.spymaster = this._isSpymaster;
        }
    }

    enableCards(enable) {
        for (let card of this._cards) {
            card.enabled = enable;
        }
    }

    blueWin() {
        let blue_cards = 0;
        for (let card of this._cards) {
            if (card.revealed && card.type === Card.TYPE.BLUE) {
                blue_cards++;
            }
        }

        return blue_cards === this._nblues;
    }

    redWin() {
        let red_cards = 0;
        for (let card of this._cards) {
            if (card.revealed && card.type === Card.TYPE.RED) {
                red_cards++;
            }
        }

        return red_cards === this._nreds;
    }

    assassinWin() {
        let assassin_cards = 0;
        for (let card of this._cards) {
            if (card.revealed && card.type === Card.TYPE.ASSASSIN) {
                assassin_cards++;
            }
        }

        return assassin_cards === this._nassassins;
    }

    enableDraw() {
        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this);
    }

    disableDraw() {
        Events.off(DrawTimer.EVENTS.DRAW, this);
    }

    _draw() {
        // Draw the cards
        for (let card of this._cards) {
            card.draw();
        }
    }
    
    _createCards() {
        let wordList = [];
        let coord = new Coordinate(...this._cardBoxTopLeftCoord.toArray());
        for (let x = 0; x < this._ncols; x ++) {
            for (let y = 0; y < this._nrows; y ++) {
                // Get random word
                let randomWord = Words.getRandomWord();
                while (randomWord in wordList) randomWord = Words.getRandomWord();
                wordList.push(randomWord);
                
                // Generate card
                let card = new Card(this._canvas, new Coordinate(...coord.toArray()), this._cardSize, randomWord)
                this._cards.push(card);
                coord.x += this._cardSize.width + this._cardSpacing.x;
            }
            coord.x = this._cardBoxTopLeftCoord.x;
            coord.y += this._cardSize.height + this._cardSpacing.y;
        }
    }
    
    _shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}

Board.STATES = {
    EMPTY: 0,
    SPYMASTER_BLUE: 1,
    SPYMASTER_RED: 2,
    GUESSER_BLUE: 3,
    GUESSER_RED: 4,
};