
// if (window.sessionStorage) {
//     var uid = null;
//     uid = sessionStorage.getItem("chatroom_id");
//     if (uid == null) {
//         alert("nono");
//         // 처리코드
//         sessionStorage.clear();
           
//     } else {
//         // 정상코드
//         alert(uid);
//       //  sessionStorage.clear();
//     }
// }
// else {
//     // 처리코드
// }

 tchatroomApp = angular.module('tchatroomApp',[]);

tchatroomApp.controller('tchatroomCtrl',['$scope', function($scope, ChatService){
    $scope.chatroomid =location.search.substring(1);
    //$scope.chatContent = "";
    console.log($scope.chatroomid);

}]);

// var tchatroomApp = angular.module('tchatroomApp',[]);

// tchatroomApp.controller('tchatroomCtrl',['$scope','ChatService', function($scope, ChatService){
//     $scope.chatroomid = "2222";
//     //location.search.substring(1);
//     //$scope.chatContent = "";
//     console.log("test");
// }]);





