function getMessage(a, b) {
  if (typeof a == 'boolean')
  {
        if (a == true) {
        return 'Переданное GIF-изображение анимировано и содержит '+ b + ' кадров';
      }
       else {
        return 'Переданное GIF-изображение не анимировано';
      }
  }

  if (typeof a == 'number')
{
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b*4 + ' аттрибутов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var arr = [];
    for (i=0; i < a.length; i++) {
      arr.push(a[i]*b[i]);
    }
    var square = arr.reduce(function(prev,value){return prev + value });
    return 'Общая площадь артефактов сжатия: ' + square + ' пикселей'
  }

  if (Array.isArray(a)) {
    var sum = a.reduce(function(prev, value){ return prev + value });

    return 'Количество красных точек во всех строчках изображения: ' + sum;
  }


}

