console.log('APP IS CONNECTED')
/*----- constants -----*/
const gameDiv = document.getElementById('playWindow')
const charDiv = document.getElementById('player')
const wall1Collision = document.getElementById('wall1')

const charRect = charDiv.getBoundingClientRect();
const wall1Rect = wall1Collision.getBoundingClientRect(); 

let charRight = charRect.left + charRect.width;
let charBottom = charRect.top + charRect.height;

let wall1Right = wall1Rect.left + wall1Rect.width;
let wall1Bottom = wall1Rect.top + wall1Rect.height;

let charLeftPosition = 500
let charTopPosition = 400

console.log(wall1Rect)
console.log(wall1Bottom)
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