tschedularApp.service('dramaService', function ($http) {
  this.retrieveDramas = function (timeStart, timeEnd) {
    return new Promise(function (resolve, reject) {

      var dramalist = [];

      $http({
        method: "GET",
        url: HOST_URL + "/api/v1/dramas?airtimeStart="
        + timeStart + '&airtimeEnd='
        + timeEnd
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

            //총시간 추가
            if (drama.title == "testDrama1") {
              ret.totaltime = 70;
            }

            console.log(ret);
            return ret;
          });

          resolve(dramalist);
        }

      }, function myError(response) {
        var errorcode = response.statustext;
        console.log("error : ".errorcode);
        reject();
      });
    });
  }

  this.getPopularDramas = function (limit) {
    return new Promise(function (resolve, reject) {

      var dramalist = [];

      $http({
        method: "GET",
        url: HOST_URL + "/api/v1/dramas/popular?limit=" + limit
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

      }, function myError(response) {
        var errorcode = response.statustext;
        console.log("error : ".errorcode);
        reject();
      });
    });
  }


});