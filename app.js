console.log('APP IS CONNECTED')
/*----- constants -----*/
var gameDiv = document.getElementById('playWindow')
var charDiv = document.getElementById('player')
var wallCollision = document.getElementById('walls')

var charLeftPosition = 500
var charTopPosition = 400

// console.log(wall1)
// console.log(wall2)
// console.log(wall3)
// console.log(wall4)
// console.log(wall5)
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
        detectWalls();
      } else {
        charLeftPosition = gameDiv.offsetWidth - charDiv.offsetWidth;
      } 
    }

    if (keyPress === 'ArrowLeft') {
      charLeftPosition -= 10;
      if (charLeftPosition >= 0){
        charDiv.style.left = charLeftPosition + 'px';
        detectWalls();
      } else {
        charLeftPosition = 0;
      }
      
    }

    if (keyPress === 'ArrowDown') {
      charTopPosition += 10;
      if (charTopPosition + charDiv.offsetHeight <= gameDiv.offsetHeight) {
        charDiv.style.top = charTopPosition + 'px';
        detectWalls();
      } else {
        charTopPosition = gameDiv.offsetHeight - charDiv.offsetHeight;
      }
      
    }

    if (keyPress === 'ArrowUp') {
      charTopPosition -= 10;
      if (charTopPosition >= 0) {
        charDiv.style.top = charTopPosition + 'px';
        detectWalls();
      } else {
        charTopPosition = 0;
      }
      
    }
}

function detectWalls () {
  const charRect = charDiv.getBoundingClientRect();
  const wallsRect = wallCollision.getBoundingClientRect();
  if (charRect.right > wallsRect.left && charRect.left < wallsRect.right && charRect.bottom > wallsRect.top && charRect.top < wallsRect.bottom) {

  }
}