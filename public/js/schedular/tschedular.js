var tschedularApp = angular.module('tschedularApp', []);

tschedularApp.controller('tschedularCtrl', function ($scope, $http, $window, $interval, dramaService, userService) {
    $scope.checked = false;

    $scope.mnet = "mnet";
    $scope.ocn = "ocn";
    $scope.name = "";
    $scope.nickname = "";

    $scope.day = ""; //현재 요일탭
    $scope.dramalist = [];
    $scope.popularityList = [];
    $scope.favoriteList = [];

    $scope.channelList = [];
    $scope.week = [];

    $scope.truncatedList = [];
    $scope.truncateStartIndex = 0;
    $scope.truncateSize = 4;
    $scope.truncateEndIndex = $scope.truncateStartIndex + $scope.truncateSize;


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

    $scope.gosetting = function () {
        $window.location.href = '/setting';
    }


    // content-1
    $scope.backgroundImg = "./img/banner.png";

    //즐겨찾기
    $scope.favorites = function () {
        if (false === $scope.isLoggedIn()) {
            return alert('로그인을 하셔야 이용하실 수 있습니다.');
        }
        var token = $scope.retrieveToken();

        var promise = userService.getFavorites(token);
        promise.then(function (dramas) {
            $scope.favoriteList = dramas;
            console.log("favorite"+$scope.favoriteList);
            $window.localStorage.isFav = true;
            $scope.refreshTruncatedList();
            $scope.$apply();
        }, function () {

        });
    }

    $scope.popularity = function () {

        var promise = dramaService.getPopularDramas(4);

        promise.then(function (dramas) {
            $scope.popularityList = dramas;
            $window.localStorage.isFav = false;
            $scope.refreshTruncatedList();
            $scope.$apply();
        }, function () {

        });
    }

    $scope.refreshTruncatedList = function () {
        $scope.truncatedList = [];
        var sourceList = $scope.isFav() ? $scope.favoriteList : $scope.popularityList;

        if ($scope.truncateStartIndex + $scope.truncateSize !== $scope.truncateEndIndex) {
            $scope.truncateEndIndex = $scope.truncateStartIndex + $scope.truncateSize;
        }

        if ($scope.truncateStartIndex < 0) {
            $scope.truncatedList = sourceList.slice(0, $scope.truncateEndIndex);
        } else if ($scope.truncateEndIndex >= sourceList.length) {
            $scope.truncatedList = sourceList.slice($scope.truncateStartIndex, sourceList.length);
        } else {
            $scope.truncatedList = sourceList.slice($scope.truncateStartIndex, $scope.truncateEndIndex);
        }

        while ($scope.truncatedList.length < $scope.truncateSize) {
            var defaultDrama = new Drama();

            defaultDrama.id = "";
            defaultDrama.en = "main_default";
            defaultDrama.channel = "";
            defaultDrama.chatrooms = [];

            $scope.truncatedList.push(defaultDrama);
        }
    }


    $scope.retrieveUserInfo = function () {
        var token = $scope.retrieveToken();
        userService.retrieveUserID(token).then(function (userID) {
            userService.retrieveUserInfo(userID).then(function (user) {


                //$window.localStorage.setItem('userInfo', user);
                $window.localStorage.setItem('uid', user.id);
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
                $scope.nickname = localStorage.getItem('nickname');



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
    $scope.openNewWindows = function (chatroom_id, drama) {
        var left = screen.width / 2 - 300, top = screen.height / 2 - 350
        $window.open('chat-room?' + chatroom_id + '&' + drama, '', "top=" + top + ",left=" + left + ",width=340,height=600")
    }

    $scope.getGenderFromChatroom = function (chatroom) {
        switch (chatroom.targetGender) {
            case "male":
                return "/img/main_man.png";
            case "female":
                return "/img/main_girl.png";
            case "both":
                return "/img/main_mangirl.png";
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

    $scope.showDramaList = function (targetDay) {
        // if already checked, return 0;
        if ($scope.checked) {
            return;
        }

        var today = new Date();

        var todayDay = today.getDay();
        var dayDiff = (targetDay + 7 - todayDay) % 7;

        var targetDate = new Date();
        targetDate.setDate(today.getDate() + dayDiff);

        var targetHour = $scope.now - (today.getTimezoneOffset() / 60);


        var timeStart = new Date(new Date(today.getTime() + 86400000 * dayDiff).setHours(targetHour - 1, 0,0,0));
        var timeEnd = new Date(new Date(today.getTime() + 86400000 * dayDiff).setHours(targetHour + 3, 0,0,0));


        console.log(timeStart.toJSON());
        var promise = dramaService.retrieveDramas(timeStart.toJSON(), timeEnd.toJSON());

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

    $scope.now = 0;
    $scope.terms = 0;

    $scope.left1Hour = function () {
        $scope.now = $scope.now - 1;
        var now = $scope.now;
        if (now < 0) {
            $scope.now = 0;
        }
        console.log("시간을 빼보았다 : " + $scope.now);

        $scope.showDramaList($scope.day);
    }

    $scope.right1Hour = function () {
        $scope.now = $scope.now + 1;

        var now = $scope.now;
        if (now > 22) {
            $scope.now = 22;
        }

        console.log("시간을 더해보았다 : " + $scope.now);

        $scope.showDramaList($scope.day);
    }

    $scope.setWeekDay = function (day) {
        $scope.day = day;

        $scope.showDramaList($scope.day);
    }

    function getCurrentHour() {
        var d = new Date();
        $scope.now = d.getHours();
        $scope.day = d.getDay();

        console.log("getCurrentHOur내" + $scope.now);
    };

    $scope.getHoursString = function (hour) {
        var ampm = "오전";
        var hourIn12 = hour;

        if (hour > 12) {
            ampm = "오후";
            hourIn12 = hour - 12;
        }

        return ampm + " " + hourIn12 + ":00";
    }

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
                index: 1,
                en: "mon",
                kr: "월"
            },
            {
                index: 2,
                en: "tue",
                kr: "화"
            },
            {
                index: 3,
                en: "wed",
                kr: "수"
            },
            {
                index: 4,
                en: "thu",
                kr: "목"
            },
            {
                index: 5,
                en: "fri",
                kr: "금"
            },
            {
                index: 6,
                en: "sat",
                kr: "토"
            },
            {
                index: 0,
                en: "sun",
                kr: "일"
            }
        ];

        $scope.isViewingFavorite = $scope.isLoggedIn();

        if ($scope.isFav()) {
            $scope.favorites();
        } else {
            $scope.popularity();
        }

        $scope.refreshTruncatedList();

        getCurrentHour();
        $scope.showDramaList($scope.day);
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

