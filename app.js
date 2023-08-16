let hasBorder = 1;
let eraserIsOn = 0;  
let gridSize; 
let penIsActive = 0; 
let backgroundColor = "#FFFFFF"; 
let penColor = "#000000"; 

const container = document.getElementById("grid-container"); 
const slider = document.getElementById("myRange")
const numDiv = document.querySelector("#num-divs")
const toggleGridBtn = document.querySelector("#toggle-grid"); 
const clearBtn = document.querySelector("#clear"); 
const eraserBtn = document.querySelector("#eraser");
const backgroundColorPicker =document.querySelector("#background-color-picker"); 
const penColorPicker =document.querySelector("#pen-color-picker"); 

toggleGridBtn.addEventListener('click', toggleBorder); 
clearBtn.addEventListener('click', clearColor); 
eraserBtn.addEventListener('click', toogleEraser); 

function makeGrid(rows, cols) {
    container.style.backgroundColor = backgroundColor; 
    container.style.setProperty('--grid-rows', rows); 
    container.style.setProperty('--grid-cols', cols); 
    gridSize = rows; 
    let cellClassName; 
    if (hasBorder) cellClassName = "grid-item top-left-border"; 
    else cellClassName = "grid-item"; 
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div"); 
        cell.style.backgroundColor = backgroundColor; 
        // cell.innerText = (i+1); 
        container.appendChild(cell).className = cellClassName; 
        //add the right border to all cells on the right edge of the grid
        if (hasBorder && (i % cols === cols -1)) cell.classList.add("right-border"); 
        //add the bottom border to all cells on the bottom edge of the grid
        if (hasBorder && (Math.floor(i/rows) === rows-1)) cell.classList.add("bottom-border"); 
        cell.addEventListener('click', togglePen); 
    }
}

//by default 
function startup() {
    makeGrid(50, 50); 
    numDiv.innerHTML = "Grid size: 50x50"; 
    backgroundColorPicker.value = backgroundColor; 
    backgroundColorPicker.addEventListener("input", updateBackgroundColor, false); 
    penColorPicker.value = penColor; 
    penColorPicker.addEventListener("input", updatePenColor, false); 
    // backgroundColorPicker.addEventListener("change", updateAll, false); 
    backgroundColorPicker.select(); 
}

window.addEventListener("load", startup, false); 

//if user changes the size of the grid, then delete the current one and create a new one
slider.oninput = function() {
    numDiv.innerHTML = "Grid size: " + this.value + 'x' + this.value; 
    deleteGrid(); 
    makeGrid(this.value, this.value); 
}

function deleteGrid() {
    while(container.firstChild) {
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

function togglePen() {
    const cells = document.querySelectorAll(".grid-item");
    if (!penIsActive) {    
        cells.forEach((cell) => cell.addEventListener("mouseleave", activatePen)); 
    } else {
        cells.forEach((cell) => cell.removeEventListener("mouseleave", activatePen)); 
    }
    penIsActive = !penIsActive; 
}

function activatePen(e) {
    if (eraserIsOn) {
        e.target.style.backgroundColor = backgroundColor; 
        e.target.classList.remove("currently-used"); 
    }
    else {
        e.target.style.backgroundColor = penColor; 
        e.target.classList.add("currently-used"); 
    }
}

function clearColor() {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell)=> cell.style.backgroundColor = backgroundColor); 
    clearBtn.classList.add("clicked"); 
    setTimeout(() => clearBtn.classList.remove("clicked"), 400); 
}

function toogleEraser() {
    eraserIsOn = !eraserIsOn; 
    eraserBtn.classList.toggle("clicked"); 
}

function updateBackgroundColor(e) {
    const cells = Array.from(document.querySelectorAll(".grid-item")); 
    const currentlyUsedCells = Array.from(document.querySelectorAll(".currently-used")); 
    const notUsedCells = cells.filter((cell) => !currentlyUsedCells.includes(cell)); 
    notUsedCells.forEach((cell) => cell.style.backgroundColor = e.target.value); 
    backgroundColor = e.target.value; 
}

function updatePenColor(e) {
    const currentlyUsedCells = Array.from(document.querySelectorAll(".currently-used")); 
    // currentlyUsedCells.forEach((cell) => cell.style.backgroundColor = e.target.value); 
    penColor = e.target.value; 
}
