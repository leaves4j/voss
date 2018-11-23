import { queueMicrotask } from '@voss/utils';

export class PubSub {
  _eventSubs = new EventSubMap();// eslint-disable-line no-use-before-define

  _immediateEventSubs = new EventSubMap(); // eslint-disable-line no-use-before-define

  _subQueue = new Map();

  _currentSubStack = [];

  get currentSubscriber() {
    return this._currentSubStack[this._currentSubStack.length - 1];
  }

  subscribe(target, key) {
    if (!this.currentSubscriber) return;
    if (this.currentSubscriber.immediately) {
      this._immediateEventSubs.multiSet(target, key, this.currentSubscriber);
    } else {
      this._eventSubs.multiSet(target, key, this.currentSubscriber);
    }
  }

  setCurrentSubscriber(handler, options) {
    this._currentSubStack.push(new Subscriber(handler, options));
  }

  removeCurrentSubscriber() {
    this._currentSubStack.pop();
  }

  publish(target, key, value) {
    const immediateSubscribers = this._immediateEventSubs.get(target, key);
    if (immediateSubscribers !== undefined) {
      immediateSubscribers.forEach(subscriber => subscriber.handler(value));
    }

    const subscribers = this._eventSubs.get(target, key);
    if (subscribers === undefined) return;

    this._enqueue(subscribers, value);
    if (this._subQueue.size === 1) {
      queueMicrotask(() => this._flushQueue());
    }
  }

  _enqueue(subscribers, value) {
    subscribers.forEach((subscriber) => {
      this._subQueue.set(subscriber, value);
    });
  }

  _flushQueue() {
    this._subQueue.forEach((v, subscriber) => subscriber.handler(v));
    this._subQueue.clear();
  }
}


class EventSubMap {
  _storage = new WeakMap();

  multiSet(target, key, value) {
    let keyValues = this._storage.get(target);
    if (keyValues === undefined) {
      keyValues = new Map();
      this._storage.set(target, keyValues);
    }
    let values = keyValues.get(key);
    if (values === undefined) {
      values = new Set();
      keyValues.set(key, values);
    }
    values.add(value);
  }

  get(target, key) {
    const keyValues = this._storage.get(target);
    if (keyValues === undefined) return undefined;
    const values = keyValues.get(key);
    return values;
  }
}

class Subscriber {
  _handler=() => {}

  _options = {
    immediately: false,
  }

  constructor(handler, options) {
    this._handler = handler;
    Object.assign(this._options, options);
  }

  get immediately() {
    return this._options.immediately;
  }

  handler(value) {
    try {
      this._handler(value);
    } catch (error) {
      // todo
    }
  }
}

export default new PubSub();
