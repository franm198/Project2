import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


// Variables \\

let currentPlayer = 'X'; //The Game always begins with Player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; //This is the 3x3 grid squares
let gameStateActive = true;

// Player Turns - Handling which player is active \\

function handlePlayerTurn(clickedGridSquareIndex) {
  if (gameBoard[clickedGridSquareIndex] !== '' || !gameStateActive) {
    return;
  }
  gameBoard[clickedGridSquareIndex] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Event Listeners - Adding one for each cell \\

const gridSquare = document.querySelectorAll('.gridSquare');

gridSquare.forEach(gridSquare => {
  gridSquare.addEventListener('click', gridSquareClicked, false)
});

// Grid Square Clicks - Handling when the cell is clicked \\

function gridSquareClicked(clickedGridEvent) {
  const clickedGridSquare = clickedGridEvent.target;
  const clickedGridSquareIndex = parseInt(clickedGridSquare.id.replace('cell-', '')) - 1;

    if (gameBoard[clickedGridSquareIndex] !== '' || !gameStateActive) {
      return;
    }

  handlePlayerTurn(clickedGridSquareIndex);
  updateUI();

}

function updateUI() {
  for (let i=0; i < gridSquare.length; i++) {
    gridSquare[i].innerText = gameBoard[i];
  }
}
