const WordList = ["apple", "cries", "harsh", "glass", "crown", "brass", "looks", "books", "crook", "juice"] /*We'll be working with this array to get random words*/

let displayWord = [];
let chosenWord = "";
let incorrectGuesses = [];
let ranLet = [];
let remainingGuesses = 5; // i guess here we just define the elements that we are going to be using in this script?

const display = document.getElementById("display"); // getting the html elements
const incorrectGuessesDisplay = document.getElementById("incorrectGuesses");
const remainingGuessesDisplay = document.getElementById("remainingGuesses");
const messageDisplay = document.getElementById("message");
const restartButton = document.querySelector("#Restart");



function start(){ // we define this function in order to reset variables 
    chosenWord = WordList[Math.floor(Math.random()*WordList.length)]; // pick a random word
    displayWord = Array(chosenWord.length).fill("_");
    incorrectGuesses = [];
    remainingGuesses=5;

    ranLet = [];
    while (ranLet.length < 2){
        let pos = Math.floor(Math.random() * chosenWord.length)
        if (!ranLet.includes(pos)){
            ranLet.push(pos);
            displayWord[pos] = chosenWord[pos];
        }
    }

    // reset the page
    display.textContent = displayWord.join (" "); // instead of spaces we use commas
    incorrectGuessesDisplay.textContent = "";
    remainingGuessesDisplay.textContent = remainingGuesses;
    messageDisplay.textContent = ""; 
}



// function that tracks the inputs of the users keyboard
function Input(event) {
    const guess = event.key.toLowerCase();
    if (isLetter(guess)){
        if(chosenWord.includes(guess)){
            for (let i = 0; i < chosenWord.length; i++){
                if (chosenWord[i] === guess){
                    displayWord[i] = guess;
                }
            }
        }
        else if(!incorrectGuesses.includes(guess)) {
            incorrectGuesses.push(guess);
            remainingGuesses--;
        }
    }
    
    //update the display after a guess
    display.innerText = displayWord.join(" ");
    incorrectGuessesDisplay.innerText = incorrectGuesses.join(", ");
    remainingGuessesDisplay.innerText = remainingGuesses;

    // check for a win or a loss
    if (!displayWord.includes("_")){
        messageDisplay.textContent = "Pobedi!";
        window.removeEventListener("keydown", Input);
        if(window.confirm("Pobedi! Stisni OK za da igras pak.")){
            start();
            window.addEventListener("keydown", Input);
        }
    }
    else if (remainingGuesses <=0) {
        messageDisplay.textContent = "Zalam, obidi se povtorno. Zborot bese: " + chosenWord;
        window.removeEventListener("keydown", Input);
        if(window.confirm("Zalam, obidi se povtorno. Zborot bese " + chosenWord + ". Stisni OK za da igras pak.")){
            start();
            window.addEventListener("keydown", Input);
        }
    }
}

function isLetter(key){ // check if the keyboard press was a letter
    return key.length === 1 && (key >= 'a' && key <= 'z' || key >= 'A' && key <= 'Z'); // koristime ovoj pristpap odkolku so charcode
}                                                                                      // poradi toa sto keys kako shift sepak se pokazuvaat, ova proveruva dali ima dolzina pogolem od eden, pa sporeduva direktno so bukvi.

start(); // intialize the game
window.addEventListener("keydown", Input); // this is what classifies the keystroke as an "event"
restartButton.addEventListener("click", () => { // re-add the eventlistener after winning the game.
    start();
    window.addEventListener("keydown", Input); 
})