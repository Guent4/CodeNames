class Controller {
    constructor() {
        this._state = new Controller.HomeState();
        this._state.controller = this;
    }

    get state() {
        return this._state;
    }

    set state(s) {
        if (this._state) this._state.finish();
        this._state = s;
        this._state.controller = this;
    }
}

Controller.STATES = {
    HOME: 0,
    STARTING: 1,
    SPY_MASTER: 2,
    GUESSER: 3
};

Controller.State = class {
    constructor(type) {
        this._type = type;
    }

    set controller(ctrl) {
        this._controller = ctrl;
        this._controller.state.start();
    }

    start() {
    }

    finish() {
    }
};

Controller.HomeState = class extends Controller.State {
    constructor() {
        super(Controller.STATES.HOME);

        this._home = new Home(canvas);

        Events.on(Controller.HomeState.EVENTS.GOTO_STARTING, this._gotoStarting, this, false);
    }

    start() {
        console.log("Starting Home State");
    }

    finish() {
        console.log("Finishing Home State");
        this._home.remove();
    }

    _gotoStarting() {
        Events.off(Controller.HomeState.EVENTS.GOTO_STARTING, this);

        this._controller.state = new Controller.StartingState();
    }
};

Controller.HomeState.EVENTS = {
    GOTO_STARTING: "homestate-goto_starting"
};

Controller.StartingState = class extends Controller.State {
    constructor() {
        super(Controller.STATES.STARTING);
    }

    start() {
        console.log("Starting Starting State");

        // Create the board
        this._controller.board = new Board(canvas);

        this._controller.state = new Controller.SpyMasterSate();
    }

    finish() {
        console.log("Finishing Starting State");
    }
};

Controller.SpyMasterSate = class extends Controller.State {
    constructor() {
        super(Controller.STATES.SPY_MASTER);
    }

    start() {
        console.log("Starting SpyMaster State");
        this._spyMaster = new SpyMaster(canvas, this._controller.board);
    }

    finish() {
        console.log("Finishing SpyMaster State")
    }
};