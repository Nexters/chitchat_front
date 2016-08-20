tschedularApp.service('userService', function ($http) {
  this.retrieveUserInfo = function () {
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

  this.getFavorites = function (id) {
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

  this.getPopular = function () {

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

});