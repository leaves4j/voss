export class MicroTask {
  _queue = [];

  _pending = false;

  next(task) { // TODO support priority
    if (!task) return;
    if (!this._pending) {
      this._pending = true;
      Promise.resolve().then(() => {
        this._queue.forEach(resolve => resolve());
        this._queue = [];
        this._pending = false;
      });
    }
    this._queue.push(task);
  }

  nextTick() {
    return new Promise(resolve => this.next(resolve));
  }
}

export default new MicroTask();
