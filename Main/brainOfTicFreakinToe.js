// ---------------Variables---------------

let isTheFreakinGameStillGoing = true;
let currentPlayer = "X";
let winner = "";
let currentPlayerReverse = ""
let botMode = false
let available_space = [0,1,2,3,4,5,6,7,8]
const gameBoard = document.querySelectorAll(".grid-item-container");
const childOfGame = document.querySelector(".grid-item-container").children[0]
const gameTitle = document.querySelector("#game-title")
const gameTitle_His = document.querySelector("#game-title-history")
const winningSound = document.querySelector("#winning-sound")
const marking1 = document.querySelector("#marking1-sound")
const marking2 = document.querySelector("#marking2-sound")
const gridItem = document.querySelectorAll(".grid-item");

// ----------- Game Board Data Logging -----------

let board = [
  gameBoard[0].innerText,
  gameBoard[1].innerText,
  gameBoard[2].innerText,
  gameBoard[3].innerText,
  gameBoard[4].innerText,
  gameBoard[5].innerText,
  gameBoard[6].innerText,
  gameBoard[7].innerText,
  gameBoard[8].innerText,
];

// console.log(board);
gameBoard.forEach((item) => {
  item.addEventListener("click", PlayGame, { once: true });
});


// ------------------ GAME LOOP --------------------

function PlayGame() {

  let x = this.children[0].id;
  let x_prev = x
  // console.log(this.children[0]);
  
  let y = available_space.indexOf(parseInt(x));
  // console.log(x);
  board[parseInt(x)] = currentPlayer;
  // marking1.play()
  marking2.play()
  if(currentPlayer == "X"){
    currentPlayerReverse = "O"
  }else{
    currentPlayerReverse="X"
  }
  previousPlayer_data = currentPlayerReverse + "'s Turn :  "
  if(!botMode){
    displayOnScreenText(previousPlayer_data);
    gameTitle_His.textContent = currentPlayer + " :  " + x_prev + " --> " + (x = currentPlayer)
  }else if(botMode){
    displayOnScreenText(currentPlayer + "'s Turn :  ")
    gameTitle_His.textContent = currentPlayerReverse + " :  " + x_prev + " --> " + (x = currentPlayer)
  }
  
  // gameTitle_His.textContent = currentPlayerReverse + " :  " + x_prev + " --> " + (x = currentPlayer)
  let grid_Index = this.querySelector(".grid-item");
  grid_Index.innerText = currentPlayer;
  available_space.splice(y,1)
  console.log(available_space);
  // grid_Index.classList.add("alpha-1")
  
  
  checkIfGameOver();
  flipPlayerMyGame()

  if(!botMode) return
  BotPlay(x_prev,x)
  

}




// ------------ ALL FUNCTION ----------

function checkIfGameOver() {

  rowWin();
  columnWin();
  diagonalWin();
  // tie();
  if (winner != ""){
    winningSound.volume = 0.3
    winningSound.play()
    // document.removeEventListener("click",PlayGame)
  }

}


function rowWin() {
  let row1_color = [0,1,2]
  let row2_color = [3,4,5]
  let row3_color = [6,7,8]
  let row1 = ((board[0] == board[1]) && board[1] == board[2]) && (board[2] == "X" || board[2] == "O")
  let row2 = ((board[3] == board[4]) && board[4] == board[5]) && (board[5] == "X" || board[5] == "O")
  let row3 = ((board[6] == board[7]) && board[7] == board[8]) && (board[8] == "X" || board[8] == "O")

  if (row1) {
    winner = board[0];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(row1_color)
  } 
  else if (row2) {
    winner = board[3];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(row2_color)
  } 
  else if (row3) {
    winner = board[6];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(row3_color)
  }

  if(row1 || row2 || row3){
    displayOnScreenText(currentPlayer + " Is The Winner!!!")
  }

}
// hell yeah girl

function columnWin() {
  let column1_color = [0,3,6]
  let column2_color = [1,4,7]
  let column3_color = [2,5,8]
  let column1 = ((board[0] == board[3]) && board[3] == board[6]) && (board[3] == "X" || board[3] == "O")
  let column2 = ((board[1] == board[4]) && board[7] == board[4]) && (board[4] == "X" || board[4] == "O");
  let column3 = ((board[2] == board[5]) && board[5] == board[8]) && (board[8] == "X" || board[8] == "O");

  // console.log(column1 === true);
  if (column1 == true) {
    winner = board[0];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(column1_color)
  } 
  else if (column2 == true) {
    winner = board[1];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(column2_color)
  } 
  else if (column3 == true) {
    winner = board[2];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(column3_color)
  }
  
  if(column1 || column2 || column3){
    displayOnScreenText(currentPlayer + " Is The Winner!!!")
  }
  
}


function diagonalWin() {
  let diagonal1_color = [0,4,8]
  let diagonal2_color = [2,4,6]
  let diagonal1 = ((board[0] == board[4]) && board[4] == board[8]) && (board[8] == "X" || board[8] == "O")
  let diagonal2 = ((board[2] == board[4]) && board[4] == board[6]) && (board[6] == "X" || board[6] == "O")
  
  if (diagonal1) {
    winner = board[0];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(diagonal1_color)
  } 
  
  else if (diagonal2) {
    winner = board[2];
    isTheFreakinGameStillGoing = false;
    winnerRedDisplay(diagonal2_color)
  }

  if(diagonal1 || diagonal2){
    displayOnScreenText(currentPlayer + " Is The Winner!!!")
  }

}


function tie() {

  if ("-" != board) {
    console.log("It's a Tie Bro");
    isTheFreakinGameStillGoing = false;
  }

}


function flipPlayerMyGame(){

  if(currentPlayer === "X"){
    currentPlayer = "O"
  }
  else{
    currentPlayer = "X"
  }
  console.log("Player Fliped"+ currentPlayer);

}


function displayOnScreenText(string){
  gameTitle.textContent = string
  console.log("string " + string);
}

function winnerRedDisplay(arr){
  for (let i = 0; i < 3; i++) {
    gameBoard.forEach((item) => {
      if(item.children[0].id == arr[i]){
        item.classList.add("hell")
      }
    })
  }
}


function BotPlay(x_prev,x){

  botChooses = available_space[Math.floor(Math.random() * available_space.length)]
  let babu = available_space.indexOf(parseInt(botChooses));
  console.log("Bot: "+botChooses);
  available_space.splice(babu,1);
  console.log(available_space);
  gridItem.forEach((item) =>{
    if(item.id == botChooses){
      item.innerText = currentPlayer
    }
  })
  gameTitle_His.textContent = currentPlayer + " :  " + botChooses + " --> " + (currentPlayer)
  flipPlayerMyGame()
  checkIfGameOver()
  
}