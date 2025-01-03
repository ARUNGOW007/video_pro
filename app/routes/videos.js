import Route from '@ember/routing/route';

export default class VideosRoute extends Route {
  async model() {
    const res = await fetch(
      'http://localhost:8080/VideoExplorer_war_exploded/',
    );
    let videos = await res.json();
    videos = videos.map((video) => ({
      name: video.name,
      url: video.url,
      processed: false,
    }));
    this.loadThumbnails(videos);
    return videos;
  }

  loadThumbnails(videos) {
    window.addEventListener('transitionend', eventCallback);
    window.addEventListener('scroll', eventCallback);

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    function eventCallback() {
      videos.forEach((video) => {
        const videoContainer = document.getElementById(
          `thumbnail-container-${video.name}`,
        );
        if (!video.processed && isInViewport(videoContainer)) {
          const videoElement = document.createElement('video');
          videoContainer.appendChild(videoElement);
          videoElement.style.position = 'absolute';
          videoElement.style.height = '100%';
          videoElement.style.width = '100%';
          videoElement.src = video.url;
          video.processed = true;
        }
      });
    }
  }
}
