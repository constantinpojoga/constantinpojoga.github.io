
// Canvas Stuff
var canvas = document.getElementById('myCanvas'),
    maxH   = canvas.height;
    maxW   = canvas.width;
    ctx    = canvas.getContext('2d');
 
    var boxImg     = new Image();   // Create new box img 
    boxImg.src     = 'img/nut.png'; // Set source path
    // boxImg.onload = function() {ctx.drawImage(boxImg, 1000, 1000, 75, 75) }

  // mover's all 4 direction image
    var warningStripes    = new Image();   // Create new right element
    warningStripes.src    = 'img/warning-stripes.png';
    // warningStripes.onload = function() {ctx.drawImage(warningStripes, 1000, 1000, 75, 75)}

    var moverUp    = new Image();   // Create new up img element
    moverUp.src    = 'img/up.png'; 

    var moverLeft  = new Image();   // Create new left img element
    moverLeft.src  = 'img/left.png'; 
    // moverLeft.onload = function() { ctx.drawImage(moverLeft, 1000, 1000, 75, 75) }

    var moverDown  = new Image();   // Create new down img element
    moverDown.src  = 'img/down.png'; 

    var moverRight = new Image();   // Create new right element
    moverRight.src = 'img/right.png';

    var iceCube    = new Image();   // Create new right element
    iceCube.src    = 'img/ice-cube.png',
    animationOn    = false;


    
var level = 1;
    world       = [];

var direction   = [[0, -1], [1, 0], [0, 1], [-1, 0]],
    mover       = [],
    loadingArea = [],
    boxes       = [];
    
  // *********** Key events **********
  function readkey() {
    document.onkeydown = moverKeyDown; 
    function moverKeyDown(e) { 
        if(e.keyCode == '38') { move(0); mkMover(0) } // up
        if(e.keyCode == '39') { move(1); mkMover(1) } // right
        if(e.keyCode == '40') { move(2); mkMover(2) } // down
        if(e.keyCode == "37") { move(3); mkMover(3) } // left
        if(e.keyCode == '27') {exitGame()} // if "esc" exit (y/n)
        if(e.keyCode == '82' || e.keyCode == '8') {resetLevel()} // if "r" or "return" reset (y/n)
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
    if (val == 0) { ctx.drawImage(moverUp, mover[0] * 75, mover[1] * 75, 75, 75) }
    if (val == 1) { ctx.drawImage(moverRight, mover[0] * 75, mover[1] * 75, 75, 75) }
    if (val == 2) { ctx.drawImage(moverDown, mover[0] * 75, mover[1] * 75, 75, 75) } 
    if (val == 3) { ctx.drawImage(moverLeft, mover[0] * 75, mover[1] * 75, 75, 75) }
  }


  //  ******* Drawing 1 wall element **********
  function mkWall(x,y) {
    ctx.drawImage(iceCube, x * 75, y * 75, '75', '75')
  }

  // *********** drawing 1 loading area
  function mkLoadingArea() {
    for (var i=0; i<loadingArea.length; i++){
      ctx.drawImage(warningStripes, loadingArea[i][0] * 75, loadingArea[i][1] * 75, '75', '75')
    }
    
  }
  // ********** Is Making one box *************** 
  function mkBoxes() {
    boxes.forEach(function(val){
        ctx.drawImage(boxImg, val[0] * 75, val[1] * 75, '75', '75');
    })
  }
  // *********** exit game *************
  function exitGame() {
    console.log("Are you sure to exit? ? (y/n)")
    // dispaly onscreen message 
    // here

    $(".bubble").html('<p>Are you sure</p><p>to exit the game?</p><p>y/n</p>');

    document.onkeydown = moverKeyDown; 
    function moverKeyDown(e) { 
      if (e.keyCode == '89') {
        gameOver();              // Y, the game is over 
      }
      if (e.keyCode == '78') {
        $(".bubble").html('<h2>Collect all my acorns</h2>');  // n,  
        readkey();
        redraw();
        mkMover(2)
      }
    }
  }

  // *********** Reset Level *************
  function resetLevel() {
    // animationOn = false;
    $(".bubble").html('<p>Are you sure to Reset current level? <br /> (y/n)"</p>');
    // console.log("Are you sure to Reset current level? ? (y/n)")
    document.onkeydown = moverKeyDown; 
    function moverKeyDown(e) { 
      if (e.keyCode == '89') {
        $(".bubble").html('<p>Restarting level</p>');
        // console.log('You confirm the reset'); // Y, reset current level
        boxes = [];
        loadingArea = [];
        getWorld();
        mkNewLevel();
        mkBoxes();
        mkMover(3)
      }
      if (e.keyCode == '78') {
        $(".bubble").html('<p>Welcome back</p>');
        console.log('You turn back to game'); // N, return to game
        mkNewLevel(level);
        mkBoxes();
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
    if (isLevelUp) {
      if (level === stage.length ) {
        $(".bubble").html('<p>This was the last level. Check later for more new levels.</p>');
        // console.log('game over. chech later for new stages') 
    } else levelUp();
    }
  }
 // Function ********  Level UP  ***********
  function levelUp() {
      var i= 0;     
      loadingArea = [];
      var time = setInterval(function() {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.lineWidth = "22";
        ctx.moveTo( i*20-10, -10);
        ctx.lineTo(i*20 - 150, 760);
        ctx.stroke();  // Draw it  
        if (i>45 ) { 
          clearInterval(time);
          ctx.globalCompositeOperation = "destination-over"; 
     // Load the net level
          level++;
          boxes = [];
          getWorld();
          mkNewLevel();
          mkBoxes();
          mkMover(3)
        }
        i++;
      }, 15);  
  }

  // Function *************  GAME OVER  ****************
  function gameOver() {
    // animationOn = true;
    $(".bubble").html('<h2>GAME</h2><h2>OVER</h2>');
    ctx.clearRect(75, 75, 600, 600);
    var gameOvr = new Image();
    gameOvr.src = 'img/scrat/3.png';
    gameOvr.onload = function(){
      ctx.drawImage(gameOvr, 30, 100, 720, 500);
    };
      var i= 0;     
      var time = setInterval(function() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.lineWidth = "12";
      ctx.beginPath();
      ctx.arc(370,370,700-i*10,0,2*Math.PI);
      ctx.stroke();
      if (i>67 ) { 
        clearInterval(time);
        ctx.globalCompositeOperation = "destination-over"; 
        ctx.clearRect(75, 75, 600, 600); 
        ctx.font = "80px Arial";
        $(".myCanvas").html('<h1>See You next time!</h1>');
        $(".commands").html(' ');
        $("body").css('background-image', 'url(img/bg_exit.jpg)')
      }
      i++;
    }, 50);   
  }

  // ********** New Level ******************* 
  function mkNewLevel() {
    // animationOn = false;
    readkey();  
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
    mkLoadingArea();
    // moverLeft.onload = function() {     
    mkMover(3);
    // }  
    // boxImg.onload = function(){
    mkBoxes();
    // }
      $(".bubble").html('<h2>Level</h2><h2>' + level +'</h2>');
  }

  function getWorld(){
    world = [];
    for (var i = 0; i < stage[level-1].length; i++) {
      var row = [];
      for (var j = 0; j<stage[level-1][i].length; j++) {
        row.push(stage[level-1][i][j]);
      }
      world.push(row);
    }
  }
  intro();
 
 function intro() {
  $(".bubble").html('<h2>Welcome</h2><h3>to my game</h3>');
  $(".welcome").html('<h1>Collect all <br />arcons<br /><small>Press any key</small></h1>');
   document.onkeydown = moverKeyDown; 
    function moverKeyDown(e) { 
      if (e.keyCode) {
        $(".welcome").html('');
        getWorld();
        mkNewLevel(level);
      }
  }
}









