var tschedularApp = angular.module('tschedularApp', []);

tschedularApp.controller('tschedularCtrl', function ($scope, $http, $window, $interval, dramaService, userService) {
    $scope.mon = "월";
    $scope.tue = "화";
    $scope.wed = "수";
    $scope.thu = "목";
    $scope.fri = "금";
    $scope.sat = "토";
    $scope.sun = "일";
    $scope.checked = false;


    $scope.day = ""; //현재 요일탭
    $scope.dramalist = [];
    $scope.popularityList = [];
    $scope.favoriteList = [];


    $scope.isLoggedIn = function () {
        // 토큰이 저장되어 있으면 true
        return $window.localStorage.token !== 'null';
    }

    //nav
    $scope.join = function () {
        $window.location.href = '/auth/facebook';
    }

    $scope.login = function () {
        $window.location.href = '/auth/facebook';
    }

    $scope.logout = function () {
        $window.location.href = '/logout';
        localStorage.clear();
    }

    // content-1
    $scope.backgroundImg = "./img/banner.png";

    //즐겨찾기
    $scope.favorites = function () {
        var _id = $window.localStorage.getItem("_id");
    }

    $scope.popularity = function () {

    }

    //인기/즐겨찾기 채널 이동 ->왼쪽
    $scope.content1Left = function () {

        alert("left");
    }
    //인기 즐겨찾기 채널 이동 ->오른쪽
    $scope.content1Right = function () {
        alert("right");
    }
    //chatroom_id
    $scope.chatroomid = "de";
    //content-2
    $scope.openNewWindows = function (chatroom_id) {

        // console.log("chatroom_id :"+chatroom_id);
        var left = screen.width / 2 - 300, top = screen.height / 2 - 350
        $window.open('chat-room?' + chatroom_id, '', "top=" + top + ",left=" + left + ",width=340,height=600")
        //  if (window.sessionStorage) {
        //      sessionStorage.setItem("chatroom_id", id);
        //        sessionStorage.setItem("chatroom_id", id);
        //  } 


    }

    $scope.showDramaList = function () {
        // if already checked, return 0;
        if ($scope.checked) {
            return;
        }

        var today = new Date();
        var tomorrow = new Date();

        tomorrow.setDate(today.getDate() + 1);

        var promise = dramaService.retrieveDramas(today.toJSON(), tomorrow.toJSON());

        promise.then(function (dramas) {
            $scope.dramalist = dramas;
            $scope.$apply();
        }, function () {

        });

    }//callJson







});



//스케줄러


$('table tbody').sortable({
    helper: fixWidthHelper
})

function fixWidthHelper(e, ui) {
    ui.children().each(function () {
        $(this).width($(this).width());
    });
    return ui;
}

