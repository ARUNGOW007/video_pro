import { module, test } from 'qunit';
import { setupRenderingTest } from 'video-web-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | skip-button-component', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SkipButtonComponent />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <SkipButtonComponent>
        template block text
      </SkipButtonComponent>
    `);

    assert.dom().hasText('template block text');
  });
});
