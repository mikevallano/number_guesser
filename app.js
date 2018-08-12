let guessCount,
    guessVal,
    maxGuesses,
    matchNum,
    winLossRecord = {'winCount': 0, 'lossCount': 0}
const winCountDisplay = document.getElementById('win-count'),
      lossCountDisplay = document.getElementById('loss-count'),
      newGameBtn = document.getElementById('new-game-btn'),
      guessGameDiv = document.getElementById('guess-game-container'),
      gameForm = document.getElementById('game-form'),
      guessInput = document.getElementById('guess-input'),
      submitBtn = document.getElementById('guess-value'),
      msgHolder = document.querySelector('p.message'),
      showMin = document.querySelector('#guess-game-container .min-num'),
      showMax = document.querySelector('#guess-game-container .max-num'),
      newGameOpts = {'maxGuesses': 3, 'minRange': 1, 'maxRange': 10},
      rangePickDiv = document.getElementById('range-picker-container'),
      rangeForm = document.getElementById('range'),
      minInput = document.getElementById('min-input'),
      maxInput = document.getElementById('max-input')

document.addEventListener('DOMContentLoaded', function(){
  if (localStorage.getItem('winLossRecord') !== null) {
    winLossRecord = JSON.parse(localStorage.getItem('winLossRecord'))
  } else {
    localStorage.setItem('winLossRecord', JSON.stringify(winLossRecord))
  }
  winCountDisplay.innerText = winLossRecord.winCount;
  lossCountDisplay.innerText = winLossRecord.lossCount;
  betweenGameDisplay()
})

newGameBtn.addEventListener('click', function(){
  initGuessRangePicker()
})

minInput.addEventListener('keyup', function(e){
  maxInput.setAttribute('min', parseInt(this.value) + 9)
})

range.addEventListener('submit', function(e){
  e.preventDefault()
  newGameOpts.minRange = parseInt(minInput.value)
  newGameOpts.maxRange = parseInt(maxInput.value)
  initGuessGame(newGameOpts)
  minInput.value = ''
  maxInput.value = ''
})

gameForm.addEventListener('submit', function(e){
  e.preventDefault()
  guessVal = guessInput.value
  checkGuess(guessVal, matchNum)
})

function checkGuess(){
  guessInput.value = ''
  guessCount += 1
  guessVal == matchNum ? gameWon() : handleWrongGuess()
}

function handleWrongGuess(){
  if (guessCount >= maxGuesses) {gameLost(); return;}
  let remainingGuesses = maxGuesses - guessCount
  let hiLo = (guessVal < matchNum) ? 'higher' : 'lower';
  msgHolder.innerHTML = `<div>\
                          Wrong guess.<br/>You guessed ${guessVal}. \
                          <br/> The number you seek is ${hiLo}. \
                          <br/>Remaining guesses:  ${remainingGuesses}. \
                        </div>`
  guessInput.setAttribute('placeholder', 'Guess Again')
}

function gameWon(){
  msgHolder.innerText =  `Yay! You guessed it! ${guessVal} was correct!`
  gameOverHandler('won')
}

function gameLost(){
  msgHolder.innerText = `Game over :( The correct number was: ${matchNum}.`
  gameOverHandler('lost')
}

function gameOverHandler(result){
  if (result == 'won'){
    winLossRecord.winCount += 1
  } else if (result == 'lost') {
    winLossRecord.lossCount += 1
  }
  updateRecord(result)
  localStorage.setItem('winLossRecord', JSON.stringify(winLossRecord));
  betweenGameDisplay()
}

function updateRecord(result){
  let el;
  let count;
  if (result == 'won') {
    el = winCountDisplay
    count = winLossRecord.winCount
  } else if (result == 'lost') {
    el = lossCountDisplay
    count = winLossRecord.lossCount
  }
  el.innerText = count;
  el.style.animation = 'scoreupdate 2s 1';
  setTimeout(function(){
    el.style.animation = '';
  }, 1500)
}

function betweenGameDisplay(){
  showElement(newGameBtn)
  hideElement(rangePickDiv)
  hideElement(guessGameDiv)
}

function initGuessRangePicker(){
  hideElement(guessGameDiv)
  hideElement(newGameBtn)
  showElement(rangePickDiv)
  msgHolder.innerText = ''
}

function hideElement(el){
  el.style.display = 'none'
}

function showElement(el){
  el.style.display = 'block'
}

function initGuessGame(opts){
  showElement(guessGameDiv)
  hideElement(rangePickDiv)
  showMin.innerText = opts.minRange
  showMax.innerText = opts.maxRange
  guessInput.setAttribute('min', opts.minRange)
  guessInput.setAttribute('max', opts.maxRange)
  maxGuesses = opts.maxGuesses;
  matchNum = getRandomInt(opts.minRange, opts.maxRange)
  guessCount = 0
  console.log(`matchNum: ${matchNum}`)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
