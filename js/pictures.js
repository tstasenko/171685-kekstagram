'use strict';

(function() {
  var container = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var loadedPictures = [];
  var activeFilter = 'filter-popular';

  filters.classList.add('hidden');
  container.classList.add('pictures-loading');

  getPictures();

  filters.onclick = function(evt) {
    setActiveFilter(evt.target.id);
  };

  function setActiveFilter(id) {
    var filteredPictures = loadedPictures.slice(0);
    var sortingFunction;
    switch (id) {
      case 'filter-discussed':
        sortingFunction = function(a, b) {
          return b.comments - a.comments;
        };
        break;
      case 'filter-new':
        filteredPictures = filteredPictures.filter(function(picture) {
          return new Date(picture.date) > (Date.now() - 14 * 24 * 60 * 60 * 1000);
        });
        sortingFunction = function(a, b) {
          return new Date(b.date) - new Date(a.date);
        };
        break;
      case 'filter-popular':
        sortingFunction = function(a, b) {
          return b.likes - a.likes;
        };
        break;
    }
    filteredPictures = filteredPictures.sort(sortingFunction);
    activeFilter = id;
    renderPhoto(filteredPictures);
  }

  function renderPhoto(pictures) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    pictures.forEach(function(picture) {
      var element = getObjectFromTemplate(picture);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
    container.classList.remove('pictures-loading');
  }


  function getPictures() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://o0.github.io/assets/json/pictures.json');

    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      loadedPictures = JSON.parse(rawData);
      setActiveFilter(activeFilter);
    };
    xhr.send();
  }

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


  filters.classList.remove('hidden');
})();
