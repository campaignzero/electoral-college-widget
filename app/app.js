var appWidget = {
  geoEnabled: null,
  geoLocation: {},
  geoErrorMessage: null,
  timeout: null,
  elementName: 'electoral-college-widget',
  electoralCollege: [],
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

    // Firefox fix for figuring out row height of states based on
    // first states width ( height won't work, but its a square, so use width )
    var rowHeight = jQuery('a.state:first-child()', elm).width();
    jQuery('.row', elm).height(rowHeight);
  },

  /**
   * Show Modal
   * @param code
   * @param ec
   */
  showModal: function (state, code, ec) {
    var elm = jQuery('#' + this.elementName);

    appWidget.trackEvent('Nav', 'Modal Opened', state);

    if (ec.length > 0) {
      var $template = $('<div>');

      jQuery($template).load(appWidget.settings.base + 'template/elector.html li', function (data) {
        for (var i = 0; i < ec.length; i++) {
          if (ec[i].code === code) {

            var $li = $template.clone();
            var elector = (ec[i].elector !== '') ? ec[i].elector : state + ' Elector';

            // Setup Photo
            if (ec[i].photo !== '') {
              jQuery('.photo', $li).css('background-image', 'url("https://proxy.joincampaignzero.org/'+ ec[i].photo +'")');
            }

            // Setup Email
            if (ec[i].email !== '') {
              var subject = encodeURIComponent('Secretary Clinton WON THE POPULAR VOTE and should be President.');
              var body = encodeURIComponent('Dear ' + elector + ',\n\nOn December 19, you and the other Electors will cast your ballots to elect a President. If you all vote the way your states voted, Donald Trump will win. However, you can vote for Hillary Clinton if you choose. Even in states that issue a small fine for voting this way, your vote would still be counted, and the fine would almost certainly be offset by support from Clinton supporters.\n\nTherefore, I urge you to exercise your Constitutional right to cast your ballot for Secretary Clinton. Mr. Trump is unfit to serve. His scapegoating of so many Americans, and his impulsivity, bullying, lying, admitted history of sexual assault, and utter lack of experience make him a danger to the Republic.\n\nSecretary Clinton won the popular vote - by nearly 2 million votes - and should be President. The only reason Trump "won" is because of the Electoral College. But electing Trump is not consistent with the Founder\'s intentions when they created the Electoral College. The Electoral College was created, in the words of Alexander Hamilton, to prevent the Presidency from falling to "any man who is not in an eminent degree endowed with the requisite qualifications." This is the moment where you were meant to lead.\n\nIf 38 of Trump\'s 306 electors vote Clinton, she\'ll become President. You are the last check in a system perilously close to making a tyrant the President. I urge you to honor the will of the majority of voters and vote to elect Hillary Clinton President. Our nation depends on it.\n\nSigned,\n\n- A Concerned Citizen');
              jQuery('a.email', $li).attr('href', 'mailto:' + ec[i].email + '?subject=' + subject + '&body=' + body);

              // Setup Click Tracking
              jQuery('a.email', $li).off('click.widget');
              jQuery('a.email', $li).on('click.widget', function () {
                appWidget.trackEvent('Nav', 'Elector Emailed Name', elector);
                appWidget.trackEvent('Nav', 'Elector Emailed State', state);
              });
            } else {
              jQuery('a.email', $li).attr('href', 'javascript:void(0)');
              jQuery('a.email', $li).attr('disabled', 'disabled').addClass('disabled');
            }

            // Setup Phone Number
            if (ec[i].phone !== '') {
              jQuery('a.phone', $li).attr('href', 'tel:' + ec[i].phone);
              jQuery('a.phone', $li).attr('onclick', 'return confirm("Would you like to Call ' + elector + ' at: ' + ec[i].phone + '")');

              // Setup Click Tracking
              jQuery('a.phone', $li).off('click.widget');
              jQuery('a.phone', $li).on('click.widget', function () {
                appWidget.trackEvent('Nav', 'Elector Called Name', elector);
                appWidget.trackEvent('Nav', 'Elector Called State', state);
              });
            } else {
              jQuery('a.phone', $li).attr('href', 'javascript:void(0)');
              jQuery('a.phone', $li).attr('disabled', 'disabled').addClass('disabled');
            }

            // Setup Twitter
            if (ec[i].twitter !== '') {
              jQuery('a.twitter', $li).attr('href', ec[i].twitter);

              // Setup Click Tracking
              jQuery('a.twitter', $li).off('click.widget');
              jQuery('a.twitter', $li).on('click.widget', function () {
                appWidget.trackEvent('Nav', 'Elector Twitter Viewed Name', elector);
                appWidget.trackEvent('Nav', 'Elector Twitter Viewed State', state);
              });
            } else {
              jQuery('a.twitter', $li).attr('href', 'javascript:void(0)');
              jQuery('a.twitter', $li).attr('disabled', 'disabled').addClass('disabled');
            }

            // Setup Facebook
            if (ec[i].facebook !== '') {
              jQuery('a.facebook', $li).attr('href', ec[i].facebook);

              // Setup Click Tracking
              jQuery('a.facebook', $li).off('click.widget');
              jQuery('a.facebook', $li).on('click.widget', function () {
                appWidget.trackEvent('Nav', 'Elector Facebook Viewed Name', elector);
                appWidget.trackEvent('Nav', 'Elector Facebook Viewed State', state);
              });
            } else {
              jQuery('a.facebook', $li).attr('href', 'javascript:void(0)');
              jQuery('a.facebook', $li).attr('disabled', 'disabled').addClass('disabled');
            }

            var h1Label = (elm.width() <= 420) ? code : state;

            jQuery('.elector', $li).html(elector);
            jQuery('.modal-content h1', elm).html(h1Label + ' Electors');
            jQuery('.modal-content ul', elm).append($li);

            // Setup Click Tracking for Toggle
            jQuery('.toggle, .content', $li).off('click.widget');
            jQuery('.toggle, .content', $li).on('click.widget', function (event) {
              jQuery('.elector-wrapper').not(jQuery(this).closest('.elector-wrapper')).removeClass('open').addClass('closed');
              jQuery(this).closest('.elector-wrapper').toggleClass('open').toggleClass('closed');

              appWidget.trackEvent('Nav', 'Elector Toggled Name', elector);
              event.preventDefault();
            });
          }
        }
      });
    }

    jQuery('.modal', elm).show();
    jQuery('.close-modal-button', elm).off('click.widget');
    jQuery('.close-modal-button', elm).on('click.widget', function (event) {
      appWidget.hideModal(state);
      event.preventDefault();
    });
  },

  /**
   * Hide Modal
   */
  hideModal: function (state) {
    var elm = jQuery('#' + this.elementName);
    jQuery('.modal', elm).hide();
    jQuery('.modal-content', elm).html('<h1 class="modal-header"></h1><ul class="electors"></ul>');
    appWidget.trackEvent('Nav', 'Modal Closed', state);
  },

  /**
   * Load Initial Widget Form
   */
  init: function(){
    var elm = jQuery('#' + this.elementName);
    var lastState = '';
    var timer;

    jQuery.getJSON(appWidget.settings.base + 'data/electoral-college.json', function(data) {
      appWidget.electoralCollege = data;
    });

    jQuery(elm).load(appWidget.settings.base + 'template/map.html', function () {

      jQuery('a.state', elm).off('click.widget');
      jQuery('a.state', elm).click('click.widget', function (event) {
        var code = $(this).data('code');
        var state = $(this).data('state');
        var party = $(this).data('party');

        jQuery('a.state', elm).removeClass('active');

        if (state === lastState) {
          lastState = '';
          jQuery('.state-selection', elm).html('<div class="message animated slideInUp"><i class="material-icons animated fadeInUp">keyboard_arrow_up</i> Select a State to Get Started <i class="material-icons animated fadeInUp">keyboard_arrow_up</i></div>');
          return false;
        }

        lastState = state;

        jQuery(this).addClass('active');

        appWidget.trackEvent('Nav', 'State Clicked', state);
        appWidget.trackEvent('Nav', 'Party Clicked', party);

        if (party === 'democrat') {
          jQuery('.state-selection', elm).html('<div class="message animated fadeIn"><i class="material-icons">thumb_up</i> ' + state + ' voted for Clinton</div>');

          clearTimeout(timer);
          timer = setTimeout(function (){
            jQuery('.state-selection', elm).html('<div class="message animated fadeIn"><i class="material-icons">keyboard_arrow_up</i> Select a State to Get Started <i class="material-icons">keyboard_arrow_up</i></div>');
          }, 5000);
        } else {
          if (elm.width() <= 420) {
            jQuery('.state-selection', elm).html('<button id="state-button" class="animated fadeInUp"><span>View </span><strong>' + state + '</strong> Electors <i class="material-icons">keyboard_arrow_right</i></button>');

            jQuery('#state-button', elm).off('click.widget');
            jQuery('#state-button', elm).on('click.widget', function (event) {
              appWidget.showModal(state, code, appWidget.electoralCollege);
              event.preventDefault();
            });
          } else {
            appWidget.showModal(state, code, appWidget.electoralCollege);
          }
        }

        event.preventDefault();
      });
    });

    appWidget.resize();

    setTimeout(function(){
      jQuery('.wrapper', elm).show();
      appWidget.resize();
    }, 50);
  }
};
