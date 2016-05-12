'use strict';

angular.module('OTTApp')
  .directive('keyEvents', ['$location' , function ($location) {

    // Standard values for KEYCODES

    // Navigation
    var K_ENTER  = 13;
    var K_LEFT   = 37;
    var K_UP     = 38;
    var K_RIGHT  = 39;
    var K_DOWN   = 40;
    var K_RETURN = 27;  // mapped to ESC
    var K_EXIT   = 8;   // mapped to BACKSPACE

    // Number keys
    var K_0 = 48;
    var K_1 = 49;
    var K_2 = 50;
    var K_3 = 51;
    var K_4 = 52;
    var K_5 = 53;
    var K_6 = 54;
    var K_7 = 55;
    var K_8 = 56;
    var K_9 = 57;

    // Special keys
    var K_RECORD = 113;
    var K_GUIDE  = 36;
    var K_INFO   = 112;
    var K_MENU   = 18;

    var K_R = 82; // Mapped to 'RECORD'
    var K_G = 71; // Mapped to 'GUIDE'
    var K_I = 73; // Mapped to 'INFO'
    var K_M = 77; // Mapped to 'MENU'

    // TODO: If we are on STB, then use STB specific values
    // if(rdkBox) {
        // K_RECORD = 82;
        // K_GUIDE  = 71;
        // K_INFO   = 71;
        // K_MENU   = 71;
    // }

    return {
      restrict: 'A',
      link: function postLink(scope, element) {

        // Top level key handlers
        // The key events are normalised and propagated
        element.bind('keydown', function(e) {

          scope.$apply(function() {
            switch(e.keyCode) {

            case K_ENTER:
              scope.$broadcast('keyEvent', 'enter');
              break;

            case K_RIGHT:
              scope.$broadcast('keyEvent', 'right');
              break;

            case K_DOWN:
              scope.$broadcast('keyEvent', 'down');
              break;

            case K_LEFT:
              scope.$broadcast('keyEvent', 'left');
              break;

            case K_UP :
              scope.$broadcast('keyEvent', 'up');
              break;

            case K_RETURN :
              scope.$broadcast('keyEvent', 'return');
              break;

            case K_EXIT :
              scope.$broadcast('keyEvent', 'exit');
              break;

            // Number keys
            case K_1:
              scope.$broadcast('keyEvent', '1');
              break;
            case K_2:
              scope.$broadcast('keyEvent', '2');
              break;
            case K_3:
              scope.$broadcast('keyEvent', '3');
              break;
            case K_4:
              scope.$broadcast('keyEvent', '4');
              break;
            case K_5:
              scope.$broadcast('keyEvent', '5');
              break;
            case K_6:
              scope.$broadcast('keyEvent', '6');
              break;
            case K_7:
              scope.$broadcast('keyEvent', '7');
              break;
            case K_8:
              scope.$broadcast('keyEvent', '8');
              break;
            case K_9:
              scope.$broadcast('keyEvent', '9');
              break;
            case K_0:
              scope.$broadcast('keyEvent', '0');
              break;

            // Special keys
            case K_RECORD:
            case K_R:
              scope.$broadcast('keyEvent', 'record');
              break;
            case K_GUIDE:
            case K_G:
              $location.path('/guide');
              break;
            case K_INFO:
            case K_I:
              scope.$broadcast('keyEvent', 'info');
              break;
            case K_MENU:
            case K_M:
              $location.path('/');
              break;
            }
          });
        });
      }
    };
  }]);

