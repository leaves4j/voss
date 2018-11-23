// import assert from 'assert';
import watch from '../../lib/observe/watch.js';
import makeObservable from '../../lib/observable/index.js';

describe('@voss/observe/lib/observe/autorun.js', () => {
  it('should be able to observe changes in values', (done) => {
    const observedUser = makeObservable({ age: 1 });
    watch(() => observedUser.age, () => done());
    observedUser.age = 3;
  });
});
