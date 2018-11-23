import pubsub from '../pubsub.js';

export default function autorun(func) {
  function autorunExecutor() {
    try {
      pubsub.setCurrentSubscriber(autorunExecutor);
      func();
    } catch (error) {
      throw error;
    } finally {
      pubsub.removeCurrentSubscriber();
    }
  }
  autorunExecutor();
}
