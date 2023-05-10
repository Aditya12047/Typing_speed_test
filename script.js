const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var texts = [
    "He found himself sitting at his computer, typing whatever came to mind. He was on a website entitled 10 fast fingers. This site tested how fast you were at typing. So he typed. He was currently typing about himself typing, which is odd in a way. He was now describing about how he was typing about himself typing.",
    "As I wandered through the enchanted forest, I marveled at the towering trees and the mystical creatures that flitted between them. The air was alive with the sound of rustling leaves and the chirping of birds. Suddenly, a burst of color caught my eye, and I turned to see a brilliantly hued butterfly dancing on the breeze. Mesmerized, I followed the fluttering creature deeper into the forest, my heart racing with excitement."
]



function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}



function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}



function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.innerHTML.substring(0, textEntered.length);

    if (textEntered == originText.innerHTML) {
        clearInterval(interval);  
        testWrapper.style.borderColor = "#66ff33"; 
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#00BFFF"; 
        } else {
            testWrapper.style.borderColor = "#DC0809" 
        }
    }
}



function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);  
    }
}



function reset() {
    clearInterval(interval); 
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "#8854d0";
    originText.innerHTML = texts[Math.floor(Math.random() * texts.length)];
}



testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
