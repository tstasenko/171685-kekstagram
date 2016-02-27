'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.gallery-overlay');
    this._closeButton = this.element.querySelector('.gallery-overlay-close');
    this._galleryImage = this.element.querySelector('.gallery-overlay-image');
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onPhotoClick = this._onPhotoClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  };

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');
    this._closeButton.addEventListener('click', this._onCloseClick);
    window.addEventListener('keyup', this._onDocumentKeyDown);
    this._galleryImage.addEventListener('click', this._onPhotoClick);
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keyup', this._onDocumentKeyDown);
  };
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onPhotoClick = function() {
   console.log(1);
  };
  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
  };

  window.Gallery = Gallery;

})();
