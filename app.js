console.log("APP IS CONNECTED");
/*----- constants -----*/
const gameDiv = document.getElementById("playWindow");
const charDiv = document.getElementById("player");
const parentWallCollisionDiv = document.getElementById("collisionLines");
const door = document.getElementById('nextScreenDoor')
const sword = document.getElementById('sword')
const enemy = document.getElementById('enemy')


const childWallCollisionDivs = parentWallCollisionDiv.querySelectorAll(".wall");

const charRect = charDiv.getBoundingClientRect();
const collisionLineRects = [];
const doorRect = door.getBoundingClientRect();
const swordRect = sword.getBoundingClientRect();
const enemyRect = enemy.getBoundingClientRect();

console.log(enemyRect)



/*----- state variables -----*/

let hasSword = false;
let isAttacking = false;
let canAttackAgain = false;

let charLeftPosition = 500;
let charTopPosition = 400;

/*----- cached elements  -----*/

childWallCollisionDivs.forEach((div) => {
  const collisionLinesRect = div.getBoundingClientRect();
  collisionLineRects.push(collisionLinesRect);
});

/*----- event listeners -----*/
document.addEventListener("keydown", handleKeys);
//window.addEventListener('resize', collisionLineRects)

/*----- functions -----*/
function handleKeys(e) {
  e.preventDefault();
  let keydown = e.code;
  
  if (keydown === "ArrowRight") {
    console.log(detectCollision(0, -10, 0, 0) || grabSword(0, -10, 0, 0))
    if (!detectCollision(0, 0, 10, 0) || grabSword(0, 0, 10, 0)) {
      charLeftPosition += 10;
    } 
    if (charLeftPosition + charDiv.offsetWidth <= gameDiv.offsetWidth) {
      charDiv.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = gameDiv.offsetWidth - charDiv.offsetWidth;
    }
  }

  if (keydown === "ArrowLeft") {
    console.log(detectCollision(0, -10, 0, 0) || grabSword(0, -10, 0, 0))
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
    console.log(detectCollision(0, -10, 0, 0) || grabSword(0, -10, 0, 0))
    if (!detectCollision(0, 0, 0, 10 ) || grabSword(0, 0, 0, 10)) {
      charTopPosition += 10;
    } 
    if (charTopPosition + charDiv.offsetHeight <= gameDiv.offsetHeight) {
      charDiv.style.top = charTopPosition + "px";
    } else {
      charTopPosition = gameDiv.offsetHeight - charDiv.offsetHeight;
    }
  }

  if (keydown === "ArrowUp") {
    console.log(detectCollision(0, -10, 0, 0) || grabSword(0, -10, 0, 0) || detectDoor(0, -10, 0, 0))
    if (!detectCollision(-10, 0, 0, 0) || grabSword(-10, 0, 0, 0) || detectDoor(-10, 0, 0, 0)) {
      charTopPosition -= 10;
    }
    if (charTopPosition >= 0) {
      charDiv.style.top = charTopPosition + "px";
    } else {
      charTopPosition = 0;
    }
  }
  // if (detectCollision(0, 0, 0, 0)) {
  //   grabSword(0, 0, 0, 0);
  // }
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

function detectDoor(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const doorRect = door.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const doorTop = doorRect.top + scrollTop;
  const doorLeft = doorRect.left + scrollLeft;

  const overlapDoorX = charLeft + left < doorRect.right && charLeft + charDiv.offsetWidth + right > doorRect.left;
  const overlapDoorY = charTop + top < doorRect.bottom && charTop + charDiv.offsetHeight + bottom > doorRect.top;
  
  if (overlapDoorX && overlapDoorY) {
    if (document.getElementById("map1")) {
    window.location.href = "/Users/jorgetorreslopez/portfolio-projects/projects/unit-1-project/secondscreen.html"
    } else {

    }
  }
}

function grabSword(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const swordRect = sword.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const swordTop = swordRect.top + scrollTop;
  const swordLeft = swordRect.left + scrollLeft;

  const overlapSwordX = charLeft + left < swordRect.right && charLeft + charDiv.offsetWidth + right > swordRect.left;
  const overlapSwordY = charTop + top < swordRect.bottom && charTop + charDiv.offsetHeight + bottom > swordRect.top;  


  if (overlapSwordX && overlapSwordY) {
    document.getElementById('sword').style.display = 'none';
    document.getElementById('enemy').style.display = 'block';
    const song = new Audio();
    audio.play()
    return true
  }
}

function takeDamage(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const enemyTop = enemyRect.top + scrollTop;
  const enemyLeft = enemyRect.left + scrollLeft;

  const overlapEnemyX = charLeft + left < enemyRect.right && charLeft + charDiv.offsetWidth + right > enemyRect.left;
  const overlapEnemyY = charTop + top < enemyRect.bottom && charTop + charDiv.offsetHeight + bottom > enemyRect.top;
  
  if (overlapEnemyX && overlapEnemyY) {
    document.getElementById('sword').style.display = 'block';
  }

}