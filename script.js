/* ==========================================
   NEON CLOCK PRO 2.0
   JavaScript - Part 1
========================================== */


// Elements

const time = document.getElementById("time");
const date = document.getElementById("date");
const ampm = document.getElementById("ampm");

const indiaTime = document.getElementById("indiaTime");
const ukTime = document.getElementById("ukTime");
const usTime = document.getElementById("usTime");
const japanTime = document.getElementById("japanTime");

const themeBtn = document.getElementById("themeBtn");


// Live Main Clock

function updateClock(){

    const now = new Date();


    let hours = now.getHours();

    let minutes = now.getMinutes();

    let seconds = now.getSeconds();


    let period = hours >= 12 ? "PM" : "AM";


    hours = hours % 12 || 12;


    hours = String(hours).padStart(2,"0");

    minutes = String(minutes).padStart(2,"0");

    seconds = String(seconds).padStart(2,"0");


    time.innerHTML =
        `${hours}:${minutes}:${seconds}`;


    ampm.innerHTML = period;



    const options = {

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    };


    date.innerHTML =
        now.toLocaleDateString(
            "en-US",
            options
        );

}


// World Clock Function

function updateWorldClock(){


    const india = new Date()
        .toLocaleTimeString(
            "en-US",
            {
                timeZone:"Asia/Kolkata",
                hour12:false
            }
        );


    const london = new Date()
        .toLocaleTimeString(
            "en-US",
            {
                timeZone:"Europe/London",
                hour12:false
            }
        );


    const newYork = new Date()
        .toLocaleTimeString(
            "en-US",
            {
                timeZone:"America/New_York",
                hour12:false
            }
        );


    const tokyo = new Date()
        .toLocaleTimeString(
            "en-US",
            {
                timeZone:"Asia/Tokyo",
                hour12:false
            }
        );


    indiaTime.innerHTML = india;

    ukTime.innerHTML = london;

    usTime.innerHTML = newYork;

    japanTime.innerHTML = tokyo;

}


// Run Clock

updateClock();

updateWorldClock();


setInterval(updateClock,1000);

setInterval(updateWorldClock,1000);



// Theme Change

let dark = true;


themeBtn.addEventListener(
    "click",
    ()=>{


        dark = !dark;


        if(dark){

            document.body.style.background =
            "linear-gradient(135deg,#050816,#0a1024)";

            themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        }

        else{

            document.body.style.background =
            "linear-gradient(135deg,#ffffff,#d9f7ff)";


            themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        }

    }
);
/* ==========================================
   NEON CLOCK PRO 2.0
   JavaScript - Part 2
========================================== */


/* ===========================
   ALARM SYSTEM
=========================== */

const alarmTime = document.getElementById("alarmTime");
const setAlarm = document.getElementById("setAlarm");
const clearAlarm = document.getElementById("clearAlarm");
const alarmStatus = document.getElementById("alarmStatus");

const alarmAudio = document.getElementById("alarmAudio");


let alarm = null;



// Set Alarm

setAlarm.addEventListener(
    "click",
    ()=>{

        if(alarmTime.value===""){

            alert("Please select alarm time");

            return;
        }


        alarm = alarmTime.value;


        alarmStatus.innerHTML =
        "Alarm Set : " + alarm;


    }
);



// Clear Alarm

clearAlarm.addEventListener(
    "click",
    ()=>{


        alarm = null;


        alarmStatus.innerHTML =
        "No alarm set";


        alarmAudio.pause();


    }
);



// Check Alarm Every Second

setInterval(()=>{


    if(alarm){


        let now = new Date();


        let currentTime =
        now.getHours()
        .toString()
        .padStart(2,"0")
        + ":" +
        now.getMinutes()
        .toString()
        .padStart(2,"0");



        if(currentTime === alarm){


            alarmAudio.play();


            alert("⏰ Alarm Ringing!");


            alarm = null;


        }

    }


},1000);





/* ===========================
   STOPWATCH
=========================== */


const stopwatch =
document.getElementById("stopwatch");


const startSW =
document.getElementById("startSW");


const pauseSW =
document.getElementById("pauseSW");


const resetSW =
document.getElementById("resetSW");



let swSeconds = 0;

let swMinutes = 0;

let swHours = 0;


let stopwatchInterval = null;



function updateStopwatch(){


    swSeconds++;


    if(swSeconds === 60){

        swSeconds=0;

        swMinutes++;

    }


    if(swMinutes === 60){

        swMinutes=0;

        swHours++;

    }



    let h =
    String(swHours)
    .padStart(2,"0");


    let m =
    String(swMinutes)
    .padStart(2,"0");


    let s =
    String(swSeconds)
    .padStart(2,"0");



    stopwatch.innerHTML =
    `${h}:${m}:${s}`;


}



// Start Stopwatch

startSW.addEventListener(
    "click",
    ()=>{


        if(!stopwatchInterval){

            stopwatchInterval =
            setInterval(
                updateStopwatch,
                1000
            );

        }

    }
);



// Pause Stopwatch

pauseSW.addEventListener(
    "click",
    ()=>{


        clearInterval(
            stopwatchInterval
        );


        stopwatchInterval=null;


    }
);



// Reset Stopwatch

resetSW.addEventListener(
    "click",
    ()=>{


        clearInterval(
            stopwatchInterval
        );


        stopwatchInterval=null;


        swSeconds=0;

        swMinutes=0;

        swHours=0;


        stopwatch.innerHTML =
        "00:00:00";


    }
);
/* ==========================================
   NEON CLOCK PRO 2.0
   JavaScript - Part 3
========================================== */


/* ===========================
   COUNTDOWN TIMER
=========================== */


const minutesInput =
document.getElementById("minutes");


const countdown =
document.getElementById("countdown");


const startTimer =
document.getElementById("startTimer");


const resetTimer =
document.getElementById("resetTimer");



let timerSeconds = 0;

let timerInterval = null;



// Start Countdown

startTimer.addEventListener(
    "click",
    ()=>{


        if(timerInterval){

            return;

        }


        let minutes =
        parseInt(minutesInput.value);



        if(isNaN(minutes) || minutes<=0){

            alert("Enter valid minutes");

            return;

        }



        timerSeconds =
        minutes * 60;



        timerInterval =
        setInterval(()=>{


            let min =
            Math.floor(timerSeconds/60);



            let sec =
            timerSeconds % 60;



            countdown.innerHTML =

            `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;



            timerSeconds--;



            if(timerSeconds < 0){


                clearInterval(timerInterval);


                timerInterval=null;


                countdown.innerHTML =
                "Time Over ⏰";


                alert("Countdown Completed!");

            }



        },1000);


    }
);



// Reset Countdown

resetTimer.addEventListener(
    "click",
    ()=>{


        clearInterval(timerInterval);


        timerInterval=null;


        timerSeconds=0;


        countdown.innerHTML =
        "00:00";


        minutesInput.value="";


    }
);





/* ===========================
   Neon Color Animation
=========================== */


const colors = [

    "#00f7ff",

    "#ff00ff",

    "#00ff88",

    "#ff9800",

    "#8a2eff"

];


let colorIndex=0;



setInterval(()=>{


    colorIndex++;


    if(colorIndex >= colors.length){

        colorIndex=0;

    }



    document.documentElement
    .style.setProperty(
        "--primary",
        colors[colorIndex]
    );



},5000);





/* ===========================
   Page Load Animation
=========================== */


window.addEventListener(
    "load",
    ()=>{


        document
        .querySelector(".container")
        .style.opacity="1";


        console.log(
        "✨ Neon Clock Pro 2.0 Loaded Successfully!"
        );


    }
);