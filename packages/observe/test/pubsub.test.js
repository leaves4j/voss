import assert from 'assert';
import { queueMicrotask } from '@voss/utils';
import { PubSub } from '../lib/pubsub.js';

describe('@voss/observe/lib/pubsub.js', () => {
  it('should be ok with base usage', (done) => {
    const pubsub = new PubSub();
    const target = { name: 'xx' };
    pubsub.setCurrentSubscriber(done);
    pubsub.subscribe(target, 'name');
    pubsub.publish(target, 'name');
  });

  it('should be ok with multiple event', (done) => {
    const pubsub = new PubSub();
    const target = { name: 'xx' };
    pubsub.setCurrentSubscriber(() => done('Should not trigger'));
    pubsub.subscribe(target, 'name');
    pubsub.publish(target, 'hhh');
    queueMicrotask(() => done());
  });

  it('should be triggered once when multiple event names are the same', (done) => {
    const pubsub = new PubSub();
    const target = { name: 'xx' };
    pubsub.setCurrentSubscriber(() => done());

    pubsub.subscribe(target, 'name');
    pubsub.publish(target, 'name');
    pubsub.publish(target, 'name');
  });

  it('should get the last value when multiple event names are the same', (done) => {
    const pubsub = new PubSub();

    const target = { name: 'xx' };
    pubsub.setCurrentSubscriber((v) => {
      assert.equal(v, 2);
      done();
    });
    pubsub.subscribe(target, 'name');
    pubsub.publish(target, 'name', 1);
    pubsub.publish(target, 'name', 1);
    pubsub.publish(target, 'name', 2);
  });
});
