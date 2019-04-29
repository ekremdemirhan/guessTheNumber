const digitArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const successMessage = " IS CORRECT !! <br>";
const failMessage = " WAS THE ANSWER. <br> YOU DID NOT SOLVE IT :( <br>";

var target;
var timer;

function setupGame() {

    document.getElementById("userGuess").hidden = false;
    document.getElementById("getUserGuess").hidden = false;
    document.getElementById("restartGame").hidden = true;
    document.getElementById("guesses").innerHTML = "A NEW GAME STARTS. <br>";
    target = randomTarget();
    hint(target);
    timer = setTimeout(finishGame, 60000, target, failMessage);

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

    document.getElementById("guesses").innerHTML += target + message;
    document.getElementById("restartGame").hidden = false;
    document.getElementById("userGuess").hidden = true;
    document.getElementById("getUserGuess").hidden = true;
    clearTimeout(timer);
}

function validate(answer) {
    return answer.length === 4 && String.prototype.concat(...new Set(answer)).length === 4;
}

function checkGuess(answer) {

    if (!validate(answer)) {
        return;
    }
    var guessResult = correctNumbers(answer, target);
    if (guessResult.match(/\+\+\+\+/)) {
        finishGame(target, successMessage);
    } else {
        document.getElementById("guesses").innerHTML += answer + " " + guessResult + "<br>";
    }
}
