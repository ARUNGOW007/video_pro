import { module, test } from 'qunit';
import { setupTest } from 'video-web-app/tests/helpers';

module('Unit | Route | videos', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:videos');
    assert.ok(route);
  });
});
