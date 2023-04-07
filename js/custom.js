// nav

$('#menu-toggle').on('click', () => {
  if ($('#popup-overlay').is(':hidden')) {
    $('#popup-overlay').toggle(500);
    $('#popup-bg').toggle(700);
  } else {
    $('#popup-overlay').toggle(300);
    $('#popup-bg').toggle(300);
  }
  $('#menu-toggle').toggleClass('open');
});
$('#popup-overlay').on('click', () => {
  $('#popup-overlay').toggle(300);
  $('#popup-bg').toggle(300);
  $('#menu-toggle').toggleClass('open');
});

// slick
$(document).ready(function () {
  $('.mv').slick({
    // dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 4000,
  });
  $('.about-slide').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
  });
});

// campaign
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (let i = 1; i < 5; i++) {
  $('#' + i).on('click', () => {
    $('#canvas' + i).toggle();
    $('#' + i).toggleClass('on');
    $('#canvas' + i).css('top', getRandom(0, $('#canvas').innerHeight() - $('#canvas' + i).height()));
    $('#canvas' + i).css('left', getRandom(0, $('#canvas').innerWidth() - $('#canvas' + i).width()));
  });

  $('#canvas' + i).mousedown(function (event) {
    $('#canvas' + i).css('z-index', 100);

    function moveAt(a, b) {
      $('#canvas' + i).css('left', a - $('#canvas' + i).width() / 2);
      $('#canvas' + i).css('top', b - $('#canvas' + i).height() / 2);
      // console.log(a, $('#canvas' + i).width() / 2);
    }
    function onMouseMove(event) {
      moveAt(event.clientX - canvas.getBoundingClientRect().x, event.clientY - canvas.getBoundingClientRect().y);
    }

    $('#canvas').mousemove(onMouseMove);
    $('#canvas').mouseup(function () {
      $('#canvas').off('mousemove');
      $('#canvas' + i).off('mouseup');
    });
  });

  $('#canvas' + i).on('dragstart', function () {
    return false;
  });
}

$('#ok').on('click', () => {
  html2canvas(document.querySelector('#canvas')).then((canvas) => {
    let imgData = canvas.toDataURL();
    document.getElementById('result').src = canvas.toDataURL();
    document.getElementById('ss').href = imgData;
  });
  $('.result-group').toggle();
});
$('#close').on('click', () => {
  $('.result-group').toggle();
});

var moving;
// 1スクロールの移動距離
var speed = 2;

$(window).scroll(function () {
  var scroll = $(this).scrollTop();
  if (
    scroll > $('#menu').offset().top - 20 &&
    $('#menu-box').scrollLeft() < $('#menu-contents').width() - $(window).innerWidth()
  ) {
    $('#menu-box').mousewheel(function (event, mov) {
      var moving = $('#menu-box').scrollLeft() - mov * speed;
      // スクロールする
      $('#menu-box').scrollLeft(moving);
      // 縦スクロールさせない
      // return false;
      $('body').css('overflow', 'hidden');
      console.log(false, $('#menu-box').scrollLeft(), $('#menu-contents').width() - $(window).innerWidth());
    });
    // } else if (scroll > $('#info').offset().top + 20) {
    //   $('body').css('overflow', 'scroll');
  } else {
    $('body').css('overflow', 'scroll');
  }

  // 逆
  if (scroll < $('#menu').offset().top && $('#menu-box').scrollLeft() == 0) {
    $('body').css('overflow', 'scroll');
  }
});

$('#menu-box').scroll(function () {
  if ($('#menu-box').scrollLeft() > $('#menu-contents').width() - $(window).innerWidth()) {
    $('#menu-box').mousewheel(function (event, mov) {
      $('body').css('overflow', 'scroll');
      // return true;
    });
  }
});
