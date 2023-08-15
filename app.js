let hasBorder = 1;
let eraserOn = 0; 

const container = document.getElementById("container"); 
const slider = document.getElementById("myRange")
const numDiv = document.querySelector("#num-divs")
const toggleGridBtn = document.querySelector("#toggle-grid"); 
const clearBtn = document.querySelector("#clear"); 
const eraserBtn = document.querySelector("#eraser");

toggleGridBtn.addEventListener('click', toggleBorder); 
clearBtn.addEventListener('click', clearColor); 
eraserBtn.addEventListener('click', toogleEraser); 

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows); 
    container.style.setProperty('--grid-cols', cols); 
    let cellClassName; 
    if (hasBorder) cellClassName = "grid-item with-border"; 
    else cellClassName = "grid-item"; 
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div"); 
        // cell.innerText = (i+1); 
        container.appendChild(cell).className = cellClassName; 
        cell.addEventListener('mouseenter', addHoverEffect); 
    }
}

//by default 
makeRows(50, 50); 
numDiv.innerHTML = "Grid size: 50x50"; 

slider.oninput = function() {
    numDiv.innerHTML = "Grid size: " + this.value + 'x' + this.value; 
    deleteGrid(); 
    makeRows(this.value, this.value); 
}

function deleteGrid() {
    while(container.firstChild) {
        container.lastChild = null; 
        container.removeChild(container.lastChild); 
    }
}

function toggleBorder() {
    const cells = document.querySelectorAll(".grid-item"); 
    cells.forEach((cell)=> cell.classList.toggle("with-border")); 
    hasBorder = !hasBorder; 
    toggleGridBtn.classList.toggle("clicked"); 
}

function addHoverEffect(e) {
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
