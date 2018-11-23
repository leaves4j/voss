import { queueMicrotask } from '@voss/utils';
import pubsub from '../../lib/pubsub.js';
import createObservableObject from '../../lib/observable/object.js';

describe('@voss/observe/lib/observable/object.js', () => {
  it('should be able to observe changes in values', (done) => {
    const obj = createObservableObject({ name: 'a' }, t => t);
    pubsub.setCurrentSubscriber(done);
    const b = obj.name; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    obj.name = 'b';
  });
  it('should not react when unscribed value changed', (done) => {
    const obj = createObservableObject({ name: 'a', age: 2 }, t => t);
    pubsub.setCurrentSubscriber(() => done('should not trigger'));
    const b = obj.name; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    obj.age = 10;
    queueMicrotask(done);
  });

  it('should react when add value', (done) => {
    const obj = createObservableObject({ name: 'a' }, t => t);
    pubsub.setCurrentSubscriber(done);
    const b = obj.age; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    obj.age = 10;
  });

  it('should react when delete value', (done) => {
    const obj = createObservableObject({ name: 'a', age: 1 }, t => t);
    pubsub.setCurrentSubscriber(done);
    const b = obj.age; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    delete obj.age;
  });


  it('should react when delete value', (done) => {
    const obj = createObservableObject({ name: 'a', age: 1 }, t => t);
    pubsub.setCurrentSubscriber(done);
    const b = obj.age; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    delete obj.age;
  });
});
