const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    let hintGuess = randomTarget();
    console.log(hintGuess + " " + getPlusMinus(hintGuess, target));
    hintGuess = randomTarget();
    console.log(hintGuess + " " + getPlusMinus(hintGuess, target));
    hintGuess = randomTarget();
    console.log(hintGuess + " " + getPlusMinus(hintGuess, target));
}


function getUserInput() {
    var guess = document.getElementById('userGuess').value;
    document.getElementById("demo").innerHTML = "<br><lu><li>"+guess+"</li></lu></br>";

    // document.writeln("<br><lu><li>"+guess+"</li></lu></br>");
}
function play() {

    var target = randomTarget();

    hint();

    rl.on('line', (answer) => {

        var guessResult = getPlusMinus(answer, target);
        if (guessResult.match(/\+\+\+\+/)) {

            console.log("correct!")
            target = randomTarget();
            hint();
        } else {
            console.log(answer + " " + guessResult);
        }
    });
}