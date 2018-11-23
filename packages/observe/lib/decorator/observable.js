import pubSub from '../pubsub.js';
import makeObservable from '../observable/index.js';

export default function observable(element) {
  // assert(element.kind === 'field');
  // assert(element.placement === 'own');

  const underlyingKey = `_${element.key}`; // TODO change private
  const underlying = {
    ...element,
    descriptor: {
      ...element.descriptor,
      enumerable: false,
      configurable: false,
    },
    key: underlyingKey,
    initializer: element.initializer === undefined
      ? undefined
      : () => makeObservable(element.initializer()),
  };
  const descriptor = {
    enumerable: true,
    configurable: true,
    get() {
      pubSub.subscribe(this, element.key);
      return this[underlyingKey];
    },
    set(val) {
      if (this[underlyingKey] === val) return;
      pubSub.publish(this, element.key);
      this[underlyingKey] = makeObservable(val);
    },
  };

  return {
    key: element.key,
    kind: 'method',
    placement: 'prototype',
    descriptor,
    extras: [underlying],
  };
}
