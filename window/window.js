window.onload = function () {

    var switchBoolean = false;

    const socket = io();

    socket.on("switch", data =>{

        if(data){

            switchBoolean = true;

            document.getElementsByClassName("drug_bar")[0].src="/img/leaf_right.png";

            document.getElementsByClassName("speech_img")[0].src = "/img/sing.gif";

        }else{

            switchBoolean = false;

            document.getElementsByClassName("drug_bar")[0].src="/img/leaf_right.png";

            document.getElementsByClassName("speech_img")[0].src = "/img/speach_front.png";
        }
    });

    function speechStart(){

        socket.emit("switch","change");

        document.getElementsByClassName("drug_bar")[0].src="/img/leaf_right.png";

        document.getElementsByClassName("speech_img")[0].src = "/img/sing.gif";
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    setInterval(() => {

        if(!switchBoolean){

            var random = getRandomInt(40);

            if(0 <= random && 2 >= random){
    
                document.getElementsByClassName("drug_bar")[0].src="/img/leaf_left.png";
    
                document.getElementsByClassName("speech_img")[0].src = "/img/speach_left_walk.gif";
    
                //    socket.emit("sideMove","left");
    
            }else if(3 <= random && 5 >= random){
            
                document.getElementsByClassName("drug_bar")[0].src="/img/leaf_right.png";
    
                document.getElementsByClassName("speech_img")[0].src = "/img/speach_right_walk.gif";
    
                //  socket.emit("sideMove","right");
    
            }else if(5 <= random && 20 >= random){
    
                document.getElementsByClassName("drug_bar")[0].src="/img/leaf_right.png";
    
                document.getElementsByClassName("speech_img")[0].src = "/img/speach_front.png";
    
            }else if(21 <= random && 35 >= random){
    
                document.getElementsByClassName("drug_bar")[0].src="/img/leaf_left.png";
    
                document.getElementsByClassName("speech_img")[0].src = "/img/speach_front.png";
    
            }else if(35 <= random && 37 >= random){
    
                document.getElementsByClassName("drug_bar")[0].src="/img/leaf_left.png";
    
                document.getElementsByClassName("speech_img")[0].src = "/img/speach_sleep.png";
    
            }

        }

    }, 5000);

    document.getElementsByClassName("speech_img")[0].onclick = function() {

        speechStart();
    };

    // long_press(document.getElementsByClassName("speech_img")[0], normal_func, long_func, check_sec);


    
}