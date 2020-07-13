// strategic addition
// tiles that are worth multiplyers if filled with the right color
// turns take points away at end of round
// as game goes on, levels add new colors and increase board size
// draw_board will be animated between colors

let board = [];
let draw_board = [];
let special_tiles = [];
let animating = false;
let board_wid;
let colors = [
    [208, 70, 72, 255],
    [109, 170, 44, 255],
    [89, 125, 206, 206],
    [252, 227, 115, 255],
    [252, 227, 115, 255],
];
let turns = 0;
let points = 0;
let fill_points = 0;
let dt = 0;
let multiplyer = 1;

function flood_fill(x, y, t_col, col) {
    if (board[x] == undefined) {
        return;
    }
    if (board[x][y] == col && !special_tiles[x][y]) {
        return;
    }

    if (board[x][y] != t_col && !special_tiles[x][y]) {
        return;
    }

    board[x][y] = col;
    fill_points += 1;

    if (special_tiles[x][y] == board[x][y]) {
        multiplyer +=1;
    }
    special_tiles[x][y]=null;

    flood_fill(x + 1, y, t_col, col);
    flood_fill(x - 1, y, t_col, col);
    flood_fill(x, y + 1, t_col, col);
    flood_fill(x, y - 1, t_col, col);
}

function board_clear() {
    let col;
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 64; y++) {
            if (x == 0 && y == 0) {
                col = board[x][y];
            } else if (board[x][y] != col) {
                return false;
            }
        }
    }
    return true;
}

function button_click(col) {
    if (!board_clear() && col != board[0][0]) {
        let t_col = board[0][0];
        fill_points = 0;
        multiplyer = 1;

        flood_fill(0, 0, t_col, col);
        turns += 1;

        points += (fill_points - points) * multiplyer;

        document.getElementById("turns").innerHTML = turns;
        document.getElementById("points").innerHTML = points;
        document.getElementById("multiplyer").innerHTML = multiplyer;

        animating = false;
        update_draw();
    }
}

function update_draw() {
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 64; y++) {
            let r = draw_board[x][y].r;
            let g = draw_board[x][y].g;
            let b = draw_board[x][y].b;

            if (colors[board[x][y]] !== [r, g, b]) {
                if (!animating) {
                    board_color = colors[board[x][y]]
                    TweenLite.to(draw_board[x][y], .5+(x/16)+(y/16), {
                        r: board_color[0]
                    })
                    TweenLite.to(draw_board[x][y], .5+(x/16)+(y/16), {
                        g: board_color[1]
                    })
                    TweenLite.to(draw_board[x][y], .5+(x/16)+(y/16), {
                        b: board_color[2]
                    })
                }


            }
        }
    }
}

function setup() {
    board_wid = 64;
    if (windowWidth >= 128) board_wid = 128;
    if (windowWidth >= 256) board_wid = 256;
    if (windowWidth >= 512) board_wid = 512;
    createCanvas(board_wid, board_wid);
    new_game();
    setup_recorder();
}

function windowResized() {
    board_wid = 64;
    if (windowWidth >= 128) board_wid = 128;
    if (windowWidth >= 256) board_wid = 256;
    if (windowWidth >= 512) board_wid = 512;
    resizeCanvas(board_wid, board_wid);
}

function new_game() {
    for (let x = 0; x < 64; x++) {
        board[x] = []
        draw_board[x] = []
        special_tiles[x] = []
        for (let y = 0; y < 64; y++) {
            let col = Math.round(random(0, 2));
            board[x][y] = col;
            draw_board[x][y] = {
                r: colors[col][0],
                g: colors[col][1],
                b: colors[col][2],
            };

            if (random() > 0.99) {
                special_tiles[x][y] = col;
            } else {
                special_tiles[x][y] = null;
            }
        }
    }
    turns = 0;
    points = 0;
}

function keyPressed() {
    if (keyCode === 119) {
        start_recording();
    }
    if (keyCode === 120) {
        stop_recording();
    }
}

function draw() {
    dt += deltaTime;

    background(0);
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 64; y++) {
            let col = draw_board[x][y];
            stroke([col.r, col.g, col.b])
            fill([col.r, col.g, col.b])
            square(x * (board_wid / 64), y * (board_wid / 64), board_wid / 64)

            if (special_tiles[x][y] && dt % 1000 > 500) {
                stroke(255)
                fill(255)
                square(x * (board_wid / 64), y * (board_wid / 64), board_wid / 64)
            }
            if (special_tiles[x][y] && dt % 1000 <= 500) {
                stroke(colors[special_tiles[x][y]])
                fill(colors[special_tiles[x][y]])
                square(x * (board_wid / 64), y * (board_wid / 64), board_wid / 64)
            }
        }
    }

    if (board_clear()) {
        // gameover
    }
}