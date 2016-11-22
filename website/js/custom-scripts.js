(function () {
  function smoothScrolling() {

    $(".navbar-nav a").on("click", function () {

      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        var offset = $('.header-wrapper').outerHeight();

        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - parseInt(offset, 0)
          }, 500);

          return false;
        }
      }
    });
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  var resizeHandeler = debounce(function() {
    var footerHeight = document.querySelector('.cta-section-3').clientHeight;
    document.querySelector('.ec-container').style.maxWidth = (window.innerHeight - 100) + 'px';
    document.querySelector('.ec-widget').style.maxHeight = (window.innerHeight - footerHeight) + 'px';
  }, 25);

  window.addEventListener('resize', resizeHandeler);

  resizeHandeler();
  smoothScrolling();
})();

(function($) {
  "use strict";
  $(document).on('ready', function() {

    var $form = $('.signup-form');
    var $email = $('#mce-EMAIL');
    var $phone = $('#mce-MMERGE1');
    var $zipcode = $('#mce-MMERGE2');
    var $alert = $('.form-message');

    $email.on('keyup', function() {
      $alert.removeClass('text-danger text-success').html('').hide();
    });

    if ($form.length > 0) {
      $('button[type="submit"]', $form).on('click', function(event) {
        if (event) {
          event.preventDefault()
        }
        if (validateInput($form)) {
          register($form)
        }
      })
    }

    function validateInput($form) {

      var validEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      var validZipCode = /^([0-9]{5})$/i;

      $alert.removeClass('text-danger text-success').html('').hide();

      if ($email.val() === '' || !validEmail.test($email.val())) {
        $alert.html('Please Enter a Valid Email Address').addClass('text-danger').fadeIn(500);
        return false;
      }

      if ($zipcode.val() === '' || !validZipCode.test($zipcode.val())) {
        $alert.html('Please Enter a Valid Zipcode').addClass('text-danger').fadeIn(500);
        return false;
      }

      return true;
    }

    function register($form) {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: function(err) {
          $alert.html(err).addClass('text-danger').fadeIn();
        },
        success: function(data) {
          if (data.result !== 'success') {
            $alert.html(data.msg).addClass('text-danger').fadeIn(500);
          } else {
            $form.trigger('reset');
            $alert.html('Thanks! Check your email to confirm signup.');
            $alert.addClass('text-success').fadeIn(500);

            setTimeout(function(){
              $alert.removeClass('text-danger text-success').html('').hide();
            }, 10000);
          }
        }
      })
    }
  })
})(jQuery);