
var tschedularApp = angular.module('tschedularApp', []);

function Drama(dramaid, dramatitle, dramachannel) {
    this.id = dramaid;
    this.title = dramatitle;
    this.channel = dramachannel;
}


tschedularApp.controller('tschedularCtrl', function ($scope, $http, $window, $interval) {
    $scope.mon = "월";
    $scope.tue = "화";
    $scope.wed = "수";
    $scope.thu = "목";
    $scope.fri = "금";
    $scope.sat = "토";
    $scope.sun = "일";
    $scope.checked = false;




    $scope.dramaid = "";
    $scope.dramatitle = "";
    $scope.dramachatrooms = "";
    $scope.dramacategory = "";
    $scope.dramaairTimeCurrent = 0;
    $scope.dramaairTimeFuture = 0;
    $scope.dramatotalminute = 0; //future - current;
    $scope.day = ""; //현재 요일탭
    $scope.dramalist = [];


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
    }

    // content-1
    $scope.backgroundImg = "./img/banner.png";
    $scope.favorites = function () {
        alert("favorites");
    }

    $scope.popularity = function () {
        alert("popularity");
    }


    $scope.content1Left = function () {
        alert("left");
    }

    $scope.content1Right = function () {
        alert("right");
    }


    //chatroom_id
    $scope.chatroomid = "de";


    //content-2

    $scope.openNewWindows = function (chatroom_id) {

        // console.log("chatroom_id :"+chatroom_id);
        var left = screen.width / 2 - 300, top = screen.height / 2 - 350
        $window.open('chat-room/?' + chatroom_id, '', "top=" + top + ",left=" + left + ",width=340,height=600")
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
        
        $http({
            method: "GET",
            url: HOST_URL + "/api/v1/dramas?airtimeStart="
            + today.toJSON() + '&airtimeEnd='
            + tomorrow.toJSON()
        }).then(function mySuccess(response) {
            var json = response.data;
            for (var a = 0; a < json.length; a++) {
                var drama = new Drama();
                drama.id = json[a]["_id"];
                drama.title = json[a]["title"];
                drama.channel = json[a]["channel"];
                $scope.dramalist.push(drama);
                $scope.checked = true;
            }

        }, function myError(response) {
            var errorcode = response.statustext;
            console.log("error : ".errorcode);
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

