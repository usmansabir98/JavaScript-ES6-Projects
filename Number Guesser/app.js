/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomeNumber(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again listener. We use mouse down because if we use click event, then just after clicking submit button,
// we are not able to see our gameOver message as the mouse click release event will immediately trigger
// Play again event as well. so we use mousedown event instead
game.addEventListener('mousedown', function(){
  window.location.reload();
});

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  //validate
  if(isNaN(guess) || guess < min || guess > max){
  console.log(isNaN(guess));
    
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  else if(guess === winningNum){
    // Disable input
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    guessesLeft--;
    if(guessesLeft===0){
      gameOver(false, `You Lost! Correct number was ${winningNum}`);
    }
    else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`Wrong Answer. ${guessesLeft} guesses left`, 'red');      
    }

  }
});

function setMessage(text, color){
  console.log('called');
  message.textContent = text;
  message.style.color = color;
}

function gameOver(won, msg){
  let color; won? color='green': color='red';
  
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color; 

  setMessage(msg, color);

  guessBtn.value = 'Play Again?';
  guessBtn.classList.add('play-again');
}

function getRandomeNumber(min, max){
  let num =  Math.floor(Math.random()*(max-min+1)+min);
  console.log(num);
  return num;
}