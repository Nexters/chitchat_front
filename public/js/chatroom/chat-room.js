<script src="/test.js"></script>

tchatroomApp = angular.module('tchatroomApp',[]);

var socket = io('52.79.81.243:5003');

tchatroomApp.controller('tchatroomCtrl',['$scope', function($scope, ChatService){
    $scope.chatroomid =location.search.substring(1);
    //$scope.chatContent = "";
    console.log($scope.chatroomid);
    $scope.mychat = "";
    $scope.sendChat = function(){
        //alert($scope.mychat);
            var result = socket.emit('sendText', $scope.mychat);
            alert(result);
            // $('#messages').append($('<li>').text($scope.mychat));
            // $('#m').val('');
            return false;
     //   });

    }

    $scope.getChat = function(){

    }
}]);





