import { MicroTask } from '../lib/micro_task.js';

describe('@voss/utils/lib/micro_task.js', () => {
  it('should be ok exec next', (done) => {
    const microTask = new MicroTask();
    let flag = false;
    microTask.next(() => {
      flag = true;
      done();
    });
    Promise.resolve().then(() => {
      if (!flag)done('Should not emit');
    });
  });


  it('should be ok exec nextTick', (done) => {
    const microTask = new MicroTask();
    let flag = false;
    microTask.next(() => {
      flag = true;
      done();
    });
    microTask.nextTick().then(() => {
      if (!flag)done('Should not emit');
    });
  });
});
