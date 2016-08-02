function retrieveUserInfo() {
  FB.api('/me?fields=id,name,email,gender', function (response) {
    createChitChatAccount(response.id, response.name, response.gender, response.email)
  });
}

function retrieveUserIDwithFBID(fbID) {
  httpUtil.get(HOST_URL + 'api/v1/users?fbid=' + fbID, null, function (err, result) {
    if (err) {
      // error
    } else if (result.status === 0) {
      // user found
      // maybe redirect to some page?/??
    } else if (result.status === 101) {
      // user not found
      retrieveUserInfo();
    } else {
      // error
    }
  });
}

function createChitChatAccount(fbID, name, gender, email) {
  var params = {
    fbID: fbID,
    name: name,
    gender: gender,
    email: email
  };
  httpUtil.post(HOST_URL + 'api/v1/users', parms, function (err, result) {
    if (result && result.status === 0) {
      // success
      // maybe redirect to some page?/??
    } else {
      // error
    }
  });
}