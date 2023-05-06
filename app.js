console.log('APP IS CONNECTED')
/*----- constants -----*/
const gameDiv = document.getElementById('playWindow')
const charDiv = document.getElementById('player')
const parentWallCollisionDiv = document.getElementById('collisionLines')

const childWallCollisionDivs = parentWallCollisionDiv.querySelectorAll('div')

const charRect = charDiv.getBoundingClientRect();
const collisionLineRects = [];

let charLeftPosition = 500
let charTopPosition = 400

//console.log(childWallCollisionDivs)
/*----- state variables -----*/

childWallCollisionDivs.forEach((div) => {
  const collisionLinesRect = div.getBoundingClientRect();
  collisionLineRects.push(collisionLinesRect);
})

/*----- cached elements  -----*/


/*----- event listeners -----*/
document.addEventListener('keydown', handleKeys)


/*----- functions -----*/
function handleKeys(e) {
    e.preventDefault()
    let keyPress = e.code;
    
    if (keyPress === 'ArrowRight') {
      if (!detectCollision(0, 10)){
      charLeftPosition += 10;
      }
      if (charLeftPosition + charDiv.offsetWidth <= gameDiv.offsetWidth) {
        charDiv.style.left = charLeftPosition + 'px';
      } else {
        charLeftPosition = gameDiv.offsetWidth - charDiv.offsetWidth;
      }
       
    }

    if (keyPress === 'ArrowLeft') {
      if (!detectCollision(0,-10)) {
      charLeftPosition -= 10;
      }
      if (charLeftPosition >= 0){
        charDiv.style.left = charLeftPosition + 'px';
      } else {
        charLeftPosition = 0;
      }
    }

    if (keyPress === 'ArrowDown') {
      if (!detectCollision(10, 0)) {
        charTopPosition += 10;
      }  
        if (charTopPosition + charDiv.offsetHeight <= gameDiv.offsetHeight) {
          charDiv.style.top = charTopPosition + 'px';
        } else {
          charTopPosition = gameDiv.offsetHeight - charDiv.offsetHeight;
        }  
    }

    if (keyPress === 'ArrowUp') {
      console.log(detectCollision())
      if (detectCollision(-10, 0)) {
        charTopPosition -= 10;
      }
      if (charTopPosition >= 0) {
        charDiv.style.top = charTopPosition + 'px';
      } else {
        charTopPosition = 0;
      }  
    }
}

function detectCollision (top, left) {
  const charRect = charDiv.getBoundingClientRect();
  
  for (let i = 0; i < collisionLineRects.length; i++) {
    const collisionLineRect = collisionLineRects[i];
    if (charRect.left + left < collisionLineRect.left + collisionLineRect.width &&
      charRect.left + left + charRect.width > collisionLineRect.left &&
      charRect.top + top < collisionLineRect.top + collisionLineRect.height &&
      charRect.height + charRect.top + top > collisionLineRect.top) {
      return true 
   }
  } return false
}
