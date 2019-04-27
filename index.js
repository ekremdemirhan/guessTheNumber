var target;

function setupGame() {

    document.getElementById("restartGame").hidden=true;
    document.getElementById("guesses").innerHTML = "A NEW GAME STARTS. <br>"
    target = randomTarget();
    hint();
}

function getPlusMinus(answer, target) {

    let result = "";
    for (let i = 0; i < answer.length; i++) {
        if (answer.charAt(i) === target.charAt(i)) {
            result += "+";
        }
    }
    for (let i = 0; i < answer.length; i++) {
        for (let j = 0; j < answer.length; j++) {
            if (i === j) continue;
            if (answer.charAt(i) === target.charAt(j)) {
                result += "-";
            }
        }
    }
    return result;
}

function randomTarget() {

    let digitCount = 10;
    let digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let random = "";
    while (true) {
        if (random.length === 4) {
            break;
        }
        var index = Math.floor(Math.random() * digitCount);
        if (digits[index] === '0' && random.length === 0) {
            continue;
        }
        random += digits[index];
        digits.splice(index, 1);
        digitCount--;
    }
    return random;
}

function hint() {

    let guesses = document.getElementById("guesses");
    let hintGuess = randomTarget();
    guesses.innerHTML += hintGuess + " " + getPlusMinus(hintGuess, target) + "<br>";
    hintGuess = randomTarget();
    guesses.innerHTML += hintGuess + " " + getPlusMinus(hintGuess, target) + "<br>";
    hintGuess = randomTarget();
    guesses.innerHTML += hintGuess + " " + getPlusMinus(hintGuess, target) + "<br>";
}


function getUserInput() {

    var guess = document.getElementById('userGuess').value;
    checkGuess(guess);
}

function finishGame() {

    document.getElementById("guesses").innerHTML += "CORRECT !! <br>";
    document.getElementById("restartGame").hidden=false;
}

function checkGuess(answer) {

    var guessResult = getPlusMinus(answer, target);
    if (guessResult.match(/\+\+\+\+/)) {
        finishGame();
    } else {
        document.getElementById("guesses").innerHTML += answer + " " + guessResult + "<br>";
    }
}
