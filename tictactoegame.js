/**
 * @project: TIC-TAC-TOE
 * @author: Imtiaz Adar
 * @copyright: imtiazadarofficial@gmail.com
 */

// variables
let moveSound = new Audio("moveSound.mp3");
let winSound = new Audio("winSound2.wav");
let drawSound = new Audio("drawSound1.wav");
let resetSound = new Audio("resetSound2.wav");
let move = "X";
let gameRunning = true;
let winner = false;
let demo = false;
let count = 0;

// queries
let cells = document.querySelectorAll(".cell");
console.log(cells);
let resultVariable = document.querySelector(".winner");
console.log(resultVariable);
let resetGame = document.querySelector(".playAgain");
console.log(resetGame);
let playerTurn = document.querySelector(".turn");
console.log(playerTurn);

// play sounds with duration
function playSoundWithDuration(sound, duration){
    sound.currentTime = 0;
    sound.play();
    setTimeout(()=>{
        sound.pause();
        sound.currentTime = 0;
    }, duration);
}

// winning positions
const winningPositions = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [3, 4, 5], 
    [2, 4, 6], [6, 7, 8]
];

// update move
let changeMove= ()=>{
    return move === "O"? "X": "O";
}

// check winner
let checkWinner= ()=>{
    winningPositions.forEach(pos=>{
        if(cells[pos[0]].innerText !== "" && cells[pos[0]].innerText === cells[pos[1]].innerText 
            && cells[pos[1]].innerText === cells[pos[2]].innerText){
            cells[pos[0]].style.backgroundColor = "#ffff00";
            cells[pos[1]].style.backgroundColor = "#ffff00";
            cells[pos[2]].style.backgroundColor = "#ffff00";
            if(move === "X"){
                
                // playerTurn.innerText = `Player's Turn: ${move}`;
                resultVariable.innerText = 'Result: Player-O Wins';
                resultVariable.style.fontFamily = "'Orbitron', sans-serif";
                resultVariable.style.fontWeight = "bolder";
            }
            else{
                //playerTurn.innerText = `Player's Turn: ${move}`;
                resultVariable.innerText = 'Result: Player-X Wins';
                resultVariable.style.fontFamily = "'Orbitron', sans-serif";
                resultVariable.style.fontWeight = "bolder";
            }
            winner = true;
            demo = true;
            
            gameRunning = false;
            
            winSound.play().catch(e => console.log("Audio play failed:", e));
        }
        
    });

    if(!demo && count === 9){
        resultVariable.innerText = "Result: Match Has Been Drawn";
        resultVariable.style.fontFamily = "'Orbitron', sans-serif";
        resultVariable.style.fontWeight = "bolder";
        drawSound.play().catch(e => console.log("Audio play failed:", e));;
        winner = true;
        gameRunning = false;
    }

}


[moveSound, winSound, drawSound, resetSound].forEach(e=>{
    e.addEventListener('error', () => {
        console.log(`Failed to load the audio ${e.src}`);
    });
});

cells.forEach(cell=>{
    cell.addEventListener("click", ()=>{
        if(gameRunning && cell.innerText === ""){
            cell.innerText = move;
            playSoundWithDuration(moveSound, 1000);
            move = changeMove();
            playerTurn.innerText = `Player's Turn: ${move}`;
            playerTurn.style.fontFamily = "'Orbitron', sans-serif";
            playerTurn.style.fontWeight = "bolder";
            count++;
            checkWinner();
        }
    });
});

// start main logic
resetGame.addEventListener("click", ()=>{
    cells.forEach(cell=>{
        cell.innerText = "";
        cell.style.backgroundColor = "";
    });
    // winningPositions.forEach(pos=>{
    //     cells[pos[0]].style.backgroundColor = "#006633";
    //     cells[pos[1]].style.backgroundColor = "#006633";
    //     cells[pos[2]].style.backgroundColor = "#006633";
    // })
    
  
    resetSound.play().catch(e => console.log("Audio play failed:", e));
    move = playerTurn.innerText.slice(15,17);
    gameRunning = true;
    winner = false;
    demo = false;
    count = 0;
    resultVariable.innerText = "Result: ";
    resultVariable.style.fontWeight = "bolder";
    resetGame.style.backgroundColor = "";
    resetGame.style.color = "";
    resetGame.style.transform = "";
    resetGame.style.boxShadow = "";
});