const eventNames = ['API:UN_AUTHORIZED', 'API:VALIDATION_ERROR', 'API:NOT_SERVICE_ERROR', 'API:NOT_FOUND', 'API:UN_LOGIN', 'STYLE:REMOVE_CUSTOM_STYLE'] as const;

type EventName = typeof eventNames[number];

class EventEmitter {
    private listeners: { [key in EventName]?: Set<Function> } = {
        'API:UN_AUTHORIZED': new Set(),
        'API:VALIDATION_ERROR': new Set(),
        'API:UN_LOGIN': new Set(), // SSO
        'API:NOT_SERVICE_ERROR': new Set(),
        'STYLE:REMOVE_CUSTOM_STYLE': new Set(),
    };

    on(eventName: EventName, listener: () => void) {
        this.listeners[eventName].add(listener);
    }

    emit(eventName: EventName, ...args: any[]) {
        this.listeners[eventName]?.forEach((listener) => listener(...args));
    }
}

export default new EventEmitter();