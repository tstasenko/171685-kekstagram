function getMessage(a, b) {
  if (typeof a == 'boolean')
  {
    if (a) {
      return 'Переданное GIF-изображение анимировано и содержит '+ b + ' кадров';
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  }

  if (typeof a == 'number')
{
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b*4 + ' аттрибутов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length == b.length) {
      var square = a.map(function(a, i){return a*b[i]}).reduce(function(prev,value){return prev + value });
      return 'Общая площадь артефактов сжатия: ' + square + ' пикселей'
    }
  }

  if (Array.isArray(a)) {
    var sum = a.reduce(function(prev, value){ return prev + value });

    return 'Количество красных точек во всех строчках изображения: ' + sum;
  }


}

