import assert from 'assert';
import idMarker from '../lib/id_maker.js';

describe('@voss/utils/lib/id_marker.js', () => {
  it('should work', () => {
    assert.notEqual(idMarker(), idMarker());
  });
});
