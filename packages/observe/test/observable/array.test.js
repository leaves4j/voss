import pubsub from '../../lib/pubsub.js';
import createObservableArray from '../../lib/observable/array.js';

describe('@voss/observe/lib/observable/array.js', () => {
  it('should be able to observe changes in values', (done) => {
    const arr = createObservableArray([1, 2, 3], t => t);
    pubsub.setCurrentSubscriber(done);
    const b = arr[1]; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    arr[1] = 2;
  });
  it('should be able to observe changes in the order of the array', (done) => {
    const arr = createObservableArray([1, 2, 3], t => t);
    pubsub.setCurrentSubscriber(done);
    const m = arr[0]; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    arr.sort((a, b) => b - a);
  });
});
