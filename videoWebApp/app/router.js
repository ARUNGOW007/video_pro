import EmberRouter from '@ember/routing/router';

export default class Router extends EmberRouter {}

Router.map(function () {
  this.route('videos', { path: '/' });
  this.route('view', { path: '/view/:video' });
});
