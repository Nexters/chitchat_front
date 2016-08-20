
var tschedularApp = angular.module('tschedularApp', []);

function Drama(dramaid, airTime, dramatitle, dramachannel, chatrooms, category) {
    this.id = dramaid;
    this.airTime = airTime;
    this.title = dramatitle;
    this.channel = dramachannel;
    this.chatrooms = chatrooms;
    this.category = category;
}

function User(_id, name, nickname, gender, likeDrama, joinedChatroom, email, birthday){
    this._id = _id;
    this.name = name;
    this.nickname = nickname;
    this.gender = gender;
    this.likeDrama = likeDrama;
    this.joinedChatroom = joinedChatroom;
    this.email = email;
    this.birthday = birthday;
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
        $http({
            method: "POST",
            url: "",  // 해당 서버로 요청
            data: id // 개인 정보
        }).then(function mySuccess(response) {
            var data = response.data;
            for (var a = 0; a < data.length; a++) {
                var user = new User(); 
            if (window.localStorage) {
                    localStorage.setItem("_id", user["_id"]);
                    localStorage.setItem("fbid", user["fbid"]);
                    localStorage.setItem("token", user["token"]);
                    localStorage.setItem("name", user["name"]);
                    localStorage.setItem("nickname", user["nickname"]);
                    localStorage.setItem("gender", user["gender"]);
                    localStorage.setItem("admin", user["admin"]);
                    localStorage.setItem("likeDrama", user["likeDrama"]); //
                    localStorage.setItem("joinedChatroom", user["joinedChatroom"]);//
                    localStorage.setItem("email", user["email"]);
                    localStorage.setItem("birthday", user["birthday"]);
                    localStorage.setItem("reported", user["reported"]);//
                }
            }
        }, function myError(response) {
            var errorcode = response.statustext;
            console.log("error : ".errorcode);
        });


    }

    $scope.login = function () {
        $window.location.href = '/auth/facebook';
        $http({
            method: "POST",
            url: "",  // 해당 서버로 요청
           //  data: id // 개인 정보
        }).then(function mySuccess(response) {
            var data = response.data;
            for (var a = 0; a < data.length; a++) {
                var user = new User();
            if (window.localStorage) {
                    localStorage.setItem("_id", user["_id"]);
                    localStorage.setItem("fbid", user["fbid"]);
                    localStorage.setItem("token", user["token"]);
                    localStorage.setItem("name", user["name"]);
                    localStorage.setItem("nickname", user["nickname"]);
                    localStorage.setItem("gender", user["gender"]);
                    localStorage.setItem("admin", user["admin"]);
                    localStorage.setItem("likeDrama", user["likeDrama"]); //
                    localStorage.setItem("joinedChatroom", user["joinedChatroom"]);//
                    localStorage.setItem("email", user["email"]);
                    localStorage.setItem("birthday", user["birthday"]);
                    localStorage.setItem("reported", user["reported"]);//
                }
            }
        }, function myError(response) {
            var errorcode = response.statustext;
            console.log("error : ".errorcode);
        });
    }

    $scope.logout = function () {
        $window.location.href = '/logout';
        localStorage.clear();
    }

    // content-1
    $scope.backgroundImg = "./img/banner.png";
    
    //즐겨찾기
    $scope.favorites = function () {
       var _id = localStorage.getItem("_id");
        $http({
            method: "GET",
            url: "/schedular-mon.json", //해당 서버로 요청
            data: _id//개인 정보
        }).then(function mySuccess(response) {
            var data = response.data;
            for (var a = 0; a < data.length; a++) {
                var drama = new Drama();
                drama.id = data[a]["_id"];
                drama.airTime = data[a]["airTime"];
                drama.title = data[a]["title"];
                drama.channel = data[a]["channel"];
                drama.chatrooms = data[a]["chatrooms"];
                drama.category = data[a]["category"];
                $scope.favoriteList.push(drama);
                $scope.checked = true;
                console.log($scope.favoriteList);
            }

        }, function myError(response) {
            var errorcode = response.statustext;
            console.log("error : ".errorcode);
        });
        
    }

    $scope.popularity = function () {

        $http({
            method: "GET",
            url: "/schedular-mon.json", //인기 채팅방 서버로 요청
        }).then(function mySuccess(response) {
            var data = response.data;
            for (var a = 0; a < data.length; a++) {
                var drama = new Drama();
                drama.id = data[a]["_id"];
                drama.airTime = data[a]["airTime"];
                drama.title = data[a]["title"];
                drama.channel = data[a]["channel"];
                drama.chatrooms = data[a]["chatrooms"];
                drama.category = data[a]["category"];
                $scope.popularityList.push(drama);
                $scope.checked = true;
                console.log($scope.popularityList);
            }

        }, function myError(response) {
            var errorcode = response.statustext;
            console.log("error : ".errorcode);
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

        var d = new Date();
        var date = d.toJSON();
        console.log(date);

        $http({
            method: "GET",
            url: "/schedular-mon.json", //해당 서버로 요청
            data: date
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

