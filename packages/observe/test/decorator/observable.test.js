import observable from '../../lib/decorator/observable.js';
import pubsub from '../../lib/pubsub.js';

describe('@voss/observe/lib/decorator/observable.js', () => {
  it('should be ok', (done) => {
    class Test {
      @observable age;
    }
    const t = new Test();
    pubsub.setCurrentSubscriber(done);
    const b = t.age; // eslint-disable-line no-unused-vars
    pubsub.removeCurrentSubscriber();
    t.age = 1;
  });
});
