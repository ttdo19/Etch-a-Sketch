const container = document.getElementById("container"); 
const slider = document.getElementById("myRange")
const numDiv = document.querySelector("#num-divs")
const toggleGrid = document.querySelector("#toggle-grid"); 

toggleGrid.addEventListener('click', toggleBorder); 

let hasBorder = 1; 

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
    }
}

slider.oninput = function() {
    numDiv.innerHTML = this.value + 'x' + this.value + " Grid"; 
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
}