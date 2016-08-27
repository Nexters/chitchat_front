tchatroomApp = angular.module('tchatroomApp', []);

tchatroomApp.controller('tchatroomCtrl', function ($scope, $window) {

    var socket = io(HOST_URL);


    $scope.clearText = function () {
        $scope.mychat = "";
    }

    function init() {
        // 변수 초기화
        $scope.clearText();

        console.log(location.search);

        $scope.chatroomid = location.search.substring(1);
        console.log($scope.chatroomid);


        // event handler 추가
        socket.on('left', function (nickname) {
            $('#messages').append($('<li>').text(nickname + ': has left'));
        });

        socket.on('history', function (texts) {
            $('#messages').append($('<li>').text('history'));
            for (t of texts) {

                console.log(t);

                $('#messages').append($('<li>').text(t.uid.nickname + ': ' + t.message));
            }
            $('#messages').append($('<li>').text('-----------------------'));
        });

        socket.on('participants', function (participants) {
            $('#messages').append($('<li>').text('list of participants: '));
            for (p of participants) {
                $('#messages').append($('<li>').text(p.nickname));
            }
            $('#messages').append($('<li>').text('-----------------------'));

        });

        socket.on('errorToCli', function (msg) {
            $('#messages').append($('<li>').text('error occured on socket!: ' + msg));
        });

        socket.on('newMsg', function (user, msg) {
            console.log(user);
            console.log(msg);
            var text = "stranger: ";

            if (user === localStorage.uid) {
                text = "me: ";
            }

            text = text + msg.message;
            $('#messages').append($('<li>').text(text));
        });

        socket.on('joined', function (nickname) {
            $('#messages').append($('<li>').text(nickname + ': has joined'));
            socket.emit('getTexts', 0, 100);
        });

        // join chat room

        socket.emit('joinRoom', $window.localStorage.token, $scope.chatroomid);
    }


    $scope.sendChat = function () {
        console.log($scope.mychat);

        socket.emit('sendText', $scope.mychat);

        $scope.clearText();

        return false;
    }

    $scope.getChat = function () {
        socket.emit('getTexts', 0, 100);
    }



    init();
});
