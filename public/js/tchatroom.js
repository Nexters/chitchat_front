var tchatroomApp = angular.module('tchatroomApp',[]);

tchatroomApp.controller('tchatroomCtrl', function($scope, ){
    $scope.messageContent = '';
    
    $scope.sendMessage = function(){

      	MessageService.sendMessage($scope.messageContent);
      	$scope.messageContent = '';

      }
});

tchatroomApp.directive("chatList", function() {
    return {
        restrict : "E",
        template : "<h1>Made by a directive!</h1>"
    };
});