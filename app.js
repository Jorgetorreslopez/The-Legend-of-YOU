console.log('APP IS CONNECTED')
/*----- constants -----*/
var gameDiv = document.getElementById('playWindow')
var charDiv = document.getElementById('player')

var charLeftPosition = 500
var charTopPosition = 400

console.log(gameDiv)
/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/
document.addEventListener('keydown', handleKeys)


/*----- functions -----*/
function handleKeys(e) {
    e.preventDefault()
    let keyPress = e.code;
    
    if (keyPress === 'ArrowRight') {
      charLeftPosition += 10;
      if (charLeftPosition + charDiv.offsetWidth <= gameDiv.offsetWidth) {
        charDiv.style.left = charLeftPosition + 'px';
      } else {
        charLeftPosition = gameDiv.offsetWidth - charDiv.offsetWidth;
      } 
    }

    if (keyPress === 'ArrowLeft') {
      charLeftPosition -= 10;
      if (charLeftPosition >= 0){
        charDiv.style.left = charLeftPosition + 'px';
      } else {
        charLeftPosition = 0;
      }
      
    }

    if (keyPress === 'ArrowDown') {
      charTopPosition += 10;
      if (charTopPosition + charDiv.offsetHeight <= gameDiv.offsetHeight) {
        charDiv.style.top = charTopPosition + 'px';
      } else {
        charTopPosition = gameDiv.offsetHeight - charDiv.offsetHeight;
      }
      
    }

    if (keyPress === 'ArrowUp') {
      charTopPosition -= 10;
      if (charTopPosition >= 0) {
        charDiv.style.top = charTopPosition + 'px';
      } else {
        charTopPosition = 0;
      }
      
    }
}