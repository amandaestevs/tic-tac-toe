const circle = 'circle';
const X = 'x';
let xTurn = true;

const xMoves = [];
const circleMoves = [];

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick)
})

function handleClick(event){
    const cellClicked = event.target;
    const cellId = cellClicked.id;
    
    let currentPlayer = xTurn ? X : circle;

    if (cellClicked.classList.contains('circle') || cellClicked.classList.contains('x')){
        return
    }

    placeMarks(currentPlayer, cellClicked, cellId)
}

function placeMarks(currentPlayer, cellClicked, cellId){
    if (currentPlayer === X){
        cellClicked.classList.add('x');
        xMoves.push(parseInt(cellId));
    } else {
        cellClicked.classList.add('circle');
        circleMoves.push(parseInt(cellId));
    }
    swapTurns();
    checkGameStatus(currentPlayer);
}

function swapTurns(){
    xTurn =! xTurn;
}

function checkGameStatus(currentPlayer){
   winningCombinations.forEach(combination => {
    let xWins = false;
    let circleWins = false;

    xWins = combination.every(combo => xMoves.includes(combo));
    circleWins = combination.every(combo => circleMoves.includes(combo));

    if (xWins || circleWins){
        gameOverPage(currentPlayer)
    } else {
        checkDraw()
    }
   })
}

function checkDraw(){
    let cellsArray = [];
    cellsArray = xMoves.concat(circleMoves);
    if (cellsArray.length === 9){
        gameOverPage('draw')
    }
}

function gameOverPage(winner){
   const winningPage = document.querySelector('.game-over-page');
   const winningMessage = document.querySelector('.winning-message');
   const resetBtn = document.querySelector('#resetBtn');
   
   let gameOver = true;
   if (gameOver){
    winningPage.style.display = 'flex'
   } 

   resetBtn.addEventListener('click', ()=> {
    window.location.reload();
   })

   if (winner === 'draw'){
    winningMessage.textContent = `It's a draw!`
   } else {
   const winningText = `${winner} WINS`
   winningMessage.textContent = winningText.toUpperCase();
}
}

const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8]
]