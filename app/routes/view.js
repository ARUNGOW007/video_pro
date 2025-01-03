import Route from '@ember/routing/route';

export default class ViewRoute extends Route {
  model(params) {
    params.url = `http://localhost:8080/VideoExplorer_war_exploded/view?video=${params.video}`;
    return params;
  }
}
