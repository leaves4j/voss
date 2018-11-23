import { isPlainObject } from '@voss/utils';
import createObservableArray from './array.js';
import createObservableObject from './object.js';

const observableTargets = new WeakMap();

export default function makeObservable(target) {
  if (target[Symbol.for('observable.origin')]) return target;

  let observable = observableTargets.get(target);
  if (observable !== undefined) return observable;

  if (Array.isArray(target)) {
    observable = createObservableArray(target, makeObservable);
    observableTargets.set(target, observable);
    return observable;
  }
  if (isPlainObject(target)) {
    observable = createObservableObject(target, makeObservable);
    observableTargets.set(target, observable);
    return observable;
  }
  return target;
}
