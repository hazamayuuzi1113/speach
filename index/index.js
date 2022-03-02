var buttonClickStart = false;
var buttonClickPast = false;


window.onload = function() {

    const socket = io();

    const speech = new webkitSpeechRecognition();
    speech.lang = 'ja-JP';
    
    const content = document.getElementById('content');
    
    speech.onresult = function(e) {
        speech.stop();
        if(e.results[0].isFinal){

            const date = new Date();
        
            var autoText =  e.results[0][0].transcript
            content.innerHTML += '<div class="content_text">'+date.toLocaleString() +'　:　'+ autoText +'</div>';

            socket.emit("soundMessage",autoText);
        
        }
    }
    
    speech.addEventListener('result' , function(e) {
      // 音声認識で取得した情報を、コンソール画面に表示
        console.log(e);
    
    });

    var speechBoolean = false;
    
    speech.onspeechend = () => { 

        console.log('on speech end');

        speechBoolean = true;
    }

    speech.onend = () => { 
        
        if(speechBoolean){

            speech.start();
        }

        speechBoolean = false;
    }

    socket.on("switch",data =>{

        if(data){

            speech.start();

        }else{

            speech.stop();
        }
    });

    socket.on("close",data =>{

        window.close();
        
    });

    var keyStatus = [];
    
    window.addEventListener("keydown", function(e){

        keyStatus.push(e.key);

    });

    window.addEventListener("keyup", function(e){

        e.preventDefault();

        if(buttonClickStart){

            socket.emit("settingStart",e.key);

            console.log(keyStatus);

            document.getElementsByClassName("setting_start_show")[0].innerHTML = e.key;

            buttonClickStart = false;
        }
        
        if(buttonClickPast){

            socket.emit("settingPast",keyStatus);

            console.log(keyStatus);

            document.getElementsByClassName("setting_past_show")[0].innerHTML = keyStatus;

            buttonClickPast = false;
        }

        keyStatus.length = 0;

    });

    socket.on("firstKeyStart",data =>{

        document.getElementsByClassName("setting_start_show")[0].innerHTML = data;

        socket.emit("settingStart",data);

    });

    socket.on("firstKeyPast",data =>{

        document.getElementsByClassName("setting_past_show")[0].innerHTML = data;

        socket.emit("settingPast",data);

    });

    socket.on("firstKeyPast",data =>{

        document.getElementsByClassName("setting_past_show")[0].innerHTML = data;

        socket.emit("setting",data);

    });
};

function settingStartButton(){

    buttonClickStart = true;

    document.getElementsByClassName("setting_start_show")[0].innerHTML = "キーを押してください";
}
function settingPastButton(){

    buttonClickPast = true;

    document.getElementsByClassName("setting_past_show")[0].innerHTML = "キーを押してください";
}