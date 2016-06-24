
var direction   = [[0, -1], [1, 0], [0, 1], [-1, 0]],
    mover       = [],
    loadingArea = [],
    boxes       = [],
    level       = 1,
    world       = [];

// Canvas Stuff
var canvas = document.getElementById('myCanvas'),
    maxH   = canvas.height;
    maxW   = canvas.width;
    ctx    = canvas.getContext('2d');

    var boxImg = new Image();   // Create new box img 
    boxImg.src = 'img/nut.png'; // Set source path

  // mover's all 4 direction image
    var moverUp = new Image();   // Create new up img element
    moverUp.src = 'img/up.png'; 

    var moverLeft= new Image();   // Create new left img element
    moverLeft.src = 'img/left.png'; 

    var moverDown = new Image();   // Create new down img element
    moverDown.src = 'img/down.png'; 

    var moverRight = new Image();   // Create new right element
    moverRight.src = 'img/right.png';



// *********** Key events **********
function readkey() {
  document.onkeydown = moverKeyDown; 
  function moverKeyDown(e) { 
      if(e.keyCode == '38') { move(0); mkMover(0) } // up
      if(e.keyCode == '39') { move(1); mkMover(1) } // right
      if(e.keyCode == '40') { move(2); mkMover(2) } // down
      if(e.keyCode == "37") { move(3); mkMover(3) } // left
      if(e.keyCode == '27') {exitGame()} // if "esc" exit (y/n)
      if(e.keyCode == '82' || e.keyCode == '8') {resetLevel()} // if "r" reset (y/n)
      }
}

// ********* Making one move on arrow direction ***************
function move(dir) {
  // make a move only if we have empty space or load area on next move
  var next = world[mover[0] + direction[dir][0]][mover[1] + direction[dir][1]];
  if ((next === 0 ||  next === 4) &&
     (mover[0] + direction[dir][0] !== boxes[1][0] || mover[1] + direction[dir][1] !== boxes[1][1])) {
      redraw();
      mover[0] += direction[dir][0];
      mover[1] += direction[dir][1];
      mkMover(dir)
  }
  // moving the box, only if we have an empty space
  if (next === 3) {
    var next2 = world[mover[0] + 2 * direction[dir][0]][mover[1] + 2 * direction[dir][1]];
    if(next2 === 0 || next2 === 4) {
      for (var i=0; i<boxes.length; i++) {
        if (mover[0] + direction[dir][0] === boxes[i][0] &&  mover[1] + direction[dir][1] === boxes[i][1]) {
          world[mover[0] + direction[dir][0]][mover[1] + direction[dir][1]] = 0;
          world[mover[0] + 2 * direction[dir][0]][mover[1] + 2 * direction[dir][1]] = 3;
          boxes[i][0] += direction[dir][0];
          boxes[i][1] += direction[dir][1];
        }
      }
      redraw();
      mover[0] += direction[dir][0];
      mover[1] += direction[dir][1];
      mkMover(dir)
    }
  }
  checkLevelUp();
}

// ***** redrawing all board **************
function redraw() {
  ctx.clearRect(0, 0, maxH, maxW);
  for (var i=0; i<10; i++) {
    for (var j=0; j<10; j++) {
      if(world[i][j] === 2) mkWall(i, j);    
    }
  }
  mkLoadingArea();
  mkBoxes();
}

// ********* Making the mover element *********
function mkMover(val) {
  redraw();
  if (val == 0) { ctx.drawImage(moverUp, mover[0] * 50, mover[1] * 50, 50, 50) }
  if (val == 1) { ctx.drawImage(moverRight, mover[0] * 50, mover[1] * 50, 50, 50) }
  if (val == 2) { ctx.drawImage(moverDown, mover[0] * 50, mover[1] * 50, 50, 50) } 
  if (val == 3) { ctx.drawImage(moverLeft, mover[0] * 50, mover[1] * 50, 50, 50) }
}


//  ******* Drawing 1 wall element **********
function mkWall(x,y) {
  ctx.fillStyle = 'green';
  ctx.fillRect(x * 50, y * 50, '50', '50');
}

// *********** drawing 1 loading area
function mkLoadingArea() {
  for (var i=0; i<loadingArea.length; i++){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(loadingArea[i][0] * 50, loadingArea[i][1] * 50, '50', '50');
  }
  
}
// ********** Is Making one box *************** 
function mkBoxes() {
  boxes.forEach(function(val){
      ctx.drawImage(boxImg, val[0] * 50, val[1] * 50, '50', '50');
  })
}
// *********** exit game *************
function exitGame() {
  console.log("Are you sure to exit? ? (y/n)")
  // dispaly onscreen message 
  // here

  document.onkeydown = moverKeyDown; 
  function moverKeyDown(e) { 
    if (e.keyCode == '89') {console.log('You confirm the exit'
                            // Game over function 
                            //  here

                            )} // Y, the game is over 
    if (e.keyCode == '78') {console.log('You turn back to game');
                            readkey();
                            redraw();
                            mkMover(2)
                            }
    }
}

// *********** Reset Level *************
function resetLevel() {
  console.log("Are you sure to Reset current level? ? (y/n)")
  document.onkeydown = moverKeyDown; 
  function moverKeyDown(e) { 
    if (e.keyCode == '89') {console.log('You confirm the reset'); // Y, reset current level
                            clearData();
                            mkNewLevel(level);
                            redraw();
                            }
    if (e.keyCode == '78') {console.log('You turn back to game'); // N, return to game
                            readkey();
                            redraw();
                            mkMover(3)
                            }
  }
}



// *********** Chech if Level is over ***********
function checkLevelUp() {
  var isLevelUp = true;
  loadingArea.forEach(function(box){
    if (world[box[0]][box[1]] !== 3) isLevelUp = false;
  });
  if (isLevelUp) levelUp();
}

function levelUp() {
  if (level = stage.length) {console.log('game over. chech later for new stages') 
} else { 
  console.log("Level up")
}
}


// ********** New Level ******************* 
function mkNewLevel(lev) {
  readkey();
  world = stage[lev-1];
  ctx.clearRect(0, 0, maxH, maxW);
  for (var i=0; i<10; i++) {
    for (var j=0; j<10; j++) {
      switch (world[i][j]) {
        case 2: { 
                 mkWall(i, j);
                 break
                 } 
        case 4:  {
                  world[i][j] = 0;
                  loadingArea.push([i,j]);
                  mkLoadingArea();
                  break
                  }
        case 1: { 
                 mover = [i, j];
                 world[i][j] = 0;
                 break
                  }
        case 3: { 
          boxes.push([i, j]);
          break
                 }
      }
    }
  }
  moverLeft.onload = function() {     
    mkMover(3);
  }
  
  boxImg.onload = function(){
    mkBoxes();
  }
}

 
mkNewLevel(level);










