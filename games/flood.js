let board = [];
let board_wid;
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
        // curr_sel.push({x:x,y:y})
        return;
    }

    if (board[x][y] != t_col) {
        return;
    }

    board[x][y] = col;
    // curr_sel.push({x:x,y:y});
    

    flood_fill(x + 1, y, t_col, col);
    flood_fill(x - 1, y, t_col, col);
    flood_fill(x, y + 1, t_col, col);
    flood_fill(x, y - 1, t_col, col);
}

function board_clear() {
    let col;
    for (let x=0; x<64; x++) {
        for (let y=0; y<64; y++) {
            if (x==0 && y==0) {
                col = board[x][y];
            } else if (board[x][y]!=col) { 
                return false;
            }
        }
    }
    return true;
}

function button_click(col) {
    if (!board_clear() && col != board[0][0]) {    
        let t_col = board[0][0];
        turns += 1;
        document.getElementById("turns").innerHTML=turns;
        flood_fill(0, 0, t_col, col);
    }
}

function setup() {
    board_wid=64;
    if (windowWidth>=128) board_wid=128;
    if (windowWidth>=256) board_wid=256;
    if (windowWidth>=512) board_wid=512;
    createCanvas(board_wid, board_wid);
    for (let x = 0; x < 64; x++) {
        board[x] = []
        for (let y = 0; y < 64; y++) {
            board[x][y] = Math.round(random(0, 2))
        }
    }
}

function new_game() {
    for (let x = 0; x < 64; x++) {
        board[x] = []
        for (let y = 0; y < 64; y++) {
            board[x][y] = Math.round(random(0, 2))
        }
    }
    turns=0;
}

function draw() {
    dt += deltaTime;
    background(0);
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 64; y++) {
            let col = colors[board[x][y]]
            stroke(col)
            fill(col)
            square(x * (board_wid/64), y * (board_wid/64), board_wid/64)
        }
    }

    if (board_clear()) {
        // gameover
    }

    // if (dt % 1000 > 900) {
    //     for (let i = 0; i < curr_sel.length; i++) {
    //         stroke(255)
    //         fill(255)
    //         square(curr_sel[i].x * 8, curr_sel[i].y * 8, 8)
    //     }
    // }
}