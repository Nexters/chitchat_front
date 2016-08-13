
var tschedularApp = angular.module('tschedularApp',[]);

function Drama(dramaid, dramatitle, dramachannel){
    this.id = dramaid;
    this.title = dramatitle;
    this.channel = dramachannel;
}


tschedularApp.controller('tschedularCtrl', function($scope, $http, $window, $interval){
    $scope.mon = "mon";
    $scope.tue = "thu";
    $scope.wed = "수";
    $scope.thu = "목";
    $scope.fri = "금";
    $scope.sat = "토";
    $scope.sun = "일";
    $scope.checked = false;
    
   
    $scope.dramaid ="";
    $scope.dramatitle = "";
    $scope.dramachatrooms = "";
    $scope.dramacategory = "";
    $scope.dramaairTimeCurrent = 0;
    $scope.dramaairTimeFuture = 0;
    $scope.dramatotalminute =0; //future - current;
    $scope.day = ""; //현재 요일탭
    $scope.dramalist = [];

    $scope.openNewWindows = function(){
        var left = screen.width / 2 - 300, top = screen.height / 2 - 350
        $window.open('chatroom.html', '', "top=" + top + ",left=" + left + ",width=400,height=600")    
    }
  
    //채팅창 입장!
    $scope.alertfunction = function(title){
        alert(title);
    }



   $scope.callJson = function(day){
       
      
       $scope.day = day;
        //console.log($scope.day);
       if($scope.checked){
           return ;
       }
    //get today date
    var d = new Date();
    var n = d.toJSON();
    console.log(n);



        $http({
                method: "POST",
                url : "",
                data : ""
                
            }).then(function mySuccess(response) {
                    var json = response.data;
                    for(var a = 0; a < json.length; a++){
                        var drama = new Drama();
                            drama.id= json[a]["_id"];
                            drama.title = json[a]["title"];
                            drama.channel = json[a]["channel"];
                            $scope.dramalist.push(drama);
                        // console.log(drama);
                            //console.log($scope.dramalist);
                            $scope.checked = true;
                    }
                    
            }, function myError(response) {
                var errorcode = response.statustext;
                console.log("error : ".errorcode);
                
            }); 


       
   }//callJson





});


    $('table tbody').sortable({
        helper: fixWidthHelper
     })
        
    function fixWidthHelper(e, ui) {
        ui.children().each(function() {
            $(this).width($(this).width());
        });
        return ui;
    }

