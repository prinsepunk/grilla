const grid = document.getElementById('grid');
let gridJS = [];
const items = ['😡', '🤮', '😈', '👺', '🤠', '🤑'];
const facil = document.getElementById('facil');
const normal = document.getElementById('normal');
const dificil = document.getElementById('dificil');
let position = [];
let lv;

const getRandom = (items) => Math.floor(Math.random() * items.length);
const getItemRandom = (items) => items[getRandom(items)];

const createBoard = (lv) =>{
    gridJS = [];
    for (let i = 0; i < lv; i++) {
        gridJS[i] = [];
        for (let j = 0; j < lv; j++) {
            gridJS[i][j] = getItemRandom(items);
        }
    }
    // checkHorizontalMatches(gridJS);
}

const gridToHTML = (lv) =>{
    const widthGrid = 50 * lv +3;
    grid.style.width = `${widthGrid}px`;
    grid.style.height = `${widthGrid}px`;
    grid.innerHTML = '';
    for (let i = 0; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            squareGenerator(i, j)
        }
    }
}

const squareGenerator = (i, j) =>{
    const square = document.createElement('div');
    square.dataset.x = i;
    square.dataset.y = j;
    square.innerText = gridJS[i][j];
    square.style.top = `${i * 50}px`;
    square.style.left = `${j * 50}px`;
    square.addEventListener('click', selectedItem)
    grid.appendChild(square);
}


facil.addEventListener('click', ()=>{
    lv = 9;
    createBoard(lv);
    checkHorizontalMatches(gridJS);
    checkVerticalMatches(gridJS);
    gridToHTML(lv)
})

normal.addEventListener('click', ()=>{
    lv = 8;
    createBoard(lv);
    checkHorizontalMatches(gridJS);
    checkVerticalMatches(gridJS);
    gridToHTML(lv)
})

dificil.addEventListener('click', ()=>{
    lv = 7;
    createBoard(lv);
    checkHorizontalMatches(gridJS);
    checkVerticalMatches(gridJS);
    gridToHTML(lv)
})

const selectedItem = (e) =>{
    let click = document.querySelector('.selected');
    if(click){
        if (adjacent(click, e.target)) {
            // console.log('adjacentes');
            // const datax1 = Number(click.dataset.x);
            // const datay1 = Number(click.dataset.y);
            // const datax2 = Number(e.target.dataset.x);
            // const datay2 = Number(e.target.dataset.y);
            // console.log(`datax1: ${datax1}, datax2: ${datax2}, datay1: ${datay1}, datay2: ${datay2}`);

            swapElement(click, e.target);

            click.classList.remove('selected');
        } else{
            click.classList.remove('selected');
            e.target.classList.add('selected');
        }
    } else{
        e.target.classList.add('selected');
    }
}

const adjacent = (square1, square2)=>{
    const datax1 = Number(square1.dataset.x);
    const datay1 = Number(square1.dataset.y);
    const datax2 = Number(square2.dataset.x);
    const datay2 = Number(square2.dataset.y);
    // console.log(`datax1: ${datax1}, datax2: ${datax2}, datay1: ${datay1}, datay2: ${datay2}`);
    // console.log(`(x1 ${datax1} === x2 ${datax2} && y1 ${datay1} === y2+1 ${datay2+1})||
    // (x1 ${datax1} === x2 ${datax2} && y1 ${datay1} === y2-1 ${datay2-1})||
    // (x1 ${datax1} === x2+1 ${datax2+1} && y1 ${datay1} === y2 ${datay2})||
    // (x1 ${datax1} === x2-1 ${datax2-1} && y1 ${datay1} === y2 ${datay2})`);
    if(
        (datax1 === datax2 && datay1 === datay2 + 1) ||
        (datax1 === datax2 && datay1 === datay2 - 1) ||
        (datay1 === datay2 && datax1 === datax2 + 1) ||
        (datay1 === datay2 && datax1 === datax2 - 1)
    ){
        // console.log('true')
        return true
    }
    return false
}

const swapElement = (square1, square2) =>{
    const datax1 = Number(square1.dataset.x);
    const datay1 = Number(square1.dataset.y);
    const datax2 = Number(square2.dataset.x);
    const datay2 = Number(square2.dataset.y);

    let tempVar = gridJS[datax1][datay1];
    gridJS[datax1][datay1] = gridJS[datax2][datay2];
    gridJS[datax2][datay2] = tempVar;
    
    if(datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 -1)){
        square1.style.left = `${datay2 * 50}px`;
        square2.style.left = `${datay1 * 50}px`;

        square1.innerHTML = gridJS[datax1][datay1];
        square2.innerHTML = gridJS[datax2][datay2];

    } else if(datay1 === datay2 && (datax1 === datax2 +1 || datax1 === datax2 -1)){
        square1.style.top = `${datax2 * 50}px`;
        square2.style.top = `${datax1 * 50}px`;

        square1.innerHTML = gridJS[datax1][datay1];
        square2.innerHTML = gridJS[datax2][datay2];
    }
}

const checkHorizontalMatches = (gridJS) =>{
    let result = false;
    for (let i = 0; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            if(gridJS[i][j] === gridJS[i][j+1] && gridJS[i][j] === gridJS[i][j+2] && gridJS[i][j] === gridJS[i][j+3] && gridJS[i][j] === gridJS[i][j+4]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i][j+1] = '';
                gridJS[i][j+2] = '';
                gridJS[i][j+3] = '';
                gridJS[i][j+4] = '';
                gridToHTML(lv)
            } else if(gridJS[i][j] === gridJS[i][j+1] && gridJS[i][j] === gridJS[i][j+2] && gridJS[i][j] === gridJS[i][j+3]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i][j+1] = '';
                gridJS[i][j+2] = '';
                gridJS[i][j+3] = '';
                gridToHTML(lv)
            }else if(gridJS[i][j] === gridJS[i][j+1] && gridJS[i][j] === gridJS[i][j+2]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i][j+1] = '';
                gridJS[i][j+2] = '';
                gridToHTML(lv)
            }
        }
    }
    return result;
}

const checkVerticalMatches = (gridJS) =>{
    let result = false;
    for (let i = 3; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            // if(gridJS[i][j] === gridJS[i-1][j] && gridJS[i][j] === gridJS[i-2][j] && gridJS[i][j] === gridJS[i-3][j] && gridJS[i][j] === gridJS[i-4][j]){
            //     result = true;
            //     gridJS[i][j] = '';
            //     gridJS[i-1][j] = '';
            //     gridJS[i-2][j] = '';
            //     gridJS[i-3][j] = '';
            //     gridJS[i-4][j] = '';
            //     gridToHTML(lv)
            // } else 
            if(gridJS[i][j] === gridJS[i-1][j] && gridJS[i][j] === gridJS[i-2][j] && gridJS[i][j] === gridJS[i-3][j]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i-1][j] = '';
                gridJS[i-2][j] = '';
                gridJS[i-3][j] = '';
                gridToHTML(lv)
            }else if(gridJS[i][j] === gridJS[i-1][j] && gridJS[i][j] === gridJS[i-2][j]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i-1][j] = '';
                gridJS[i-2][j] = '';
                gridToHTML(lv)
            }
        }
    }
    return result;
}


// const tieneBloqueVertical = (matriz) =>{
//     let result = false;
//     for (let i = 2; i < matriz.length; i++) {
//         for (let j = 0; j < matriz[0].length; j++) {
//             if (matriz[i][j] === matriz[i-1][j] && matriz[i][j] === matriz[i-2][j]) {
//                 result = true;
//             }
//         }
//     }
//     return result
// }