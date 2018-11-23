let queueMicrotaskPolyfill; // eslint-disable-line import/no-mutable-exports
/* istanbul ignore if */
if (typeof queueMicrotask !== 'undefined') {
  queueMicrotaskPolyfill = queueMicrotask; // eslint-disable-line no-undef
} else {
  queueMicrotaskPolyfill = function queueMicrotask(f) {
    Promise.resolve().then(f);
  };
}
export default queueMicrotaskPolyfill;
