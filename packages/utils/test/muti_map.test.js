import assert from 'assert';
import MutiMap from '../lib/muti_map.js';


describe('@voss/utils/lib/muti_map.js', () => {
  it('should be ok when add item', () => {
    const map = new MutiMap();
    map.set(1, 2);
    map.set(1, 3);
    map.set(2, 3);
    const set1 = map.get(1);
    assert(set1.has(2));
    assert(set1.has(3));
    const setReserved = map.reserve().get(3);
    assert(setReserved.has(2));
    assert(setReserved.has(1));
  });
  it('should be ok when delete item', () => {
    const map = new MutiMap();
    map.set(1, 2);
    map.set(1, 3);
    map.set(2, 3);
    map.set(2, 5);

    map.delete(2, 1);
    map.delete(3);
    assert.equal(map.size, 2);
    assert.equal(map.reserve().size, 3);

    map.delete(2, 5);
    assert.equal(map.size, 2);
    assert.equal(map.get(2).size, 1);

    map.delete(1);
    const mapReserved = map.reserve();
    assert.equal(map.size, 1);
    assert(map.get(2).has(3));
    assert.equal(mapReserved.size, 1);
    assert(mapReserved.has(3));

    mapReserved.delete(3);
    assert.equal(map.size, 0);
  });
  it('should be ok when clear', () => {
    const map = new MutiMap();
    map.set(1, 2);
    map.set(1, 3);
    map.set(2, 3);
    assert.equal(map.size, 2);
    map.clear();
    const mapReserved = map.reserve();
    assert.equal(map.size, 0);
    assert.equal(mapReserved.size, 0);
  });
});
