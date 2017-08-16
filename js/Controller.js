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
    SPYMASTER: 2,
    GUESSER: 3,
    TRANSITION: 4
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

        Events.on(Controller.HomeState.EVENTS.GOTO_STARTING, this._gotoStarting, this, false);
    }

    start() {
        console.log("Starting Home State");
        this._home = new Home(canvas);
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
        const boardTopLeft = new Coordinate(10, 10);
        const boardSize = new Size(canvas._canvas.width - 20, canvas._canvas.height - 20);
        this._controller.board = new Board(canvas, boardTopLeft, boardSize);

        this._controller.state = new Controller.SpyMasterState(Controller.SpyMasterState.TYPE.RED);
    }

    finish() {
        console.log("Finishing Starting State");
    }
};

Controller.SpyMasterState = class extends Controller.State {
    constructor(type) {
        super(Controller.STATES.SPYMASTER);
        this._type = type;
        
        Events.on(Controller.SpyMasterState.EVENTS.GOTO_TRANSITION, this._gotoTransition, this, false);
    }

    start() {
        console.log("Starting SpyMaster State");
        const type = (this._type === Controller.SpyMasterState.TYPE.RED) ? Playing.TYPE.RED : Playing.TYPE.BLUE;
        this._spyMaster = new SpyMaster(canvas, this._controller.board, type);
    }

    finish() {
        console.log("Finishing SpyMaster State");
        this._spyMaster.remove();
        
        Events.off(Controller.SpyMasterState.EVENTS.GOTO_TRANSITION, this);
    }
    
    _gotoTransition() {
        const goto = (this._type === Controller.SpyMasterState.TYPE.RED) ?
            Controller.TransitionState.TYPE.GOTO_RED_GUESSER : 
            Controller.TransitionState.TYPE.GOTO_BLUE_GUESSER;
        
        this._controller.state = new Controller.TransitionState(goto);
    }
};

Controller.SpyMasterState.EVENTS = {
    GOTO_TRANSITION: "spymasterstate-goto_transition"
};

Controller.SpyMasterState.TYPE = {
    RED: 0,
    BLUE: 1
};

Controller.GuesserState = class extends Controller.State {
    constructor(type) {
        super(Controller.STATES.GUESSER);
        this._type = type;
        
        Events.on(Controller.GuesserState.EVENTS.GOTO_TRANSITION, this._gotoTransition, this, false);
        Events.on(Controller.GuesserState.EVENTS.GOTO_WIN, this._gotoWin, this, false);
    }

    start() {
        console.log("Starting Guesser State");
        const type = (this._type === Controller.GuesserState.TYPE.RED) ? Playing.TYPE.RED : Playing.TYPE.BLUE;
        this._guesser = new Guesser(canvas, this._controller.board, type);
    }

    finish() {
        console.log("Finishing Guesser State");
        this._guesser.remove();
        
        Events.off(Controller.GuesserState.EVENTS.GOTO_TRANSITION, this);
    }
    
    _gotoTransition() {
        const goto = (this._type === Controller.GuesserState.TYPE.RED) ?
            Controller.TransitionState.TYPE.GOTO_BLUE_SPYMASTER : 
            Controller.TransitionState.TYPE.GOTO_RED_SPYMASTER;
        
        this._controller.state = new Controller.TransitionState(goto);
    }

    _gotoWin(type) {
        // Type in this case is either Win.TYPE.RED_WIN or Win.TYPE.BLUE_WIN
        this._controller.state = new Controller.WinState(type);
    }
};

Controller.GuesserState.EVENTS = {
    GOTO_TRANSITION: "guesserstate-goto_transition",
    GOTO_WIN: "guesserstate-goto_win"
};

Controller.GuesserState.TYPE = {
    RED: 0,
    BLUE: 1
};


Controller.TransitionState = class extends Controller.State {
    constructor(type) {
        super(Controller.STATES.TRANSITION);
        this._type = type;
        
        Events.on(Controller.TransitionState.EVENTS.LEAVE_TRANSITION, this._leaveTransition, this, false);
    }
    
    start() {
        console.log("Starting Transition State");
        this._transition = new Transition(canvas, this._type);
    }
    
    finish() {
        console.log("Finishing Transition State");
        this._transition.remove();
        
        Events.off(Controller.TransitionState.EVENTS.LEAVE_TRANSITION, this);
    }
    
    _leaveTransition() {
        switch(this._type) {
            case Controller.TransitionState.TYPE.GOTO_RED_SPYMASTER:
                this._controller.state = new Controller.SpyMasterState(Controller.SpyMasterState.TYPE.RED);
                break;
            case Controller.TransitionState.TYPE.GOTO_BLUE_SPYMASTER:
                this._controller.state = new Controller.SpyMasterState(Controller.SpyMasterState.TYPE.BLUE);
                break;
            case Controller.TransitionState.TYPE.GOTO_RED_GUESSER:
                this._controller.state = new Controller.GuesserState(Controller.GuesserState.TYPE.RED);
                break;
            case Controller.TransitionState.TYPE.GOTO_BLUE_GUESSER:
                this._controller.state = new Controller.GuesserState(Controller.GuesserState.TYPE.BLUE);
                break;
        }
        
    }
};

Controller.TransitionState.EVENTS = {
    LEAVE_TRANSITION: "transitionstate-leave_transition"  
};

Controller.TransitionState.TYPE = {
    GOTO_RED_SPYMASTER: 0,
    GOTO_BLUE_SPYMASTER: 1,
    GOTO_RED_GUESSER: 2,
    GOTO_BLUE_GUESSER: 3
};

Controller.WinState = class extends Controller.State {
    constructor(type) {
        super(Controller.STATES.TRANSITION);
        this._type = type;

        Events.on(Controller.WinState.EVENTS.LEAVE_WIN, this._leaveWin, this, false);
    }

    start() {
        console.log("Starting Win State");
        this._transition = new Win(canvas, this._type);
    }

    finish() {
        console.log("Finishing Win State");
        this._transition.remove();

        Events.off(Controller.WinState.EVENTS.LEAVE_WIN, this);
    }

    _leaveWin() {

    }
};

Controller.WinState.EVENTS = {
    LEAVE_WIN: "winstate-leave_win"
};

Controller.WinState.TYPE = {
    WIN_RED: 0,
    WIN_BLUE: 1
};