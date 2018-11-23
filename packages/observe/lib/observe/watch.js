import pubsub from '../pubsub.js';

export default function watch(func, callback, options) {
  try {
    pubsub.setCurrentSubscriber(callback, options);
    func();
  } catch (error) {
    throw error;
  } finally {
    pubsub.removeCurrentSubscriber();
  }
}
