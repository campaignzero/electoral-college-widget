var appWidget = {

  geoEnabled: null,
  geoLocation: {},
  geoErrorMessage: null,
  timeout: null,
  elementName: 'electoral-college-widget',
  storedResponse: {},
  settings: window.ELECTORAL_COLLEGE_WIDGET,

  /**
   * Track Event using Google Analytics
   * @param category
   * @param action
   * @param label
   * @param value
   */
  trackEvent: function(category, action, label, value){
    if(typeof window.ga !== 'undefined'){
      ga('electoralCollegeWidget.send', 'event', category, action, label, value);
    }
  },

  resize: function() {
    var elm = jQuery('#' + this.elementName);
    var width = elm.width();

    elm.removeClass('xs xs s m l xl xxl');

    if (width <= 300) {
      elm.addClass('xs');
    }

    if (width > 300 && width <= 400) {
      elm.addClass('s');
    }

    if (width > 400 && width <= 500) {
      elm.addClass('m');
    }

    if (width > 500 && width <= 600) {
      elm.addClass('l');
    }

    if (width > 600 && width <= 700) {
      elm.addClass('xl');
    }

    if (width > 700) {
      elm.addClass('xxl');
    }
  },

  /**
   * Load Initial Widget Form
   */
  init: function(){
    var elm = jQuery('#' + this.elementName);
    var lastState = '';

    jQuery(elm).load(appWidget.settings.base + 'template/map.html', function () {
      jQuery('a.state').click(function () {
        var code = $(this).data('code');
        var state = $(this).data('state');
        var party = $(this).data('party');

        jQuery('a.state').removeClass('active');

        if (state === lastState) {
          lastState = '';
          jQuery('.state-selection').html('<div class="message animated fadeIn"><i class="material-icons animated fadeInUp">keyboard_arrow_up</i> Select a State to Get Started <i class="material-icons animated fadeInUp">keyboard_arrow_up</i></div>');
          return false;
        }

        lastState = state;

        jQuery(this).addClass('active');

        appWidget.trackEvent('Nav', 'State Clicked', state);
        appWidget.trackEvent('Nav', 'Party Clicked', party);

        if (party === 'democrat') {
          jQuery('.state-selection').html('<div class="message animated fadeIn"><i class="material-icons">thumb_up</i> ' + state + ' voted for Clinton</div>');
        } else {
          jQuery('.state-selection').html('<button id="state-button" class="animated fadeIn"><span>View </span><strong>' + state + '</strong> Electors <i class="material-icons">keyboard_arrow_right</i></button>');
        }
      });
    });

    appWidget.resize();

    setTimeout(function(){
      jQuery('.wrapper', elm).show();
    }, 200);
  }
};
