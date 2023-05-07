console.log("APP IS CONNECTED");
/*----- constants -----*/
const gameDiv = document.getElementById("playWindow");
const charDiv = document.getElementById("player");
const parentWallCollisionDiv = document.getElementById("collisionLines");

const childWallCollisionDivs = parentWallCollisionDiv.querySelectorAll(".wall");

const charRect = charDiv.getBoundingClientRect();
const collisionLineRects = [];

let charLeftPosition = 500;
let charTopPosition = 400;

/*----- state variables -----*/

childWallCollisionDivs.forEach((div) => {
  const collisionLinesRect = div.getBoundingClientRect();
  collisionLineRects.push(collisionLinesRect);
});

/*----- cached elements  -----*/

/*----- event listeners -----*/
document.addEventListener("keydown", handleKeys);
window.addEventListener('resize', collisionLineRects)

/*----- functions -----*/
function handleKeys(e) {
  e.preventDefault();
  let keydown = e.code;
  
  if (keydown === "ArrowRight") {
    if (!detectCollision(0, 0, 10, 0)) {
      charLeftPosition += 10;
    } 

    if (charLeftPosition + charDiv.offsetWidth <= gameDiv.offsetWidth) {
      charDiv.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = gameDiv.offsetWidth - charDiv.offsetWidth;
    }
  }

  if (keydown === "ArrowLeft") {
    console.log(detectCollision(0, -10, 0, 0))
    if (!detectCollision(0, -10, 0, 0)) {
      charLeftPosition -= 10;
    } 

    if (charLeftPosition >= 0) {
      charDiv.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = 0;
    }
  }

  if (keydown === "ArrowDown") {
    if (!detectCollision(0, 0, 0, 10 )) {
      charTopPosition += 10;
    } 

    if (charTopPosition + charDiv.offsetHeight <= gameDiv.offsetHeight) {
      charDiv.style.top = charTopPosition + "px";
    } else {
      charTopPosition = gameDiv.offsetHeight - charDiv.offsetHeight;
    }
  }

  if (keydown === "ArrowUp") {
    console.log(detectCollision(-10, 0, 0, 0))
    if (!detectCollision(-10, 0, 0, 0)) {
      charTopPosition -= 10;
    }

    if (charTopPosition >= 0) {
      charDiv.style.top = charTopPosition + "px";
    } else {
      charTopPosition = 0;
    }
  }
}


// function detectCollision(top, left) {
//   const charRect = charDiv.getBoundingClientRect();
//   console.log(charRect, collisionLineRects)
//   for (let i = 0; i < collisionLineRects.length - 1; i++) {
//     const collisionLineRect = collisionLineRects[i];
//     if (
//       charRect.left + left < collisionLineRect.left + collisionLineRect.width &&
//       charRect.left + left + charRect.width > collisionLineRect.left &&
//       charRect.top + top < collisionLineRect.top + collisionLineRect.height &&
//       charRect.height + charRect.top + top > collisionLineRect.top
//     ) { 
//       console.log(collisionLineRect[i])
//       return true
//     }
//   } return false
// }

function detectCollision(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;

  for (let i = 0; i < collisionLineRects.length; i++) {
    const collisionLineRect = collisionLineRects[i];
  
    const overlapX = charLeft + left < collisionLineRect.right && charLeft + charDiv.offsetWidth + right > collisionLineRect.left;
    const overlapY = charTop + top < collisionLineRect.bottom && charTop + charDiv.offsetHeight + bottom > collisionLineRect.top;  

    if (overlapX && overlapY) {
      return true;
    }
  }
  return false;
}
