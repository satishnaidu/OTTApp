'use strict';

/**
 * @ngdoc overview
 * @name OTTApp
 * @description
 * # OTTApp
 *
 * Main module of the application.
 */
var app = angular
  .module('OTTApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'ui.router',
    'OTTApp.services',
    'OTTApp.filters',
    'OTTApp.directives'
]);

var services = angular.module('OTTApp.services', ['ngResource']);
var filters = angular.module('OTTApp.filters', []);
var directives = angular.module('OTTApp.directives', []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'views/maincontent.html',
      controller: 'mainController'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/video/:videoId', {
      templateUrl: 'views/video.html',
      controller: 'videoController'
    })
    .when('/upload', {
      templateUrl: 'views/upload.html',
      controller: 'uploadController'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/login',{
      templateUrl:'views/login.html',
      controller:'loginController'
    })
    .when('/signup',{
      templateUrl:'views/signup.html',
      controller:'loginController'
    })
    .otherwise({
      redirectTo: '/video'
    });
});



var searchElement;
var search=0;
var ind=40;

$(document).keydown(function(e) {

  if(ind>=40 && ind<=48){
    search=0;
    $("#keyboard").hide();
  }
  else{
    search=1;
  }

  if (e.keyCode == 38) {
    /*if ($(".b"+ind).hasClass("selected")) {*/
      $(".b"+ind).removeClass( "selected" );
      if(search==0){
        if(ind==40){
          $("#keyboard").show();
          ind=1;
        }
        else{
          ind=ind-1;
        }
      }else if(ind>6 && ind<=37){
        ind=ind-6;
      }else if(ind>=1 && ind<=6){
        ind=0;  
      }else if(ind==38){
        ind=31;
      }else if(ind==0){
        ind=37;
      }
    /*}*/
    $(".b"+ind).addClass("selected" );     
  }else if (e.keyCode == 40 ) {
   /* if ($(".b"+ind).hasClass("selected")) {*/
      $(".b"+ind).removeClass( "selected" );
      if((search==0 || ind==0) && ind!=48){
        ind=ind+1;
      }else if(ind>0 && ind<=31){
        ind=ind+6;
      }else if(ind>=32 && ind<=36){
        ind=37;
      }else if(ind==37 || ind==38){
        ind=0;
      }else if(ind==39){
        ind=1;
      }
   /* }*/
    $(".b"+ind).addClass("selected" ); 
  }else if (e.keyCode == 37) {
    /*if ($(".b"+ind).hasClass("selected")) {*/
      $(".b"+ind).removeClass( "selected" );
      if(ind % 6 == 1 || ind==0){
        ind=40;
        $("#keyboard").hide();
      }else if(ind>=1 && ind<=38){
        ind = ind -1;
      }
      $(".b"+ind).addClass("selected"); 
   /* }*/
  }else if(e.keyCode == 39) {
   /* if ($(".b"+ind).hasClass("selected")) {*/
      $(".b"+ind).removeClass( "selected" );
      if(ind % 6 != 0 && ind<39){
        ind = ind + 1; 
      } 
      $(".b"+ind).addClass("selected"); 
    /*}       */
  }else if(e.keyCode == 32 || e.keyCode == 13){
    if(ind<=38){
      if(ind>=1 && ind<=36){
        var srcElement = e.target.getElementsByClassName('selected');
        searchElement = srcElement[0].innerHTML;
        console.log(searchElement);
        $('#searchbox').val($('#searchbox').val()+searchElement);  
      }else if(ind==0){
        $('#searchbox').val("");
      }else if(ind==37){
        $('#searchbox').val($('#searchbox').val().substring(0,$('#searchbox').val().length-1));
      }else if(ind==38){
        $('#searchbox').val($('#searchbox').val()+" ");         
      } 
    }else{
      $(function(){
      $(".b"+ind).trigger('click');
     });
    }
  }
});
