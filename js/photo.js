
'use strict';

(function() {

  function Photo(data) {
    this._data = data;
  }
  Photo.prototype.render = function() {
    var template = document.querySelector('#picture-template');
    this.element = template.content.children[0].cloneNode(true);
    var IMAGE_TIMEOUT = 10000;

    this.element.querySelector('.picture-comments').textContent = this._data.comments;
    this.element.querySelector('.picture-likes').textContent = this._data.likes;

    var previewImage = new Image(182, 182);

    previewImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      this.element.replaceChild(previewImage, this.element.querySelector('img'));
    }.bind(this);

    previewImage.onerror = function() {
      this.element.classList.add('picture-load-failure');
    }.bind(this);

    previewImage.src = this._data.url;

    var imageLoadTimeout = setTimeout(function() {
      previewImage.src = '';
      this.element.classList.add('picture-load-failure');
    }.bind(this), IMAGE_TIMEOUT);

  };

  Photo.prototype.remove = function() {
    this.element.remove();
  };

  window.Photo = Photo;

})();
