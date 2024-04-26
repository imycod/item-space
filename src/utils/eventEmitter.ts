const eventNames = ['API:UN_AUTHORIZED', 'API:VALIDATION_ERROR'] as const;

type EventName = typeof eventNames[number];

class EventEmitter {
	private listeners: { [key in EventName]?: Set<Function> } = {
		'API:UN_AUTHORIZED': new Set(),
		'API:VALIDATION_ERROR': new Set(),
	};

	on(eventName: EventName, listener: () => void) {
		this.listeners[eventName].add(listener);
	}

	emit(eventName: EventName, ...args: any[]) {
		this.listeners[eventName]?.forEach((listener) => listener(...args));
	}
}

export default new EventEmitter();