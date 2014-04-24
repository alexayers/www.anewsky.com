/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room0() {
    
    this.Init = function() {
        room = new Room();
        
        background_layer = new Layer();
        background_layer.LoadImages("img/objects/nothing.png");
        background_layer.DoNotAutoPlay();
        room.SetBackgroundLayer(background_layer);
        
        room.SetOneTimeCallBack( function () {
            $("#subtitle").text("");
            $("#maintitle").text("");
            this.SpecialCase();
        });
        
        scene.AddBackground("Room0", room);
    }
    
    this.SpecialCase = function () {      
       var audio_codec = sound_engine.GetAudioCodec();
        
        buffer = new Audio("audio/" + audio_codec + "/badlanding." + audio_codec);
        buffer.play();
        
        console.log("audio/" + audio_codec + "/badlanding." + audio_codec);
        
        buffer.addEventListener('ended', function() {
            buffer.pause();
            $("#subtitle").text("");
            $("#subtitle").css("display","none");
            $("#maintitle").css("display","none");
            scene.SetScene(1);
        }, false);
            
        buffer.addEventListener('timeupdate', function (){
            if (this.currentTime >= 0 && this.currentTime <= 2) {
                $("#subtitle").css("display","block");
                $("#maintitle").css("display","block");
            } else if (this.currentTime >= 5 && this.currentTime <= 7) {
                $("#subtitle").css("display","block");
                $("#maintitle").css("display","block");
                $("#subtitle").text("As far as I'm concerned...");
            } else if (this.currentTime >= 3 && this.currentTime <=4 &&
                this.currentTime >= 7 && this.currentTime <= 8 &&
                this.currentTime >= 12 && this.currentTime <= 13) {
                $("#subtitle").text("");
            } else if (this.currentTime > 9 && this.currentTime <= 11) {
                $("#subtitle").css("display","block");
                $("#maintitle").css("display","block");
                $("#subtitle").text("that son of a bitch had it coming...");
            } else if (this.currentTime > 14 && this.currentTime <= 17) {
                $("#maintitle").text("A NEW SKY");
                $("#subtitle").css("display","block");
                $("#maintitle").css("display","block");
            } else {
                $("#subtitle").text("");
                $("#maintitle").text("");
                $("#subtitle").css("display","none");
                $("#maintitle").css("display","none");
            }

        }, false);
        
    }
    
    this.Init();
}