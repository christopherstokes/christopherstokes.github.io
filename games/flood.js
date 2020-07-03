let board = [];
let colors = [
    [255, 0, 0, 255],
    [0, 255, 0, 255],
    [0, 0, 255, 255]
];
let turns = 0;
let curr_sel = [];
let dt = 0;

function flood_fill(x, y, t_col, col) {
    if (board[x] == undefined) {
        return;
    }
    if (board[x][y] == col) {
        curr_sel.push({x:x,y:y})
        return;
    }

    if (board[x][y] != t_col) {
        return;
    }

    board[x][y] = col;
    curr_sel.push({x:x,y:y});
    

    flood_fill(x + 1, y, t_col, col);
    flood_fill(x - 1, y, t_col, col);
    flood_fill(x, y + 1, t_col, col);
    flood_fill(x, y - 1, t_col, col);
}

function button_click(col) {
    let t_col = board[0][0];
    turns += 1;
    flood_fill(0, 0, t_col, col);
}

function setup() {
    createCanvas(512, 512);
    for (let x = 0; x < 64; x++) {
        board[x] = []
        for (let y = 0; y < 64; y++) {
            board[x][y] = Math.round(random(0, 2))
        }
    }
}

function draw() {
    dt += deltaTime;
    background(0);
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 64; y++) {
            let col = colors[board[x][y]]
            stroke(col)
            fill(col)
            square(x * 8, y * 8, 8)
        }
    }

    if (dt % 1000 > 500) {
        for (let i = 0; i < curr_sel.length; i++) {
            stroke(255)
            fill(255)
            square(curr_sel[i].x * 8, curr_sel[i].y * 8, 8)
        }
    }
}