let flagPosition = [];
let carPosition = [];
let putCar = false;
let up = true;
let left = false;
let right = false;
let down = false;
let currentCarRow = 0;
let currentCarCol = 0;
let levelElement = document.getElementById("levels");
  
function createElements(newCurrentCarRow, newCurrentCarCol) {
    if (newCurrentCarRow == -1) {
        currentCarRow = 8;
    } else if (newCurrentCarRow == 9) {
        currentCarRow = 0;
    } else {
        currentCarRow = newCurrentCarRow;
    }
    if (newCurrentCarCol == -1) {
        currentCarCol = 8;
    } else if (newCurrentCarCol == 9) {
        currentCarCol = 0;
    } else {
        currentCarCol = newCurrentCarCol;
    }
    const placesContainer = document.getElementById("placesContainer");
    placesContainer.innerHTML = '';
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            if (row == currentCarRow && col == currentCarCol){
                const box = document.createElement("img");
                box.className = "carImg";
                if (up) {
                    box.src = "UpImg.png";
                } else if(left){
                    box.src = "LeftImg.png";
                } else if(right){
                    box.src = "RightImg.png";
                } else if(down){
                    box.src = "DownImg.png";
                }
                carPosition = [row, col];
                placesContainer.appendChild(box);
            } else if (row == 0 && col == 8){
                const box = document.createElement("img");
                box.className = "box";
                box.src = "flag.webp";
                flagPosition = [row, col];
                placesContainer.appendChild(box);
            } 
            else {
                const box = document.createElement("div");
                box.className = "box";
                box.textContent = "";
                placesContainer.appendChild(box);
            }
        }
        placesContainer.appendChild(document.createElement("br"));
    }
    car.element = document.getElementsByClassName('carImg')[0];
    if (carPosition[0] == flagPosition[0] && carPosition[1] == flagPosition[1]) {
        levelElement.innerHTML = "Du hast gewonnen";
    }
}
window.onload = function() {
    createElements(8,0);
}
let car = {
    element: null,
    moveForward: function() {
        if (up) {
            createElements(currentCarRow -1, currentCarCol)
        } else if(left){
            createElements(currentCarRow, currentCarCol -1)
        } else if(right){
            createElements(currentCarRow, currentCarCol +1)
        } else if(down){
            createElements(currentCarRow +1, currentCarCol)
        }
    },
    turnLeft: function() {
        if (up) {
            this.element.src = "LeftImg.png";
            this.swithDirection("left");
        } else if(left){
            this.element.src = "DownImg.png";
            this.swithDirection("down");
        } else if(right){
            this.element.src = "UpImg.png";
            this.swithDirection("up");
        } else if(down){
            this.element.src = "RightImg.png";
            this.swithDirection("right");
        }
        
    },
    turnRight: function() {
        if (up) {
            this.element.src = "RightImg.png";
            this.swithDirection("right");
        } else if(left){
            this.element.src = "UpImg.png";
            this.swithDirection("up");
        } else if(right){
            this.element.src = "DownImg.png";
            this.swithDirection("down");
        } else if(down){
            this.element.src = "LeftImg.png";
            this.swithDirection("left");
        }
    },
    updatePosition: function() {
        this.element.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;
    },
    swithDirection: function(direction) {
        up = false,
        left = false,
        right = false,
        down = false
        switch (direction) {
            case "up":
                up = true;
                break;
            case "left":
                left = true;
                break;
            case "right":
                right = true;
                break;
            case "down":
                down = true;
                break;
        }
    }
};

let actionQueue = [];
let isExecuting = false;

function addAction(action) {
    actionQueue.push(action);
    if (!isExecuting) {
        executeNextAction();
    }
}

function executeNextAction() {
    if (actionQueue.length > 0) {
        isExecuting = true;
        let action = actionQueue.shift();
        action();
        setTimeout(executeNextAction, 500);
    } else {
        isExecuting = false;
    }
}

function runCode() {
    let code = document.getElementById('codeInput').value;
    let safeCode = `with(car) {
        ${code.replace(/car\.(moveForward|turnLeft|turnRight)\(\)/g, 'addAction(() => car.$1())')}
    }`;
    try {
        eval(safeCode);
    } catch (e) {
        alert('Fehler im Code: ' + e.message);
    }
}
function insertSpaces(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        var textarea = event.target;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var spaces = "    "; 
        textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
    }
}