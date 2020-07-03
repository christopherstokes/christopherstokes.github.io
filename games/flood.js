let board=[];
let colors=[[255,0,0,255],[0,255,0,255],[0,0,255,255]]

function flood_fill(x,y,t_col,col) {
    if (board[x] == undefined || board[x][y]==col) {
        return;
    }

    if (board[x][y] != t_col) {
        return;
    }

    board[x][y] = col;

    flood_fill(x+1,y,t_col,col);
    flood_fill(x-1,y,t_col,col);
    flood_fill(x,y+1,t_col,col);
    flood_fill(x,y-1,t_col,col);
}

function button_click(col) {
    let t_col=board[0][0];

    flood_fill(0,0,t_col,col)
}

function setup() {
    createCanvas(512, 512);
    for (let x=0;x<64;x++) {
        board[x]=[]
        for (let y=0;y<64;y++) {
            board[x][y]=Math.round(random(0,2))
        }
    }
}

function draw() {
    background(0);
    for (let x=0;x<64;x++) {
        for (let y=0;y<64;y++) {
            let col=colors[board[x][y]]
            stroke(col)
            fill(col)
            square(x*8,y*8,8)
        }
    }
}