const X_CLASS = 'x'
const O_CLASS = 'o'
const cells = document.querySelectorAll('.grid-items')
const gameBoard = document.querySelector('.game-board')
const restartButton = document.getElementById('restart-button')
const winningMessageElement = document.querySelector('.winning-text')
const messageElement = document.querySelector('.winning-message')
let oTurn;
const ALL_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartButton.addEventListener('click', startGame)

startGame()

function startGame() {
    oTurn = false
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {
            once: true
        })
    });
    setHover();
    messageElement.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;

    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        console.log("WINNER")
        endGame(false);
    } else if (isDraw()) {

        endGame(true)
    } else {

        swapTheTurn()
        setHover()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageElement.innerHTML = `DRAW`

    } else {
        winningMessageElement.innerHTML = `${oTurn ? "O" : "X"} WINS!`
    }
    messageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTheTurn() {
    oTurn = !oTurn;
}

function setHover() {

    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(O_CLASS);

    if (oTurn) {
        gameBoard.classList.add(O_CLASS)

    } else {
        gameBoard.classList.add(X_CLASS)

    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function checkWin(currentClass) {
    return ALL_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}