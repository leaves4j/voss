import pubSub from '../pubsub.js';

export default function computed(element) {
  let cachedValue;
  let isDirty = true;
  const handler = () => {
    isDirty = true;
    pubSub.publish(this, element.key);
  };
  const descriptor = {
    ...element.descriptor,
    get() {
      if (isDirty) {
        pubSub.setCurrentSubscriber(handler, { immediately: true });
        cachedValue = element.descriptor.get();
        isDirty = false;
        pubSub.removeCurrentSubscriber();
      }

      pubSub.subscribe(this, element.key);
      return cachedValue;
    },
  };

  return {
    ...element,
    descriptor,
  };
}
