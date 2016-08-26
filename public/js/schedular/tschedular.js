var tschedularApp = angular.module('tschedularApp', []);

tschedularApp.controller('tschedularCtrl', function ($scope, $http, $window, $interval, dramaService, userService) {
    $scope.checked = false;

    $scope.mnet = "mnet";
    $scope.ocn = "ocn";
    $scope.name = "";
    $scope.nickname ="";


    $scope.day = ""; //현재 요일탭
    $scope.dramalist = [];
    $scope.popularityList = [];
    $scope.favoriteList = [];

    $scope.channelList = [];
    $scope.week = [];

    $scope.isViewingFavorite = false;

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

     $scope.gosetting = function(){
        $window.location.href = '/setting';
    }


    // content-1
    $scope.backgroundImg = "./img/banner.png";

    //즐겨찾기
    $scope.favorites = function () {
        var token = $scope.retrieveToken();

        var promise = userService.getFavorites(token);
        promise.then(function (dramas) {
            $scope.favoriteList = dramas;
            $window.localStorage.isFav = true;
            $scope.$apply();
        }, function () {

        });
    }

    $scope.popularity = function () {

        var promise = dramaService.getPopularDramas(4);

        promise.then(function (dramas) {
            $scope.popularityList = dramas;
            $window.localStorage.isFav = false;
            $scope.$apply();
        }, function () {

        });
    }



    $scope.retrieveUserInfo = function () {
        var token = $scope.retrieveToken();
        userService.retrieveUserID(token).then(function (userID) {
            userService.retrieveUserInfo(userID).then(function (user) {


                //$window.localStorage.setItem('userInfo', user);
                $window.localStorage.setItem('name', user.name);
                $window.localStorage.setItem('nickname', user.nickname);
                $window.localStorage.setItem('gender', user.gender);
                $window.localStorage.setItem('admin', user.admin);
                $window.localStorage.setItem('likeDrama', user.likeDrama);
                $window.localStorage.setItem('joinedChatroom', user.joinedChatroom);
                $window.localStorage.setItem('email', user.email);
                $window.localStorage.setItem('birthday', user.birthday);
                $window.localStorage.setItem('reported', user.reported);

                $scope.name = localStorage.getItem('name');
                $scope.nickname =localStorage.getItem('nickname');



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
        var left = screen.width / 2 - 300, top = screen.height / 2 - 350
        $window.open('chat-room?' + chatroom_id, '', "top=" + top + ",left=" + left + ",width=340,height=600")
    }

    $scope.getGenderFromChatroom = function (chatroom) {
        switch (chatroom.targetGender) {
            case "male":
                return "남";
            case "female":
                return "여";
            case "both":
                return "남여";
        }

        return "";
    }

    $scope.filterChatroom = function (chatroom) {
        if ($scope.isLoggedIn()) {
            var userGender = $window.localStorage.gender;
            return chatroom.targetGender === 'both' || chatroom.targetGender === userGender;
        } else {
            return chatroom.targetGender === 'both';
        }
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

    $scope.isFav = function () {
        if (false === $scope.isLoggedIn()) {
            return false;
        } else {
            return $window.localStorage.isFav;
        }
    }


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

        $scope.channelList = [
            {
                name: 'MBC',
                img: '/img/main_mbc.png'
            },
            {
                name: 'KBS1',
                img: '/img/main_kbs1.png'
            },
            {
                name: 'KBS2',
                img: '/img/main_kbs2.png'
            },
            {
                name: 'SBS',
                img: '/img/main_sbs.png'
            },
            {
                name: 'JTBC',
                img: '/img/main_jtbc.png'
            },
            {
                name: 'tvN',
                img: '/img/main_tvn.png'
            }
        ];

        $scope.week = [
            {
                en: "mon",
                kr: "월"
            },
            {
                en: "tue",
                kr: "화"
            },
            {
                en: "wed",
                kr: "수"
            },
            {
                en: "thu",
                kr: "목"
            },
            {
                en: "fri",
                kr: "금"
            },
            {
                en: "sat",
                kr: "토"
            },
            {
                en: "sun",
                kr: "일"
            }
        ];

        $scope.isViewingFavorite = $scope.isLoggedIn();
    }

    // 위 함수 선언이랑 같이 가장 아래에 있어야 함
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

