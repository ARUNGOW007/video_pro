import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ActionButton extends Component {
  @tracked isPlaying = false;
  @tracked isReversing = false;
  @tracked selectedSpeed = 1;
  @tracked isDropdown = false;
  @tracked zoomFactor = 1;
  reverse = null;
  speedOptions = [0.5, 1, 1.5, 2];

  video = document.querySelector('#video');

  @action
  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
  }

  @action
  speed(times) {
    if (this.isReversing) {
      this.startReverse(times);
    } else if (this.video) {
      this.video.playbackRate = times;
    }
    this.selectedSpeed = times;
    this.isDropdown = false;
  }

  @action
  playVideo() {
    const video = this.video;
    if (video) {
      if (this.isReversing) {
        this.stopReverse();
        video.playbackRate = this.selectedSpeed;
      }

      if (!this.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
      this.isPlaying = !this.isPlaying;

      video.onended = () => {
        this.isPlaying = false;
      };
    }
  }

  @action
  toggleReverse() {
    if (this.video) {
      if (this.isReversing) {
        this.stopReverse();
      } else {
        if (this.isPlaying) {
          this.video.pause();
          this.isPlaying = false;
        }
        this.isReversing = true;
        this.startReverse(this.selectedSpeed);
      }
    }
  }

  startReverse(speed) {
    const video = this.video;
    if (!video) return;

    this.isReversing = true;
    this.reverse = setInterval(() => {
      if (video.currentTime <= 0) {
        this.stopReverse();
      } else {
        video.currentTime -= 0.06 * speed;
      }
    }, 100);
  }

  stopReverse() {
    if (this.video && this.isReversing) {
      this.isReversing = false;
      clearInterval(this.reverse);
    }
  }

  @action
  rewind() {
    const video = this.video;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 5);
    }
  }

  @action
  skip() {
    const video = this.video;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }
  }

  @action
  zoomIn() {
    const video = this.video;
    if (this.zoomFactor <= 2) {
      this.zoomFactor += 0.5;
      video.style.transform = `scale(${this.zoomFactor})`;
    }
  }

  @action
  zoomOut() {
    const video = this.video;
    if (video && this.zoomFactor > 0.5) {
      this.zoomFactor -= 0.5;
      video.style.transform = `scale(${this.zoomFactor})`;
    }
  }
}
