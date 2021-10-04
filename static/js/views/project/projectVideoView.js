import View from '../View.js';

class ProjectVideoView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project-detail');
    this._parentElement = this._parentElement.querySelector('.part-three');
  }

  _buildVideoFrame(url) {
    return `
    <div class="page-content-header">
      <h4 class="sub-heading"><span>VIDEO</span> <span class="text secondary--type">Demo</span></h4>				
    </div>		
    <div class="project--video-demo">
      <iframe src="${url}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    `;
  }

  _generateSkeletonMarkup() {
    return `
    <div class="skeleton-text w-half mx-auto"></div>
    <div class="skeleton w-100 mb-3">
      <div class="display-card--img social-link--img skeleton-image" style="height:300px"></div>
    </div>
    `;
  }

  _generateMarkup() {
    // Destructure _data
    const [video_url] = this._data;

    if (!video_url) return '';
    return this._buildVideoFrame(video_url);
  }
}

export default new ProjectVideoView();
