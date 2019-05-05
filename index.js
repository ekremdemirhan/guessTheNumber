const digitArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const successMessage = " IS CORRECT !! <br>";
const failMessage = " WAS THE ANSWER. <br> GAME OVER. <br>";
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

var target;
var remainingTime = 120;
var timer;
var score = 0;

function setupGame() {

    document.getElementById("userGuess").hidden = false;
    document.getElementById("getUserGuess").hidden = false;
    document.getElementById("newGame").hidden = true;
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("score").innerHTML = "SCORE: " + score + "<br>";
    target = randomTarget();
    hint(target);
    remainingTime = 120;
    startTimer();
}

function startTimer() {

    remainingTime--;
    let minutes = Math.floor(remainingTime/60);
    let seconds = remainingTime%60;
    document.getElementById("timer").innerHTML = "TIME: 0" + (minutes < 1 ? "0" : String(minutes)) + ":" + (seconds < 10 ? "0" : "") + String(seconds);
    if(remainingTime === 0) {
        finishGameAsLost(target, failMessage);
    }
    else {
        timer = setTimeout(startTimer, 1000);
    }
}
function onCorrectPlace(answer, target, index = 0) {

    if (answer.length === index) {
        return "";
    }
    if (answer.charAt(index) === target.charAt(index)) {
        return "+" + onCorrectPlace(answer, target, index + 1);
    }
    return onCorrectPlace(answer, target, index + 1);
}

function onWrongPlace(answer, target, index = 0) {

    if (answer.length === index) {
        return "";
    }
    if (answer.split("").filter(digit => answer.charAt(index) !== digit).includes(target.charAt(index))) {
        return "-" + onWrongPlace(answer, target, index + 1);
    }
    return onWrongPlace(answer, target, index + 1);
}

function correctNumbers(answer, target) {
    return onCorrectPlace(answer, target) + onWrongPlace(answer, target);
}

function createRandomTarget(digitArr, randomNumber, digitCount = 10) {

    if (randomNumber.length === 4) {
        return randomNumber;
    }
    let index = Math.floor(Math.random() * digitCount);
    if (digitArr[index] === '0' && randomNumber.length === 0) {
        return createRandomTarget(digitArr, randomNumber, digitCount);
    }
    return createRandomTarget(digitArr.filter(digit => digitArr[index] !== digit), randomNumber + digitArr[index], digitCount - 1);
}

function randomTarget() {

    return createRandomTarget(digitArr, "", digitArr.length);
}

function hint(target) {

    let guesses = document.getElementById("guesses");
    let hintGuess = randomTarget();
    guesses.innerHTML += hintGuess + " " + correctNumbers(hintGuess, target) + "<br>";
    hintGuess = randomTarget();
    guesses.innerHTML += hintGuess + " " + correctNumbers(hintGuess, target) + "<br>";
    hintGuess = randomTarget();
    guesses.innerHTML += hintGuess + " " + correctNumbers(hintGuess, target) + "<br>";
}


function getUserInput() {

    let guess = document.getElementById('userGuess').value;
    checkGuess(guess);
}

function finishGame(target, message) {

    document.getElementById("guesses").innerHTML = target + message + "<br>" + document.getElementById("guesses").innerHTML;
    document.getElementById("guesses").innerHTML = "BE READY FOR NEXT ROUND<br>" + document.getElementById("guesses").innerHTML;
    document.getElementById("userGuess").hidden = true;
    document.getElementById("getUserGuess").hidden = true;
    score++;
    clearTimeout(timer);
    sleep(3000).then(() => {
        setupGame();
    })

}

function finishGameAsLost(target, message) {

    document.getElementById("guesses").innerHTML = target + message + "<br>" + document.getElementById("guesses").innerHTML;;;
    document.getElementById("newGame").hidden = false;
    document.getElementById("userGuess").hidden = true;
    document.getElementById("getUserGuess").hidden = true;
    score = 0;
    clearTimeout(timer);
    score = 0;
}

function validate(answer) {
    return answer.length === 4 && String.prototype.concat(...new Set(answer)).length === 4;
}

function checkGuess(answer) {

    if (!validate(answer)) {
        return;
    }

    document.getElementById("userGuess").value = "";
    var guessResult = correctNumbers(answer, target);
    if (guessResult.match(/\+\+\+\+/)) {
        finishGame(target, successMessage);
    } else {
        document.getElementById("guesses").innerHTML = answer + " " + guessResult + "<br>" + document.getElementById("guesses").innerHTML;
    }
}
