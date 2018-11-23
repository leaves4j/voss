import assert from 'assert';
import autorun from '../../lib/observe/autorun.js';
import makeObservable from '../../lib/observable/index.js';

describe('@voss/observe/lib/observe/autorun.js', () => {
  it('should be able to observe changes in values', (done) => {
    const observedUser = makeObservable({ age: 1 });
    let counter = 0;
    autorun(() => {
      assert(counter <= 1);
      const m = observedUser.age;
      if (counter === 1) {
        assert.equal(observedUser.age, 3);
        done();
      }
      counter++;
    });
    observedUser.age = 3;
  });
});
