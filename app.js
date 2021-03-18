const grid = document.getElementById('grid');
let gridJS = [];
const items = ['😡', '🤮', '😈', '👺', '🤠', '🤑'];
const facil = document.getElementById('facil');
const normal = document.getElementById('normal');
const dificil = document.getElementById('dificil');
let position = [];

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
}

const gridToHTML = (lv) =>{
    const widthGrid = 50 * lv +3;
    grid.style.width = `${widthGrid}px`;
    grid.style.height = `${widthGrid}px`;
    grid.innerHTML = '';
    for (let i = 0; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            const square = document.createElement('div');
            square.dataset.x = i;
            square.dataset.y = j;
            square.innerText = gridJS[i][j];
            square.style.top = `${i * 50}px`;
            square.style.left = `${j * 50}px`;
            square.addEventListener('click', selectedItem)
            grid.appendChild(square);
        }
    }
}

facil.addEventListener('click', ()=>{
    lv = 9;
    createBoard(lv);
    gridToHTML(lv)
})

normal.addEventListener('click', ()=>{
    lv = 8;
    createBoard(lv);
    gridToHTML(lv)
})

dificil.addEventListener('click', ()=>{
    lv = 7;
    createBoard(lv);
    gridToHTML(lv)
})

const selectedItem = (e) =>{
    let click = document.querySelector('.selected');
    if(click){
        if (adjacent(click, e.target)) {
            console.log('adjacentes');
            const datax1 = Number(click.dataset.x);
            const datay1 = Number(click.dataset.y);
            const datax2 = Number(e.target.dataset.x);
            const datay2 = Number(e.target.dataset.y);
            console.log(`datax1: ${datax1}, datax2: ${datax2}, datay1: ${datay1}, datay2: ${datay2}`);

            swapElement(click, e.target);
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
    if(
        (datax1 === datax2 && datay1 === datay2+1)||
        (datax1 === datax2 && datay1 === datay2-1)||
        (datax1 === datax2+1 && datay1 === datay2)||
        (datax1 === datax2-1 && datay1 === datay2)
    ){
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

        square1.dataset.y = datay2;
        square2.dataset.y = datay1;

        square1.innerHTML = gridJS[datax1][datay1];
        square2.innerHTML = gridJS[datax2][datay2];
    } else if(datay1 === datay2 && (datax1 === datax2 +1 || datax1 === datax2 -1)){
        square1.style.top = `${datax2 * 50}px`;
        square2.style.top = `${datax1 * 50}px`;

        square1.dataset.x = datax2;
        square2.dataset.x = datax1;
    }
}