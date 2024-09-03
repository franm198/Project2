import './style.css';

// Variables \\

let currentPlayer: string = 'X'; //The Game always begins with Player X
let gameBoard: string[] = ['', '', '', '', '', '', '', '', '']; //This is the 3x3 grid squares
let gameStateActive = true;

// Player Turns - Handling which player is active \\

function handlePlayerTurn(clickedGridSquareIndex: number) {
  if (gameBoard[clickedGridSquareIndex] !== '' || !gameStateActive) {
    return;
  }
  gameBoard[clickedGridSquareIndex] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Event Listeners - Adding one for each cell \\

const gridSquare = document.querySelectorAll<HTMLDivElement> ('.gridSquare');

const messageElement = document.getElementById('gameMessage');

if (!gridSquare || !messageElement)
  {throw new Error('error with retrieving grid square');
};

gridSquare.forEach(gridSquare => {
  gridSquare.addEventListener('click', gridSquareClicked);
});


const resetGame = () => {
  location.reload()
}

const resetButton = document.getElementById('resetButton');
resetButton?.addEventListener('click', resetGame, false);

// Grid Square Clicks - Handling when the cell is clicked \\

function gridSquareClicked(clickedGridEvent: Event) {
  const clickedGridSquare = clickedGridEvent.currentTarget as HTMLDivElement;
  console.log('event listener working');
  console.log(clickedGridSquare);
  const clickedGridSquareIndex = parseInt(clickedGridSquare.id.replace('square-', '')) - 1;

    if (gameBoard[clickedGridSquareIndex] !== '' || !gameStateActive) {
      return;
    }

  handlePlayerTurn(clickedGridSquareIndex);
  updateUI();

}

function updateUI() {
  console.log('updating UI');
  for (let i=0; i < gridSquare.length; i++) {
    gridSquare[i].innerText = gameBoard[i];
  }
};

// Win Logic - Declaring game state and who has won. 

// Variables - 

const winningConditions = [
  [0, 1, 2], //Top row
  [3, 4, 5], //Middle row
  [6, 7, 8], //Bottom row
  [0, 3, 6], //Left column
  [1, 4, 7], //Middle column
  [2, 5, 8], //Right column
  [0, 4, 8], //Left-to-right diagonal
  [2, 4, 6] //Right-to-left diagonal
];

let someoneHasLostOrWon = false

// Function to Check whether it's win or a draw

function announceWinner(player:string) {
  // const messageElement = document.getElementById('gameMessage');
  if(messageElement && someoneHasLostOrWon === false){
    messageElement.innerText = `Player ${player} Wins`;
    someoneHasLostOrWon = true
  }
}

function announceDraw() {
  // const messageElement = document.getElementById('gameMessage');
  if(messageElement && someoneHasLostOrWon === false){
    messageElement.innerText = 'Game Draw!';
    someoneHasLostOrWon = true
  }
};

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if(currentPlayer === "X"){
      currentPlayer = "O"
    }
    else if(currentPlayer === "O"){
      currentPlayer = "X"
    }

    announceWinner(currentPlayer);
    gameStateActive = false;
    return;
  }

  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
    announceDraw();
    gameStateActive = false;
    return;
  }
}

gridSquare.forEach(gridSquare => {
  gridSquare.addEventListener('click', checkForWinOrDraw);
});

