window.addEventListener("DOMContentLoaded", () => {


const tiles = Array.from(document.querySelectorAll(".tile"));
const playerDisplay = document.querySelector(".playerDisplay");
const resetButton = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");
const scoreX = document.querySelector(".scoreX");
const scoreO = document.querySelector(".scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const PLAYERX_WON = "PLAYER X WON!";
const PLAYERO_WON = "PLAYER O WON!";
const TIE = "TIE";

let playerXScore = 0
let playerOScore = 0

// WINNING CONDITIONS ARRAY

// Game winning states according to the array index:

/*

[0] [1] [2]
[3] [4] [5]
[6] [7] [8]

*/

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// TILES ARRAY EVENT LISTENER

/* This attaches an event listener to every tile in the array. Once a tile is clicked, the userAction function will be invoked. 

userAction - 'tile' is used to update the User Interface, whilst 'index' updates our in memory saved board array. */

tiles.forEach( (tile, index) => {
    tile.addEventListener("click", () => userAction(tile,index));
})


/* CHANGE PLAYER FUNCTION 

This is used in the userAction Function. 
1) Clears the classList of playerDisplay. 
2) Checks to see if currentPlayer = X
3) If it is X, it will change to O and vice versa
4) Changes the HTML of the player display to display the current playerl O or X.
5) Modifies the classList to the current player. 

*/

const changePlayer = () => {
 
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    /* ?: is a conditional (ternary) operator. Here's the syntax: 
    condition ? exprIfTrue : exprIfFalse
    It works via providing a condition, in this case, does currentPlayer === "X"?. If currentPlayer is X, currentPlayer = O etc. */ 
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}


// FUNCTION TO ADD TO SCORE

const changeScore = () => {
    if (currentPlayer === "X") {
        playerXScore ++
        scoreX.textContent = playerXScore
    }
    if (currentPlayer === "O") {
        playerOScore ++
        scoreO.textContent = playerOScore
    }
}


/* RESULTS VALIDATION FUNCTION

This function checks if there is a winner or not. It does this by looping through the 'Winning Conditions' array and sub-arrays. We will check if the current array has the same array as these indexes. If any of the 3 elements is an empty string, aka tile, we will skip that iteration using the 'continue' key word. If they are equal, then we set the 'round won' variable to 2. 

1 loop results in the following:

winCondition = winningCondition[i] - 1st loop, this equals to winningCondition[0]. This means that 

winCondition = [0, 1, 2]

a = board[0] - X or O?
b = board[1] - X or O?
c = board[2] - X or O?

In other words, this loop, we are checking to see if there are X's or O's in these index spots on the board. 

userAction function and tiles.forEach eventListener Function populates the board array with either X's or O's. 

roundWon = true when a === b && b === c - Meaning, a,b & c has recorded all X's or all O's. 

If this is the case, the round is won. If not, the loop will run again, this time, looping through winningCondition[1] which means that the winCondition is [3, 4, 5] this time. i.e;

a = board[3] - X or O?
b = board[4] - X or O?
c = board[5] - X or O?

*/



function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === "X" ?  PLAYERX_WON : PLAYERO_WON);
        changeScore();
        isGameActive = false;
        return;
    }

    if (!board.includes(""))
        announce(TIE);
}


// UPDATE BOARD FUNCTION

const updateBoard = (index) => {
    board[index] = currentPlayer;
}


/* ANNOUCEMENT FUNCTION - 

The switch statement evaluates an expression, matching the expression's value against a series of case clauses, and executes statements after the first case clause with a matching value, until a break statement is encountered. The default clause of a switch statement will be jumped to if no case matches the expression's value.

3 cases have been provided below. 

*/

const announce = (type) => {
    switch(type) {
        case PLAYERO_WON:
            announcer.innerHTML = `Player <span class="playerO">O</span> Won!`;
            break;
        case PLAYERX_WON:
            announcer.innerHTML = `Player <span class="playerX">X</span> Won!`;
            break;
        case TIE:
            announcer.innerHTML = `Tie!`;
    }
    announcer.classList.remove("hide")
}


// IS VALID ACTION FUNCTION

// This ensure that players only click on empty tiles and don't overwrite tiles. 

const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "O"){
        return false;
    }

    return true;
}


// RESET BOARD FUNCTION

/* 
Resets the board array, and removes X's and O's. 
Sets game isGameActive to true.
Changes player back to X
Clears the tiles. 
*/ 


const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
        changePlayer()
    }

    tiles.forEach(tile => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO");
    })
}


/* USER ACTION FUNCTION 
This represents a 'turn' in the game and will be called when a user clicks on a tile.

First it checks if the step is a valid action, and if the game is active. If both conditions are true, it will change the innerText and classList to the currentPlayer variable, which is X or O. 

After that, the board is updated, the results are validated and there is a change of players. */

const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add (`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }

}

    resetButton.addEventListener("click", resetBoard);


});

