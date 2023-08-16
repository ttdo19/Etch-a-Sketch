let hasBorder = 1;
let eraserOn = 0;  
let gridSize; 
const defaultColor = "#FFFFFF"; 

const container = document.getElementById("container"); 
const slider = document.getElementById("myRange")
const numDiv = document.querySelector("#num-divs")
const toggleGridBtn = document.querySelector("#toggle-grid"); 
const clearBtn = document.querySelector("#clear"); 
const eraserBtn = document.querySelector("#eraser");
const colorPicker =document.querySelector("#color-picker"); 

toggleGridBtn.addEventListener('click', toggleBorder); 
clearBtn.addEventListener('click', clearColor); 
eraserBtn.addEventListener('click', toogleEraser); 

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows); 
    container.style.setProperty('--grid-cols', cols); 
    gridSize = rows; 
    let cellClassName; 
    if (hasBorder) cellClassName = "grid-item top-left-border"; 
    else cellClassName = "grid-item"; 
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div"); 
        // cell.innerText = (i+1); 
        container.appendChild(cell).className = cellClassName; 
        //add the right border to all cells on the right edge of the grid
        if (hasBorder && (i % cols === cols -1)) cell.classList.add("right-border"); 
        //add the bottom border to all cells on the bottom edge of the grid
        if (hasBorder && (Math.floor(i/rows) === rows-1)) cell.classList.add("bottom-border"); 
        cell.addEventListener('click', activatePen); 
    }
}

//by default 
function startup() {
    makeGrid(50, 50); 
    numDiv.innerHTML = "Grid size: 50x50"; 
    colorPicker.value = defaultColor; 
    colorPicker.addEventListener("input", updateAll, false); 
    colorPicker.addEventListener("change", updateAll, false); 
    colorPicker.select(); 
}

window.addEventListener("load", startup, false); 

slider.oninput = function() {
    numDiv.innerHTML = "Grid size: " + this.value + 'x' + this.value; 
    deleteGrid(); 
    makeGrid(this.value, this.value); 
}

function deleteGrid() {
    while(container.firstChild) {
        container.removeEventListener('mousedown', addHoverEffect); 
        container.lastChild = null; 
        container.removeChild(container.lastChild); 
    }
}

function toggleBorder() {
    const cells = document.querySelectorAll(".grid-item"); 
    for (let i = 0; i < gridSize * gridSize; i++) {
        cells[i].classList.toggle("top-left-border"); 
        if (i % gridSize === gridSize -1) cells[i].classList.toggle("right-border"); 
        if (Math.floor(i/gridSize) === gridSize-1) cells[i].classList.toggle("bottom-border"); 
    }
    hasBorder = !hasBorder; 
    toggleGridBtn.classList.toggle("clicked"); 
}

function activatePen(e) {
    if (eraserOn) e.target.style.backgroundColor = 'white'; 
    else e.target.style.backgroundColor = 'black'; 
}

function clearColor() {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell)=> cell.style.backgroundColor = 'white'); 
    clearBtn.classList.add("clicked"); 
    setTimeout(() => clearBtn.classList.remove("clicked"), 400); 
}

function toogleEraser() {
    eraserOn = !eraserOn
    eraserBtn.classList.toggle("clicked"); 
}

function updateAll(e) {
    const cells = document.querySelectorAll(".grid-item"); 
    cells.forEach((cell) => cell.style.backgroundColor = e.target.value); 
}
