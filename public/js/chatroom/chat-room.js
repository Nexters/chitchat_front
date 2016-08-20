tchatroomApp = angular.module('tchatroomApp',[]);

tchatroomApp.controller('tchatroomCtrl',['$scope', function($scope, ChatService){

    var socket = io('chitchat.zone/chat');

    $scope.chatroomid =location.search.substring(1);
    //$scope.chatContent = "";
    console.log($scope.chatroomid);
    $scope.mychat = "";
    $scope.sendChat = function(){
        //alert($scope.mychat);
            var result = socket.emit('sendText', $scope.mychat);
            console.log(result);
            // $('#messages').append($('<li>').text($scope.mychat));
            // $('#m').val('');
            return false;
     //   });

    }

    $scope.getChat = function(){

    }
}]);





