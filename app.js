console.log("APP IS CONNECTED");
/*----- constants -----*/
const gameDiv = document.getElementById("playWindow");
const charDiv = document.getElementById("player");
const parentWallCollisionDiv = document.getElementById("collisionLines");
const door = document.getElementById("nextScreenDoor");
const sword = document.getElementById("sword");
const enemy = document.getElementById("enemy");

const childWallCollisionDivs = parentWallCollisionDiv.querySelectorAll(".wall");

const charRect = charDiv.getBoundingClientRect();
const collisionLineRects = [];
const doorRect = door.getBoundingClientRect();
const swordRect = sword.getBoundingClientRect();
const enemyRect = enemy.getBoundingClientRect();

/*----- state variables -----*/

let hasSword = false;
let spaceKeyIsPressed = false;
let fatalBlow = false;
let grabbedSwordTurn = 0;

let charLeftPosition = 500;
let charTopPosition = 400;

let enemyHitpoints = 6;

/*----- cached elements  -----*/

childWallCollisionDivs.forEach((div) => {
  const collisionLinesRect = div.getBoundingClientRect();
  collisionLineRects.push(collisionLinesRect);
});

/*----- event listeners -----*/
document.addEventListener("keydown", handleKeys);
document.addEventListener("keyup", handleKeys);

/*----- functions -----*/
function handleKeys(e) {
  e.preventDefault();
  let keydown = e.code;

  if (keydown === "ArrowRight") {
    console.log(wallCollision(0, 0, 10, 0) || grabSword(0, 0, 10, 0));

    if (!wallCollision(0, 0, 10, 0)) {
      grabSword(0, 0, 10, 0);
      charLeftPosition += 10;
    }
    if (charLeftPosition + charDiv.offsetWidth <= gameDiv.offsetWidth) {
      charDiv.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = gameDiv.offsetWidth - charDiv.offsetWidth;
    }
  }

  if (keydown === "ArrowLeft") {
    console.log(wallCollision(0, -10, 0, 0) || grabSword(0, -10, 0, 0));

    if (!wallCollision(0, -10, 0, 0)) {
      grabSword(0, -10, 0, 0);
      charLeftPosition -= 10;
    }
    if (charLeftPosition >= 0) {
      charDiv.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = 0;
    }
  }

  if (keydown === "ArrowDown") {
    console.log(wallCollision(0, 0, 0, 10) || grabSword(0, 0, 0, 10));

    if (!wallCollision(0, 0, 0, 10)) {
      grabSword(0, 0, 0, 10);
      charTopPosition += 10;
    }
    if (charTopPosition + charDiv.offsetHeight <= gameDiv.offsetHeight) {
      charDiv.style.top = charTopPosition + "px";
    } else {
      charTopPosition = gameDiv.offsetHeight - charDiv.offsetHeight;
    }
  }

  if (keydown === "ArrowUp") {
    console.log(
      wallCollision(-10, 0, 0, 0) ||
        grabSword(-10, 0, 0, 0) ||
        detectDoor(-10, 0, 0, 0)
    );

    if (!wallCollision(-10, 0, 0, 0) || detectDoor(-10, 0, 0, 0)) {
      grabSword(-10, 0, 0, 0);
      charTopPosition -= 10;
    }
    if (charTopPosition >= 0) {
      charDiv.style.top = charTopPosition + "px";
    } else {
      charTopPosition = 0;
    }
  }

  if (keydown === "Space" && hasSword) {
    if (e.type === "keydown") {
      spaceKeyIsPressed = true;
      attackAnimation();
      attackEnemy(-20, -20, 20, 20);
    } else if (e.type === "keyup") {
      spaceKeyIsPressed = false;
      attackAnimation();
    }
  }
}

function wallCollision(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;

  for (let i = 0; i < collisionLineRects.length; i++) {
    const collisionLineRect = collisionLineRects[i];

    const overlapX =
      charLeft + left < collisionLineRect.right &&
      charLeft + charDiv.offsetWidth + right > collisionLineRect.left;
    const overlapY =
      charTop + top < collisionLineRect.bottom &&
      charTop + charDiv.offsetHeight + bottom > collisionLineRect.top;

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

  const overlapDoorX =
    charLeft + left < doorRect.right &&
    charLeft + charDiv.offsetWidth + right > doorRect.left;
  const overlapDoorY =
    charTop + top < doorRect.bottom &&
    charTop + charDiv.offsetHeight + bottom > doorRect.top;

  if (overlapDoorX && overlapDoorY) {
    if (document.getElementById("map1")) {
      window.location.href =
        "/Users/jorgetorreslopez/portfolio-projects/projects/unit-1-project/secondscreen.html";
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

  const overlapSwordX =
    charLeft + left < swordRect.right &&
    charLeft + charDiv.offsetWidth + right > swordRect.left;
  const overlapSwordY =
    charTop + top < swordRect.bottom &&
    charTop + charDiv.offsetHeight + bottom > swordRect.top;
  console.log("begin", grabbedSwordTurn);

  if (overlapSwordX && overlapSwordY) {
    if (grabbedSwordTurn === 0) {
      grabbedSwordTurn++;
      if (document.getElementById("map2")) {
        hasSword = true;
        document.getElementById("sword").style.display = "none";
        document.getElementById("enemy").style.display = "block";
        const enemyPosition = document.querySelector(".darkside");
        enemyPosition.style.top = "400px";
        enemyPosition.style.left = "400px";
        return true;
      }
    } else if (grabbedSwordTurn === 2) {
      console.log("increasingswordTurn");

      setTimeout(() => {
        let timeLimit = 15;
        let timer = setInterval(() => {
          timeLimit--;
          console.log(timeLimit);
          if (timeLimit <= 0) {
            clearInterval(timer);
            lossMessage();
          }
        }, 1000);
      }, 0);
    }
  }
}

function attackAnimation() {
  if (document.getElementById("sword").style.display === "none" && grabSword) {
    const attackImage = document.querySelector(".linkPic");
    if (spaceKeyIsPressed) {
      attackImage.src = "https://i.imgur.com/zRItFcJ.png";
    } else {
      attackImage.src = "https://i.imgur.com/unqf9A6.png";
    }
  }
}

function attackEnemy(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollLeft;
  const scrollLeft = document.documentElement.scrollTop;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const enemyTop = enemyRect.top + scrollTop;
  const enemyLeft = enemyRect.left + scrollLeft;

  const overlapEnemyX =
    charLeft + left < enemyRect.right &&
    charLeft + charDiv.offsetWidth + right > enemyRect.left;
  const overlapEnemyY =
    charTop + top < enemyRect.bottom &&
    charTop + charDiv.offsetHeight + bottom > enemyRect.top;

  if (overlapEnemyX && overlapEnemyY && hasSword) {
    if (spaceKeyIsPressed) {
      alert("Nani!!!");
      enemyHitpoints--;

      if (enemyHitpoints === 0) {
        enemy.style.display = "none";
        const enemyDefeated = document.createElement("div");
        enemyDefeated.textContent = "Yo You Did it!!";
        enemyDefeated.style.fontFamily = "Press Start 2P";
        enemyDefeated.style.fontSize = "2rem";
        enemyDefeated.style.color = "goldenrod";
        enemyDefeated.style.textAlign = "center";
        enemyDefeated.style.position = "absolute";
        enemyDefeated.style.top = "150px";
        enemyDefeated.style.left = "830px";
        document.body.appendChild(enemyDefeated);
      }
    }
  }
}

function enemyCollision(top, left, right, bottom) {
  const charRect = charDiv.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollLeft;
  const scrollLeft = document.documentElement.scrollTop;
  const charTop = charRect.top + scrollTop;
  const charLeft = charRect.left + scrollLeft;
  const enemyTop = enemyRect.top + scrollTop;
  const enemyLeft = enemyRect.left + scrollLeft;

  const overlapEnemyX =
    charLeft + left < enemyRect.right &&
    charLeft + charDiv.offsetWidth + right > enemyRect.left;
  const overlapEnemyY =
    charTop + top < enemyRect.bottom &&
    charTop + charDiv.offsetHeight + bottom > enemyRect.top;
  return overlapEnemyX && overlapEnemyY && hasSword;
}

function takingDamage() {
  const directHit = enemyCollision(0, 0, 0, 0);
  if (directHit) {
    dropSword();
    alert(
      "lol..You died in the the first couple of seconds... I've seen worst honestly but look we don't always get it on the first try. As long as you continue to pick up your reason, You can keep trying. This time after picking up your reason, press the the Space key and time it just right. Remember, the the longer you wait to take action, lets say maybe more than 6 seconds, the more likely you'll fail and lose sight of your reason. By the way did you notice the the double the's in this message? Good luck Loser, love you and be safe."
    );
  } else {
    requestAnimationFrame(takingDamage);
  }
}

function dropSword() {
  const sword = document.getElementById("sword");
  sword.style.display = "block";
  hasSword = false;
  enemy.style.display = "none";
  enemyHitpoints = 6;
  const enemyDefeated = document.querySelector(".enemy-defeated");
  if (enemyDefeated) {
    enemyDefeated.remove();
  }
}

takingDamage();

function lossMessage() {
  const youLose = document.createElement("div");
  youLose.innerHTML =
    '<p>You Suck</p> <button onclick="redirectToURL()">Rolled</button>';
  youLose.style.position = "fixed";
  youLose.style.top = "50%";
  youLose.style.left = "50%";
  youLose.style.transform = "translate(-50%, -50%)";
  youLose.style.background = "white";
  youLose.style.padding = "20px";
  youLose.style.textAlign = "center";
  document.body.appendChild(youLose);
}

function redirectToURL() {
  window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
}
