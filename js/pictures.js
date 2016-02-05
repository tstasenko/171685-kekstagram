
'use strict';

(function() {

  var container = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');
  pictures.forEach(function(picture) {
    var element = getObjectFromTemplate(picture);
    container.appendChild(element);
  });


  function getObjectFromTemplate(data) {
    var template = document.querySelector('#picture-template');
    var element = template.content.children[0].cloneNode(true);
    var IMAGE_TIMEOUT = 10000;

    element.querySelector('.picture-comments').textContent = data.comments;
    element.querySelector('.picture-likes').textContent = data.likes;

    var previewImage = new Image(182, 182);

    previewImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.replaceChild(previewImage, element.querySelector('img'));
    };

    previewImage.onerror = function() {
      element.classList.add('picture-load-failure');
    };

    previewImage.src = data.url;

    var imageLoadTimeout = setTimeout(function() {
      previewImage.src = '';
      element.classList.add('picture-load-failure');
    }, IMAGE_TIMEOUT);

    return element;
  }
})();
