console.log('APP IS CONNECTED')
/*----- constants -----*/
let gameDiv = document.getElementById('playWindow')
let charDiv = document.getElementById('player')
console.log(charDiv)


/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/

document.addEventListener('keydown', handleKeys)
var charLeftAdd = 500
var charTopAdd = 400

/*----- functions -----*/

function handleKeys(e) {
    e.preventDefault()
    let keyPress = e.code;
    if (keyPress === 'ArrowRight') {
      charLeftAdd += 10;  
      charDiv.style.left = charLeftAdd + 'px';
    }

    if (keyPress === 'ArrowLeft') {
      charLeftAdd -= 10;
      charDiv.style.left = charLeftAdd + 'px';
    }

    if (keyPress === 'ArrowDown') {
      charTopAdd += 10;
      charDiv.style.top = charTopAdd + 'px';
    }

    if (keyPress === 'ArrowUp') {
      charTopAdd -= 10;
      charDiv.style.top = charTopAdd + 'px';
    }
}