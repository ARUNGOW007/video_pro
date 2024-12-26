import Route from '@ember/routing/route';

export default class ViewRoute extends Route {
  model(params) {
    return fetch('http://localhost:8080/VideoExplorer_war_exploded/')
      .then((response) => response.json())
      .then((data) => {
        const video = data.find((vid) => vid.name === params.video);
        if (video) {
          video.url = `http://localhost:8080/VideoExplorer_war_exploded/view?video=${video.name}`;
        }
        return video;
      });
  }
}
