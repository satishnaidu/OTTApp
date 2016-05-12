'use strict';

/**
 * @ngdoc function
 * @name OTTApp.controller:mainController
 * @description
 * # mainController
 * Controller of the OTTApp
 */
angular.module('OTTApp')
  .controller('mainController', function ($scope, SERVICE, SERVICE_URL, serviceBase) {
    $("#keyboard").hide();
    $(".b40").addClass("selected");

    //******** Service call to get the data : Start******
    
  	var inputdata = '';
  	var service = new serviceBase();
    var ind2=0;
    var i=1;
  	service.getContent(inputdata).then(successCallBack, errorCallBack);
    
    $scope.imagemodel = [];

  	function successCallBack(response){
  		if (typeof response != 'undefined' && response != '') {
  			// console.log("Success Flow-Data from Service : "+ JSON.stringify(response.result.objects));
  			
        angular.forEach(response.result.objects, function(value, key){
          // console.log("Thumbnail" + value.thumbnailUrl + "name:" + value.name);
          var image = {};
          image.imgsrc = value.thumbnailUrl;
          image.name = value.name;
          image.videoId=value.id;
          image.index=i;
          i=i+1;
          console.log(image);
          $scope.imagemodel.push(image);

        });
  		}
  	}

    
  	function errorCallBack(error){
  		console.log("in error flow");

  	}

    console.log("In main conttroller ");

    //******** Service call to get the data : End******

    $scope.$on('keypressevent', function (event, args) {
      console.log('event recieved' + args);
      console.log("ind2 old= "+ ind2);

    if(ind2==0){
      ind2 = 1;
    }else{  
      $(".img"+ind2).removeClass("imageBorder");
      if(args==39){
        if(ind2%5!=0 && ind2<17){
          ind2=ind2+1;
        }
      }else if(args==37){
        if(ind2%5!=1){
          if(ind2>1 && ind2<=17){  
            ind2=ind2-1;
          }
        }
      }else if(args==38){
        if(ind2>5 && ind2<=17){
          ind2=ind2-5;
        }
      }else if(args==40){
        if(ind2<13 && ind2>=1){
          ind2=ind2+5;
        }
      }
    }
    $(".img"+ind2).addClass("imageBorder");
      console.log("ind2 new ="+ind2);
    });


});
