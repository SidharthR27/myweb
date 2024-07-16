const shipsFound = document.querySelector(".shipsFound");
const totalAttempts = document.querySelector(".totalAttempts");
const gameBoard = document.querySelector(".grid-container");
const gameBoardChildren = gameBoard.children;

let shipCount = 0;
let totalTry = 0;
let shipsArray = [];
let opened = [];

const createShipsArray = () => {
    shipsArray = [];
    while (shipsArray.length < 5) {
        let index = Math.floor(Math.random() * 16);
        index = String(index)
        if (!shipsArray.includes(index)) shipsArray.push(index);
    }
    localStorage.setItem("shipsArray", shipsArray);
}

const createGrids = () => {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.addEventListener("click", () => clickedCell(item, i))
        gameBoard.appendChild(item);
    }
}

createGrids();


const clickedCell = (item, i) => {
    i = String(i);
    localStorage.setItem("ifGameResume", true)
    if (opened.includes(i)) return


    opened.push(i);
    localStorage.setItem("opened", opened)
    if (shipsArray.includes(i)) {
        item.classList.add("ship");
        shipCount++;
        totalTry++;
    } else {
        item.classList.add("water");
        totalTry++;
    }
    shipsFound.textContent = shipCount;
    totalAttempts.textContent = totalTry;
    if (shipCount === 5) {
        alert("Congrats You won!!")
        reset()
    };
    if (totalTry === 8) {
        alert("Sorry its 8 attempts, You lost")
        reset()
    };


}




const reset = () => {
    shipsArray = [];
    shipCount = 0;
    totalTry = 0;
    shipsFound.textContent = shipCount;
    totalAttempts.textContent = totalTry;
    opened = [];
    createGrids();
    createShipsArray();
    localStorage.setItem("ifGameResume", false);
    localStorage.setItem("opened", opened);

}


const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset)

const getGameStat = () => {
    shipsArray = localStorage.getItem("shipsArray").split(",");
    opened = localStorage.getItem("opened").split(",")
    for (let open of opened) {
        fillCells(gameBoardChildren[open], open)
    }
}

const fillCells = (item, j) => {
    if (shipsArray.includes(j)) {
        item.classList.add("ship");
        shipCount++;
        totalTry++;
    } else {
        item.classList.add("water");
        totalTry++;
    }
    shipsFound.textContent = shipCount;
    totalAttempts.textContent = totalTry;
}

let ifGameResume = localStorage.getItem("ifGameResume");

if (ifGameResume === "true") {
    getGameStat();
} else reset();
