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




/*----- state variables -----*/

let hasSword = false;
let spaceKeyIsPressed = false;

let charLeftPosition = 500;
let charTopPosition = 400;

let enemyHitpoints = 0;

/*----- cached elements  -----*/

childWallCollisionDivs.forEach((div) => {
  const collisionLinesRect = div.getBoundingClientRect();
  collisionLineRects.push(collisionLinesRect);
});

/*----- event listeners -----*/
document.addEventListener("keydown", handleKeys);
document.addEventListener('keyup', handleKeys)

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

  if (keydown === 'Space' && hasSword) {
    if (e.type === 'keydown') {
      spaceKeyIsPressed = true;
      attackAnimation();
      attackEnemy(0, 0, 0, 0);
    } else if (e.type === 'keyup') {
      spaceKeyIsPressed = false;
      attackAnimation();
    }
  }
}


function detectCollision(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft;
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
  const scrollTop = document.documentElement.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft;
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
  const scrollTop = document.documentElement.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const swordTop = swordRect.top + scrollTop;
  const swordLeft = swordRect.left + scrollLeft;

  const overlapSwordX = charLeft + left < swordRect.right && charLeft + charDiv.offsetWidth + right > swordRect.left;
  const overlapSwordY = charTop + top < swordRect.bottom && charTop + charDiv.offsetHeight + bottom > swordRect.top;  


  if (overlapSwordX && overlapSwordY) {
    hasSword = true;
    document.getElementById('sword').style.display = 'none';
    document.getElementById('enemy').style.display = 'block';
    const enemyPosition = document.querySelector('.darkside')
    enemyPosition.style.top = "400px"
    enemyPosition.style.left = '400px'
    return true
  }
}

function attackAnimation () {
  if (document.getElementById('sword').style.display === 'none' && grabSword) {
    const attackImage = document.querySelector('.linkPic');
    if (spaceKeyIsPressed) {
      attackImage.src = "https://i.imgur.com/zRItFcJ.png";
    } else {
      attackImage.src = 'https://i.imgur.com/unqf9A6.png'
    }
    // console.log('hiyaa')
  }
}

function attackEnemy(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect()
  const enemyRect = enemy.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollLeft
  const scrollLeft = document.documentElement.scrollTop
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const enemyTop = enemyRect.top + scrollTop;
  const enemyLeft = enemyRect.left + scrollLeft;

  const overlapEnemyX = charLeft + left < enemyRect.right && charLeft + charDiv.offsetWidth + right > enemyRect.left;
  const overlapEnemyY = charTop + top < enemyRect.bottom && charTop + charDiv.offsetHeight + bottom > enemyRect.top;

  if (overlapEnemyX && overlapEnemyY) {
    console.log('EVIL!!!');
    enemyHitpoints++;

    if (enemyHitpoints === 1) {
      enemy.style.display = 'none';
      const enemyDefeated = document.createElement('div')
      enemyDefeated.textContent = 'Yo You Did it!!';
      enemyDefeated.style.fontFamily = 'Press Start 2P'
      enemyDefeated.style.color = 'goldenrod'
      enemyDefeated.style.textAlign = 'center'
      enemyDefeated.style.position = 'absolute'
      enemyDefeated.style.top = '50px'
      enemyDefeated.style.left = '880px'
      document.body.appendChild(enemyDefeated)
    } 
  } 
}

function dropSword() {
  hasSword = false;
  sword.style.display = 'block';
  enemy.style.display = 'none';
  enemyHitpoints = 0;
  const enemyDefeated = document.querySelector('.enemy-defeated');
  if (enemyDefeated) {
    enemyDefeated.remove();
  }
}
