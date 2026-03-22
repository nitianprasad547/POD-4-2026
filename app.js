let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");

let turno = true;
let emptyBox = 9;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turno = true;
    emptyBox = 9;
    enableBoxes();
    msgContainer.classList.add("hidden");
    msgContainer.classList.remove("flex");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        // Player's (Player O)
        if (turno === true) {
            box.innerText = "O";
            turno = false;
            emptyBox -= 1;
            box.disabled = true;

            // 1. Check if player won
            let isGameOver = checkWinner();

            // 2. If nobody won and it's not a draw, let the bot play!
            if (!isGameOver && emptyBox > 0) {
                setTimeout(() => {
                    myfun();
                }, 500);
            }
            // 3. Option: draw check
            else if (!isGameOver && emptyBox === 0) {
                msg.innerText = "It's a Draw!";
                msgContainer.classList.remove("hidden");
                msgContainer.classList.add("flex");
            }
        }
    })
});

function myfun() {
    let emptyBoxesArray = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
            emptyBoxesArray.push(boxes[i]);
        }
    }

    if (emptyBoxesArray.length > 0) {

        let randomIndex = Math.floor(Math.random() * emptyBoxesArray.length);
        let botBox = emptyBoxesArray[randomIndex];

        // The bot plays "X"
        botBox.innerText = "X";
        botBox.disabled = true;
        emptyBox -= 1;
        turno = true; // turn goes back to Player

        let isGameOver = checkWinner();

        if (!isGameOver && emptyBox === 0) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hidden");
            msgContainer.classList.add("flex");
        }
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hidden");
    msgContainer.classList.add("flex");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let number1 = boxes[pattern[0]].innerText;
        let number2 = boxes[pattern[1]].innerText;
        let number3 = boxes[pattern[2]].innerText;

        if (number1 != "" && number2 != "" && number3 != "") {
            if (number1 === number2 && number2 === number3) {
                console.log("Winner", number1);
                showWinner(number1);
                disableBoxes();
                return true;
            }
        }
    }
    return false;
}

newButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);