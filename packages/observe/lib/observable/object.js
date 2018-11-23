import pubsub from '../pubsub.js';

const observableOrigin = Symbol.for('observable.origin');

export default function createObservableObject(element, makeObservable) {
  return new Proxy(element, {
    get(target, key, receiver) {
      if (typeof key === 'symbol' && key === observableOrigin) {
        return element;
      }
      if (key in Object.prototype) {
        return Reflect.get(target, key, receiver);
      }

      pubsub.subscribe(element, key);
      return makeObservable(Reflect.get(target, key, receiver));
    },
    set(target, key, value, receiver) {
      if (typeof value === 'object') {
        const origin = value[observableOrigin];
        if (origin) {
          return Reflect.set(target, key, origin, receiver);
        }
      }

      pubsub.publish(element, key);
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      pubsub.publish(element, key);
      return Reflect.deleteProperty(target, key);
    },
  });
}
