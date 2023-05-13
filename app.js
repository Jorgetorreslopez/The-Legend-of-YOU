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

// let timeLimit = 5

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
    if (!wallCollision(0, 0, 10, 0) || grabSword(0, 0, 10, 0)) {
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
    if (!wallCollision(0, -10, 0, 0) || grabSword(0, -10, 0, 0)) {
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
    if (!wallCollision(0, 0, 0, 10) || grabSword(0, 0, 0, 10)) {
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
    if (
      !wallCollision(-10, 0, 0, 0) ||
      grabSword(-10, 0, 0, 0) ||
      detectDoor(-10, 0, 0, 0)
    ) {
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
    grabbedSwordTurn = 1;
    if (grabbedSwordTurn === 1) {
      if (document.getElementById("map2")) {
        hasSword = true;
        document.getElementById("sword").style.display = "none";
        document.getElementById("enemy").style.display = "block";
        const enemyPosition = document.querySelector(".darkside");
        enemyPosition.style.top = "400px";
        enemyPosition.style.left = "400px";

        let timeLimit = 30;
        let timer = setInterval(() => {
          timeLimit--;
          console.log(timeLimit);
          if (timeLimit <= 0) {
            clearInterval(timer);
            lossMessage();
          }
        }, 1000);
        return true;
      }
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
      alert(
        "No matter how much you hit me, I'll keep saying it. Laura Bush Killed A guy."
      );
      enemyHitpoints--;

      if (enemyHitpoints === 0) {
        enemy.style.display = "none";
        const enemyDefeated = document.createElement("div");
        enemyDefeated.textContent =
          "You did it!! Now here's a random guy to congratulate you.";
        enemyDefeated.style.fontFamily = "Press Start 2P";
        enemyDefeated.style.fontSize = "2rem";
        enemyDefeated.style.color = "goldenrod";
        enemyDefeated.style.textAlign = "center";
        enemyDefeated.style.position = "absolute";
        enemyDefeated.style.top = "150px";
        enemyDefeated.style.left = "565px";
        document.body.appendChild(enemyDefeated);

        setTimeout(() => {
          window.location.href = "https://www.youtube.com/watch?v=1Bix44C1EzY";
        }, 5000);
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
      "lol..You died in the the first couple of seconds... I've seen worst honestly but look we don't always get it on the first try. As long as you continue to pick up your reason, You can keep trying. This time after picking up your reason, press the the Space key and time it just right. Remember, the the longer you wait to take action, the more likely you'll fail and lose sight of your reason. So you have 20 seconds to pick your sword back up and defeat your doubts. By the way did you notice the the double the's in this message? Good luck Loser, love you and be safe."
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
    '<p>You took too long, but do not worry. Even procrastination deserves a prize. Perhaps this game sucks & that is why you lost? Click below.</p> <button onclick="redirectToURL()">It does suck. Please give me my prize.</button>';
  youLose.style.position = "fixed";
  youLose.style.top = "50%";
  youLose.style.left = "50%";
  youLose.style.transform = "translate(-50%, -50%)";
  youLose.style.background = "black";
  youLose.style.color = "white";
  youLose.style.padding = "20px";
  youLose.style.textAlign = "center";
  youLose.style.fontFamily = "Courier, monospace";
  youLose.style.fontSize = "1.5rem";
  youLose.style.border = "5px solid white";
  youLose.style.borderRadius = "10px";
  youLose.style.boxShadow = "0px 0px 10px 2px rgba(255, 255, 255, 0.3)";
  document.body.appendChild(youLose);
}

function redirectToURL() {
  if (document.getElementById("map2")) {
    window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
  } else {
    const step2Message = document.createElement("div");
    step2Message.textContent = "STEP 2. MAKE IT THE RIGHT DECISION";
    step2Message.style.fontFamily = "Press Start 2P cursive";
    step2Message.style.fontSize = "2rem";
    step2Message.style.color = "goldenrod";
    step2Message.style.textAlign = "center";
    step2Message.style.position = "absolute";
    step2Message.style.top = "750px";
    step2Message.style.left = "650px";
    document.body.appendChild(step2Message)
    setTimeout(() => {
      window.location.href =
        "file:///Users/jorgetorreslopez/portfolio-projects/projects/unit-1-project/index.html";
    }, 5000);
  }
}
