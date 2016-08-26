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

    $scope.kbs1 = "kbs1";
    $scope.kbs2 = "kbs2";
    $scope.mbc = "mbc";
    $scope.mnet = "mnet";
    $scope.ocn = "ocn";
    $scope.sbs = "sbs";
    $scope.tvn = "tvn";


    $scope.day = ""; //현재 요일탭
    $scope.dramalist = [];
    $scope.popularityList = [];
    $scope.favoriteList = [];


    // ng-repeat="x in popularityList",
    // src='/img/main_{{x.title}}',

    $scope.retrieveToken = function () {
        return $window.localStorage.token;
    }

    $scope.isLoggedIn = function () {
        // 토큰이 저장되어 있으면 true
        return $scope.retrieveToken() !== 'null';
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
        var token = $scope.retrieveToken();

        var promise = userService.getFavorites(token);
        promise.then(function (dramas) {
            $scope.favoriteList = dramas;
            $scope.$apply();
        }, function () {

        });
    }

    $scope.popularity = function () {

        var promise = dramaService.getPopularDramas(4);

        promise.then(function (dramas) {
            $scope.popularityList = dramas;
            $scope.$apply();
        }, function () {

        });
    }

    $scope.retrieveUserInfo = function () {
        var token = $scope.retrieveToken();
        userService.retrieveUserID(token).then(function (userID) {
            userService.retrieveUserInfo(userID).then(function (user) {
                var userInfo = new User;
                $window.localStorage.userInfo.name = user.name;
                $window.localStorage.userInfo.nickname = user.nickname;
                $window.localStorage.userInfo.gender = user.gender;
                $window.localStorage.userInfo.admin = user.admin;
                $window.localStorage.userInfo.likeDrama = user.likeDrama; //
                $window.localStorage.userInfo.joinedChatroom = user.joinedChatroom;//
                $window.localStorage.userInfo.email = user.email;
                $window.localStorage.userInfo.birthday = user.birthday;
                $window.localStorage.userInfo.reported = user.reported;

            }, function (err) {

            });
        }, function (err) {

        });
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


    var d = new Date();
    //$scope.now = d.getHours();
    $scope.now = 18;
    $scope.terms = 0;
    getCurrentHour();

    $scope.left1Hour = function () {
        $scope.now = $scope.now - 1;
        var now = $scope.now;
        if (now === 17) {
            $scope.now = 18;
        }
        console.log("시간을 빼보았다 : " + $scope.now);
        getCurrentHour();
    }

    $scope.right1Hour = function () {
        $scope.now = $scope.now + 1;

        var now = $scope.now;
        if (now > 22) {
            $scope.now = 22;
        }

        console.log("시간을 더해보았다 : " + $scope.now);
        getCurrentHour();
    }



    function getCurrentHour() {
        console.log("getCurrentHOur내" + $scope.now);

        if ($scope.now >= 23) {
            $scope.now = 22;
        } else if ($scope.now <= 18) {
            $scope.now = 18;

        } else if ($scope.now < 18) {
            $scope.now = 18;
        }
    };

    function init() {
        if (true === $scope.isLoggedIn()) {
            $scope.retrieveUserInfo();
        }
    }
    init();

 
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

