class Events {
	static on(eventType, handler, owner, reset=true) {
        if (reset) {
            if (eventType in Events.eventsReset) {
                Events.eventsReset[eventType].push([handler, owner]);
            } else {
                Events.eventsReset[eventType] = [[handler, owner]];
            }
        } else {
            if (eventType in Events.events) {
                Events.events[eventType].push([handler, owner]);
            } else {
                Events.events[eventType] = [[handler, owner]];
            }
        }
	}

	static off(eventType, owner) {
		if (eventType in Events.events) {
		    let indexToRemove = -1;
			for (let i in Events.events[eventType]) {
                if (Events.events[eventType][i][1] === owner) {
                    indexToRemove = i;
                }
            }
            Events.events[eventType].splice(indexToRemove, 1);

			if (Events.events[eventType].length === 0) {
			    delete Events.events[eventType];
            }
		}

        if (eventType in Events.eventsReset) {
            let indexToRemove = -1;
            for (let i in Events.eventsReset[eventType]) {
                if (Events.eventsReset[eventType][i][0] === owner) {
                    indexToRemove = i;
                }
            }
            Events.eventsReset[eventType].splice(indexToRemove, 1);

            if (Events.eventsReset[eventType].length === 0) {
                delete Events.eventsReset[eventType];
            }
        }
	}

	static dispatch(eventType, ...data) {
		if (eventType in Events.events) {
            for (let [handler, owner] of Events.events[eventType]) {
                if (handler) handler.call(owner, ...data);
            }
		}

        if (eventType in Events.eventsReset) {
            for (let [handler, owner] of Events.eventsReset[eventType]) {
                if (handler) handler.call(owner, ...data);
            }
        }
	}

	static clearReset() {
	    Events.eventsReset = {};
    }
}

Events.events = {};
Events.eventsReset = {};