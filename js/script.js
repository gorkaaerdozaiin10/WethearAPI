var splide = new Splide('#image-slider', {
  type: 'loop',
  perPage: 3,
  perMove: 1,
  gap: '0.5rem',
  breakpoints: {
    768: {
      perPage: 2,
    },
    480: {
      perPage: 1,
    },
  },
});

splide.mount();

$(document).ready(function () {
  $(window).resize(function () {
    showMenuBtn();
  });

  $(window).trigger('resize');

  // open menu on mobile
  function showMenuBtn() {
    if ($(window).width() < 1199.98) {
      document.querySelector('header').setAttribute('data-class', 'none');
      $('.open_menu').addClass('d-block');
      $('header nav').addClass('d-none');
      $('.navigation_mobile').removeClass('opened');
    } else {
      $('.open_menu').removeClass('d-block');
      $('header nav').removeClass('d-none');
      $('.navigation_mobile').removeClass('opened');
    }
  }

  $('.open_menu').click(function (event) {
    event.preventDefault();
    $('.navigation_mobile').addClass('opened');
  });

  $('.close_menu, header, section, footer, .navigation_mobile .inner a').click(
    function (event) {
      $('.navigation_mobile').removeClass('opened');
    }
  );

  // Enable AOS plugin (blocks animations)
  if (typeof AOS !== 'undefined' && $('body').hasClass('SFG_body') === false) {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
    setTimeout(function () {
      if ($('.slick-initialized').length > 0) {
        AOS.refreshHard();
      }
    }, 200);
  }

  $('#btnCity').click(() => {
    $('#image-slider').css('display', 'block');
    $('.search').css('display', 'block');
    $(window).scrollTop($('#image-slider').offset().top);
  });
});

let weather = {
  apiKey: '4c13649367c8d7f12098dbaac28662b4',
  fetchWeather: (city) => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector('.cardTitle').innerHTML = name;
    document.querySelector('.cardImg').src =
      'https://openweathermap.org/img/wn/' + icon + '@2x.png';
  },
};
