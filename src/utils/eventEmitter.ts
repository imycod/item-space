const eventNames = ['API:UN_AUTHORIZED', 'API:VALIDATION_ERROR', 'THEME:CHANGE'] as const;

type EventName = typeof eventNames[number];

class EventEmitter {
	private listeners: { [key in EventName]?: Set<Function> } = {
		'API:UN_AUTHORIZED': new Set(),
		'API:VALIDATION_ERROR': new Set(),
		'THEME:CHANGE': new Set(),
	};

	on(eventName: EventName, listener: () => void) {
		this.listeners[eventName].add(listener);
	}

	emit(eventName: EventName, ...args: any[]) {
		this.listeners[eventName]?.forEach((listener) => listener(...args));
	}
	off(eventName: EventName, listener: () => void) {
		this.listeners[eventName].delete(listener);
	}
}

const eventEmitter = new EventEmitter();
export function useEventListener(eventName: EventName, listener: () => void) {
	onMounted(() => {
		eventEmitter.on(eventName, listener);
	});

	onScopeDispose(() => {
		eventEmitter.off(eventName, listener);
	});
}

export default eventEmitter;