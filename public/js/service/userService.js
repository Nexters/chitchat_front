tschedularApp.service('userService', function ($http) {
  function onError(reject, response) {
    var errorcode = response.statustext;
    console.log("error : ".errorcode);
    reject();
  };


  this.retrieveUserID = function (token) {
    return new Promise(function (resolve, reject) {

      $http({
        method: "GET",
        url: HOST_URL + "/api/v1/users?token=" + token
      }).then(function mySuccess(response) {

        var res = response.data;
        if (0 === res.status) {
          var userId = res.value;

          resolve(userId);
        }

      }, onError.bind(null, reject));
    });
  }

  this.retrieveUserInfo = function (uid) {
    return new Promise(function (resolve, reject) {
      var user = [];

      $http({
        method: "GET",
        url: HOST_URL + "/api/v1/users/" + uid
      }).then(function mySuccess(response) {

        var res = response.data;
        if (0 === res.status) {
          var user = res.value;

          var ret = new User();

          ret.name = user.name;
          ret.nickname = user.nickname;
          ret.gender = user.gender;
          ret.admin = user.admin;
          ret.likeDrama = user.likeDrama; //
          ret.joinedChatroom = user.joinedChatroom;//
          ret.email = user.email;
          ret.birthday = user.birthday;
          ret.reported = user.reported;

          resolve(ret);
        }

      }, onError.bind(null, reject));
    });
  }

  this.getFavorites = function (token) {
    return new Promise(function (resolve, reject) {

      var dramalist = [];

      $http({
        method: "GET",
        url: HOST_URL + "/api/v1/dramas/popular?limit=" + limit,
        headers: {
          'token': token
        }
      }).then(function mySuccess(response) {

        var res = response.data;
        if (0 === res.status) {
          var dramas = res.value;

          dramalist = dramas.map(function (drama) {
            var ret = new Drama();

            ret.id = drama._id;
            ret.title = drama.title;
            ret.channel = drama.channel;
            ret.chatrooms = drama.chatrooms;

            console.log(ret);
            return ret;
          });

          resolve(dramalist);
        }

      }, onError.bind(null, reject));
    });
  }

});