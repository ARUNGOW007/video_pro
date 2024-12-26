import Route from '@ember/routing/route';

export default class VideosRoute extends Route {
  async model() {
    const res = await fetch(
      'http://localhost:8080/VideoExplorer_war_exploded/',
    );
    const videos = await res.json();
    return videos.map((video) => ({
      name: video.name,
      url: video.url.replace('view', 'thumbnail'),
      processed: false,
    }));
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    setTimeout(() => {
      this.loadThumbnails(model);
    }, 0);
  }

  loadThumbnails(videos) {
    window.addEventListener('scroll', () => {
      videos.forEach((video) => {
        const canvas = document.getElementById(`canvas-${video.name}`);
        if (canvas && this.isInViewport(canvas) && !video.processed) {
          this.generateThumbnail(video, canvas);
          video.processed = true;
        }
      });
    });

    videos.forEach((video) => {
      const canvas = document.getElementById(`canvas-${video.name}`);
      if (canvas && this.isInViewport(canvas) && !video.processed) {
        this.generateThumbnail(video, canvas);
        video.processed = true;
      }
    });
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight + 100;
  }

  generateThumbnail(video, canvas) {
    if (!canvas) return;
    const videoElement = document.createElement('video');
    videoElement.src = video.url;
    videoElement.muted = true;
    videoElement.style.display = 'none';

    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.currentTime = 1;
    });
    videoElement.addEventListener('seeked', () => {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      videoElement.remove();
    });
  }
}
