'use strict';

/* exported extend, ready */
let extend = function(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i]) {
      continue;
    }

    for (let key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        out[key] = arguments[i][key];
      }
    }
  }

  return out;
};

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


ready(() => {
  // mouse scroll

  const $mousescroll = $('#mousescroll');

  $mousescroll.on('click', function() {
    $('html, body').animate({
      scrollTop: $('#section-intro').offset().top - $('#header').outerHeight()
    }, 700);
  });


  // nav scrollspy

  const $navlink = $('#nav-scrollspy .nav-link');

  $navlink.on('click', function() {

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - $('#header').outerHeight() + 1
    }, 700);
  });
});


// --------------------------
// navbar-toggle
// --------------------------

/* global ready */
ready(() => {
  'use strict';

  if (window.innerWidth < 992) {
    const navbarCollapse = document.getElementById('navbar-collapse'),
      navbarToggle = document.getElementById('navbar-toggle'),
      navbarDropdownToggle = navbarCollapse.querySelectorAll('.dropdown-toggle');
    let closeNavbar;

    navbarDropdownToggle.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        const elNavbarDropdownMenu = el.nextElementSibling;

        if (!elNavbarDropdownMenu.classList.contains('show')) {
          elNavbarDropdownMenu.classList.add('show');
          elNavbarDropdownMenu.style.height = 'auto';
          const height = elNavbarDropdownMenu.clientHeight + 'px';
          elNavbarDropdownMenu.style.height = '0';

          setTimeout(() => {
            elNavbarDropdownMenu.style.height = height;
          }, 0);

          setTimeout(() => {
            elNavbarDropdownMenu.style.height = '';
          }, 300);
        } else {
          elNavbarDropdownMenu.style.height = 'auto';
          elNavbarDropdownMenu.style.height = elNavbarDropdownMenu.clientHeight + 'px';

          setTimeout(() => {
            elNavbarDropdownMenu.style.height = '0';
          }, 0);

          setTimeout(() => {
            elNavbarDropdownMenu.classList.remove('show');
          }, 300);

          // elNavbarDropdownMenu.addEventListener('transitionend', () => {
          //   elNavbarDropdownMenu.classList.remove('show');
          // }, {once: true});
        }
      });
    });

    navbarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navbarCollapse.classList.toggle('show');

      if (navbarCollapse.classList.contains('show')) {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').style.overflow = 'auto';
      }
    });

    document.getElementById('navbar-close').addEventListener('click', () => {
      closeNavbar();
    });

    closeNavbar = function() {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      navbarToggle.dispatchEvent(event);
    };
  }
});


// --------------------------
// $map
// --------------------------

/* global ready */
ready(() => {
  'use strict';

  const $map = $('#map');
  const $mapItem = $('.map-item');

  $mapItem.each(function() {
    const $this = $(this);
    $this.on('show.bs.dropdown', function () {
      $map.addClass('active');
    });

    $this.on('hide.bs.dropdown', function () {
      $map.removeClass('active');
    });

    $this.find('.card-close').on('click', (e) => {
      e.preventDefault();
      $this.removeClass('active');
    });

    $this.find('.dropdown-menu').on('click', (e) => {
      if(!$(e.target).hasClass('card-close') && !$(e.target).hasClass('card-more-link')) {
        e.stopPropagation();
      }
    });
  });
});


// --------------------------
// headroom
// --------------------------

/* global ready, extend, Headroom */
ready(() => {
  'use strict';

  const elHeaderHeadroom = document.querySelector('.header-headroom');

  if (elHeaderHeadroom) {
    let defaults = {
      tolerance: 5,
      offset: elHeaderHeadroom.offsetTop
    };
    let options = extend({}, defaults, JSON.parse(elHeaderHeadroom.getAttribute('data-options')));

    const headroom = new Headroom(elHeaderHeadroom, options);
    headroom.init();
  }
});


// --------------------------
// swiper
// --------------------------

/* global ready, extend, Swiper */
ready(() => {
  'use strict';

  setTimeout(() => {
    const elSwiper = document.querySelectorAll('[data-plugin="swiper"]');
    Array.prototype.forEach.call(elSwiper, (el) => {
      let defaults = {
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev')
        },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true
        }
      };
      let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

      new Swiper(el, options);
    });


    // swiper tab 2

    if (window.innerWidth < 768) {
      new Swiper('#swiper-container-tab-2', {
        spaceBetween: 20,
        slidesPerView: 'auto',
        slideToClickedSlide: true
      });
    }
  }, 100);
});


// --------------------------
// magnific popup
// --------------------------

/* global ready, extend */
ready(() => {
  'use strict';

  const elMagnificPopup = document.querySelectorAll('[data-plugin="mfp"]');
  Array.prototype.forEach.call(elMagnificPopup, (el) => {
    let defaults = {
      mainClass: 'mfp-zoom-in',
      // closeBtnInside: false,
      tClose: 'Đóng (Esc)',
      removalDelay: 300,
      type: 'inline',
      callbacks: {
        beforeOpen: function () {
          if (this.st.type === 'image') {
            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            this.st.mainClass += ' mfp-img-mobile';
          }

          if (this.st.el.attr('data-effect')) {
            this.st.mainClass += ' ' + this.st.el.attr('data-effect');
          }
        }
      }
    };
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    $(el).magnificPopup(options);
  });


  const elMagnificPopupGallery = document.querySelectorAll('[data-plugin="mfp-gallery"]');
  Array.prototype.forEach.call(elMagnificPopupGallery, (el) => {
    let defaults = {
      mainClass: 'mfp-img-mobile mfp-with-zoom',
      tClose: 'Đóng (Esc)',
      // closeBtnInside: false,
      delegate: 'a', // the selector for gallery item
      type: 'image',
      autoFocusLast: false,
      gallery: {
        enabled: true,
        tPrev: 'Trước',
        tNext: 'Kế tiếp',
        tCounter: '%curr% / %total%'
      },
      zoom: {
        enabled: true
      },
      iframe: {
        markup:
          '<div class="mfp-iframe-wrapper">' +
            '<div class="mfp-close"></div>' +
            '<div class="mfp-iframe-scaler">' +
              '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>' +
            '<div class="mfp-bottom-bar">' +
              '<div class="mfp-title"></div>' +
              '<div class="mfp-counter"></div>' +
            '</div>'+
          '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
      },
      callbacks: {
        markupParse: function(template, values, item) {
          values.title = item.el.attr('title');
        }
      },
    };
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    $(el).magnificPopup(options);
  });


  const elMagnificPopupIframe = document.querySelectorAll('[data-plugin="mfp-iframe"]');
  Array.prototype.forEach.call(elMagnificPopupIframe, (el) => {
    let defaults = {
      type: 'iframe',
      tClose: 'Đóng (Esc)',
      // closeBtnInside: false
    };
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    $(el).magnificPopup(options);
  });


  // mfp-dismiss
  $(document).on('click', '.mfp-dismiss', (e) => {
    e.preventDefault();
    $.magnificPopup.close();
  });
});


// --------------------------
// bideo
// --------------------------

/* global ready, extend, Bideo */
ready(() => {
  'use strict';

  const elBideo = document.querySelectorAll('[data-plugin="bideo"]');
  Array.prototype.forEach.call(elBideo, (el) => {
    let defaults = {
      videoEl: el.querySelector('video'), // Video element
      container: document.querySelector('body'), // Container element
      resize: true,
      // autoplay: false,
      isMobile: window.matchMedia('(max-width: 10000px)').matches,
      playButton: el.querySelector('.bideo-btn-play'),
      pauseButton: el.querySelector('.bideo-btn-pause'),

      // Array of objects containing the src and type
      // of different video formats to add
      src: [
        {
          src: el.querySelector('.bideo-video').getAttribute('data-src'),
          type: 'video/mp4'
        }
      ],

      // What to do once video loads (initial frame)
      onLoad: function () {
        el.querySelector('.bideo-cover').style.display = 'none';
      }
    };
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    let bv = new Bideo();
    bv.init(options);

    // new Swiper(el, options);

    const bideoButtons = document.querySelectorAll('.bideo-btn');
    Array.prototype.forEach.call(bideoButtons, (btn) => {
      btn.addEventListener('click', () => {
        el.classList.toggle('active');
      });
    });
  });
});


// --------------------------
// smooth scroll
// --------------------------

/* global ready, SmoothScroll */
ready(() => {
  'use strict';

  new SmoothScroll('[data-plugin="smooth-scroll"]',{
    offset: () => {
      return document.getElementById('header').clientHeight;
    }
  });
});


// --------------------------
// flatpickr
// --------------------------

/* global ready, extend, flatpickr */
ready(() => {
  'use strict';

  const elFlatpickr = document.querySelectorAll('[data-plugin="flatpickr"]');
  Array.prototype.forEach.call(elFlatpickr, (el) => {
    let defaults = {
      // altInput: true,
      // altFormat: "F j, Y",
      // altInputClass: 'form-control flatpickr-input-alt',
      dateFormat: 'd-m-Y',
      wrap: true,
      locale: 'vn',
      onOpen: function(){
        document.querySelector('.mfp-wrap').removeAttribute('tabindex');
      },
      onClose: function(){
        document.querySelector('.mfp-wrap').setAttribute('tabindex', -1);
      }
    };
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    flatpickr(el, options);
  });
});


// --------------------------
// gsap
// --------------------------

/* global ready, gsap, ScrollTrigger, imagesLoaded */
ready(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  // section 1
  const loaderText = document.getElementById('loader-text');
  const updateProgress = (instance) => {
    loaderText.textContent = `${Math.round(instance.progressedCount * 100 / instance.images.length)}%`;
  };

  const showApp = () => {
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      if ($('.page-home').length) {
        document.scrollingElement.scrollTo(0, 0);
      }
      gsap.to('#loader', { autoAlpha: 0});
    }, 300);

    if ($('.page-home').length) {
      const tlBanner = gsap.timeline();
      tlBanner.from('#section-banner .section-title', {autoAlpha: 0, y: '-2rem'}, '-=0.2');
      tlBanner.from('#section-banner .section-lead', {autoAlpha: 0, y: '-2rem'}, '-=0.2');
      if ($('#section-banner .section-sticky-bottom').length) {
        tlBanner.from('#section-banner .section-sticky-bottom', {
          autoAlpha: 0,
          y: '-2rem',
          onComplete: () => {
            document.getElementById('mousescroll').classList.add('slide-down');
          }
        }, '-=0.2');
      }
      tlBanner.from('.header-cta', {autoAlpha: 0, y: '-2rem'}, '-=0.2');
      tlBanner.delay(0.6);
    }
  };

  imagesLoaded('body', {background: '.section'}).on('progress', updateProgress).on('always', showApp);


  // home scroll trigger

  if (window.innerWidth >= 992 && $('.page-home').length) {
    ScrollTrigger.defaults({
      // toggleActions: 'play complete none reverse',
      start: 'top 80%',
      end: 'bottom bottom',
      scrub: 1,
      // markers: true
    });

    const tlPosition = '-=0.2';


    // section banner

    setTimeout(() => {
      gsap.set('#section-banner', {backgroundPosition: '50% 0px'});
      gsap.to('#section-banner', {
        backgroundPosition: `50% ${innerHeight / 2}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: '#section-banner',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, 300);


    // section intro

    const tlIntro = gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-intro'}
    });

    tlIntro
      .from('#section-intro .section-title', {y: 100})
      .from('#section-intro .section-lead', {y: 100}, tlPosition);


    // section heritages

    const tlHeritages = gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-heritages'}
    });

    tlHeritages
      .from('#section-heritages .section-header', {y: 100})
      // .from('#section-heritages .section-img-1', {y: 100}, tlPosition)
      .from('#section-heritages .section-img-1', {xPercent: -100}, tlPosition)
      .from('#section-heritages .section-img-1 img', {xPercent: 100}, '<')
      .from('#section-heritages .paragraph', {y: 100}, tlPosition)
      .from('#section-heritages .btn-cta', {y: 100}, tlPosition)
      .from('#section-heritages .section-img-2', {y: 100}, tlPosition);


    // section accommodation

    const tlAccommodation = gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-accommodation'}
    });

    tlAccommodation
      .from('#section-accommodation .blockquote ', {y: 100})
      .from('#section-accommodation .paragraph', {y: 100}, tlPosition)
      .from('#section-accommodation .btn-cta', {y: 100}, tlPosition)
      .from('#section-accommodation .section-img', {xPercent: -100}, tlPosition)
      .from('#section-accommodation .section-img img', {xPercent: 100}, '<');

    setTimeout(() => {
      gsap.set('#section-accommodation .section-parallax', {backgroundPosition: '50% 0%'});
      gsap.to('#section-accommodation .section-parallax', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#section-accommodation .section-parallax',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          // markers: true
        }
      });
    }, 300);


    // section cuisine

    const tlCuisine  = gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-cuisine'}
    });

    tlCuisine
      .from('#section-cuisine .section-header', {y: 100})
      .from('#section-cuisine .section-img', {xPercent: -100}, tlPosition)
      .from('#section-cuisine .section-img img', {xPercent: 100}, '<')
      .from('#section-cuisine .paragraph', {y: 100}, '<')
      .from('#section-cuisine .btn-cta', {y: 100}, tlPosition);


    // section image 1

    setTimeout(() => {
      gsap.set('#section-image-1', {backgroundPosition: `50% ${-innerHeight / 2}px`});
      gsap.to('#section-image-1', {
        backgroundPosition: `50% ${innerHeight / 2}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: '#section-image-1',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, 300);


    // section spa

    const tlSpa  = gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-spa'}
    });

    tlSpa
      .from('#section-spa .section-header', {y: 100})
      .from('#section-spa .section-img-1', {xPercent: -100}, tlPosition)
      .from('#section-spa .section-img-1 img', {xPercent: 100}, '<')
      .from('#section-spa .paragraph', {y: 100}, tlPosition)
      .from('#section-spa .btn-cta', {y: 100}, tlPosition)
      .from('#section-spa .section-img-2', {y: 100}, tlPosition);


    // section image 2

    setTimeout(() => {
      gsap.set('#section-image-2', {backgroundPosition: `50% ${-innerHeight / 2}px`});
      gsap.to('#section-image-2', {
        backgroundPosition: `50% ${innerHeight / 2}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: '#section-image-2',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, 300);


    // section experiences

    const tlExperiences   = gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-experiences'}
    });

    tlExperiences
      .from('#section-experiences .section-header', {y: 100})
      .from('#section-experiences .section-img', {xPercent: -100}, tlPosition)
      .from('#section-experiences .section-img img', {xPercent: 100}, '<')
      .from('#section-experiences .paragraph', {y: 100}, tlPosition)
      .from('#section-experiences .btn-cta', {y: 100}, tlPosition);
  }
});
