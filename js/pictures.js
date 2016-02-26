
/* global Photo: true */

'use strict';

(function() {
  var container = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var loadedPictures = [];
  var filteredPictures = [];
  var renderedPhotos = [];
  var activeFilter = 'filter-popular';
  var currentPage = 0;
  var PAGE_SIZE = 12;
  var scrollTimeout;

  filters.classList.add('hidden');
  container.classList.add('pictures-loading');

  window.addEventListener('scroll', fillPage);
  window.addEventListener('resize', fillPage);

  filteredPictures = loadedPictures.slice(0);
  getPictures();

  filters.addEventListener('click', function(event) {
    var clickedElement = event.target;
    if (clickedElement.classList.contains('filters-radio')) {
      setActiveFilter(clickedElement.id);
    }
  });

  function fillPage() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      var footerCoordinates = container.getBoundingClientRect();
      var viewportSize = window.innerHeight;
      if (footerCoordinates.bottom - viewportSize <= footerCoordinates.height) {
        if (currentPage < Math.ceil(filteredPictures.length / PAGE_SIZE)) {
          renderPhoto(filteredPictures, ++currentPage);
        }
      }
    }, 100);
  }

  function setActiveFilter(id) {
    filteredPictures = loadedPictures.slice(0);
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
    renderPhoto(filteredPictures, 0, true);
  }

  function renderPhoto(pictures, pageNumber, replace) {
    if (replace) {
      var el;
      while ((el = renderedPhotos.shift())) {
        container.removeChild(el.element);
        el.onClick = null;
        el.remove();
      }
    }

    var fragment = document.createDocumentFragment();
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePicture = pictures.slice(from, to);

    pagePicture.forEach(function(photo) {
      var photoElement = new Photo(photo);
      photoElement.render();
      fragment.appendChild(photoElement.element);
      renderedPhotos.push(photoElement);
    });
    container.appendChild(fragment);
    container.classList.remove('pictures-loading');
  }

  function getPictures() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://o0.github.io/assets/json/pictures.json');
    xhr.timeout = 10000;
    xhr.ontimeout = function() {
      loadedPictures.classList.add('picture-load-failure');
    };

    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      loadedPictures = JSON.parse(rawData);
      setActiveFilter(activeFilter);
    };

    xhr.onerror = function() {
      loadedPictures.classList.add('picture-load-failure');
    };
    xhr.send();
  }

  filters.classList.remove('hidden');
})();
