import { helper } from '@ember/component/helper';

export default helper(function removeExtension([videoName]) {
  return videoName.replace('.mp4', '');
});
