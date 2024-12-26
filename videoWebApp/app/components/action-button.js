import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ActionButton extends Component {
  @tracked isPlaying = false;
  @tracked isReversing = false;
  @tracked selectedSpeed = 1;
  @tracked isDropdown = false;
  reverseInterval = null;

  // Ensure video is initialized correctly
  get video() {
    return document.querySelector('#video-player');
  }

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
        video.playbackRate = Math.abs(this.selectedSpeed);
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
    let lastTime = null;

    const reverseFrame = (timestamp) => {
      if (!this.isReversing) return; // Stop if reversing is disabled

      if (lastTime === null) {
        lastTime = timestamp;
      }

      const elapsed = (timestamp - lastTime) / 1000; // Convert elapsed time to seconds
      const decrement = elapsed * speed; // Calculate how much to rewind based on speed

      if (video.currentTime <= 0) {
        this.stopReverse(); // Stop if the start of the video is reached
      } else {
        video.currentTime = Math.max(0, video.currentTime - decrement); // Update the currentTime
        lastTime = timestamp; // Update lastTime for the next frame
        requestAnimationFrame(reverseFrame); // Schedule the next frame
      }
    };
    requestAnimationFrame(reverseFrame); // Start the reverse playback loop
  }

  stopReverse() {
    if (this.video) {
      this.isReversing = false;
      clearInterval(this.reverseInterval); // Stop the interval
      this.reverseInterval = null;
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

  get reverseButtonLabel() {
    return this.isReversing ? 'Stop Reverse' : 'Reverse';
  }

  get speedOptions() {
    return [0.5, 1, 1.5, 2];
  }

  isSelected(speed) {
    return this.selectedSpeed === speed;
  }
}
