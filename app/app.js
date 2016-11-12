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

  /**
   * Show Error Message
   * @param error
   */
  showError: function(error){
    if (typeof Bugsnag !== 'undefined') {
      Bugsnag.notifyException(error);
    }
  },

  resize: function() {
    var elm = jQuery('#' + this.elementName);
    var width = elm.width();

    elm.removeClass('w200 w220 w240 w280 w300 w320 w380');

    if (width <= 200) {
      elm.addClass('w200');
    }

    if (width <= 220) {
      elm.addClass('w220');
    }

    if (width <= 240) {
      elm.addClass('w240');
    }

    if (width <= 280) {
      elm.addClass('w280');
    }

    if (width <= 300) {
      elm.addClass('w300');
    }

    if (width <= 320) {
      elm.addClass('w320');
    }

    if (width <= 380) {
      elm.addClass('w380');
    }
  },

  /**
   * Load Initial Widget Form
   */
  init: function(){
    var self = this;
    var elm = jQuery('#' + this.elementName);
        elm.html('').append('Coming Soon');

    appWidget.resize();

    setTimeout(function(){

      jQuery('a', elm).click(function(){
        appWidget.trackEvent('Nav', 'Link Clicked', jQuery(this).text());
      });

      jQuery('button', elm).click(function(){
        appWidget.trackEvent('Nav', 'Button Clicked', jQuery(this).text());
      });

      jQuery('.wrapper', elm).show();

    }, 200);
  }
};
