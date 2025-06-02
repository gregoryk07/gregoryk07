//ENVIROMENT
var env_gravity = 0.5;
var env_accell = 0;

var grounded = false;

var leftHold = false;
var rightHold = false;

//PLAYER
var xpos = 0;
var ypos = 0;

var xvector = 0;
var yvector = 0;

var sizex = 64;
var sizey = 64;

var doLoop = true;

var timeout = 10;

var playerspeed = 3;
var playerJumpheight = -15;

var player = document.getElementById("player");
var playergraphic = document.getElementById("playergraphic");


var objects = document.getElementsByClassName("enviroment");

//ANIMATION SEQUENCE
var animSequence = 1;



//SETUP

document.onkeyup = KeyCheckUp;
document.onkeydown = KeyCheckDown;

const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    };
          
    const mainLoop = async () => {
        HandleInput();
        gravity();
        collisionCheck();
        xpos += xvector;
        ypos += yvector;
        yvector = 0;
        xvector = 0;
        collisionCheck();
        RunAnimation()

        
        player.style.transform = "translate(" +xpos + "px ," + ypos + "px)";
        console.log("translate(" +xpos + "px ," + ypos + "px)");

        var delayres = await delay(timeout);

        if(doLoop) mainLoop();
    };


function mainLoopStart(){
    
    document.getElementById("pauseMenu").style.display = "none";
    doLoop = true;
    mainLoop();
}
function mainLoopStop(){
    doLoop = false;
}

function gravity(){
    env_accell += env_gravity;
    yvector += env_accell;
    console.log("current gravity = " + env_gravity + " (" + yvector + ")");
}

function collisionCheck(){
    grounded = false;
    if(xpos < 0) xpos = 0;
    if(ypos < 0) ypos = 0;
    if(ypos + sizey > innerHeight)
    {
        //BOTTOM
        ypos = innerHeight - sizey;
        grounded = true;
        env_accell = 0;
    }
    if(xpos + sizex > innerWidth) xpos = innerWidth - sizex;


    for(var i = 0; i < objects.length; i++){
        var objposx = Number(objects[i].getAttribute("posx"));
        var objposy = Number(objects[i].getAttribute("posy"));
        var objsizex = Number(objects[i].getAttribute("sizex"));
        var objsizey = Number(objects[i].getAttribute("sizey"));

        var vaultable = Boolean(Number(objects[i].getAttribute("vaultable")));
        
        //BOTTOM
        if(ypos < objposy + objsizey && xpos < objposx + objsizex - (0.1 * objsizex) && xpos + sizex > objposx + (0.1 * objsizex) && ypos > objposy + (vaultable ? (0.01 * objsizey) : 0)){
            if(yvector < 0) yvector = 0;
            env_accell = 0;
            ypos = objposy + objsizey;
        }

        //LEFT
        if(xpos + sizex > objposx && xpos < objposx + (0.5 * objsizex) && ypos > objposy && ypos < objposy + objsizey){
            xpos = objposx - sizex;
        }

        //RIGHT
        if(xpos < objposx + objsizex && xpos > objposx + (0.5 * objsizex) && ypos > objposy && ypos < objposy + objsizey){
            xpos = objposx + objsizex;
        }

        

        //TOP
        if(ypos + sizey > objposy && xpos < objposx + objsizex && xpos + sizex > objposx && ypos < objposy + (vaultable ? (0.01 * objsizey) : 0)){
            if(yvector > 0 || env_accell > 0) 
            {
                env_accell = 0;
                yvector = 0;
            }
            ypos = objposy - sizey;
            grounded = true;
        }

        
    }
}

function HandleInput(){
    if(rightHold) xvector += playerspeed;
    if(leftHold) xvector -= playerspeed;
}

function RunAnimation(){
    var sprite = "";
    if(!grounded && leftHold){
        sprite = "tea_jump_left";
    }
    else if(!grounded){
        sprite = "tea_jump_right";
    }
    else if(rightHold){
        sprite = "tea_walk_right_" + ((animSequence > 10) ? 2 : 1);
    }
    else if(leftHold){
        sprite = "tea_walk_left_" + ((animSequence > 10) ? 2 : 1);
    }
    else{
        sprite = "tea_idle_" + ((animSequence > 10) ? 2 : 1);
    }

    console.log(sprite);
    playergraphic.style.background = "url(assets/"+sprite+".png)";
    if(animSequence > 20) 
        animSequence = 1;
    else if(animSequence < 1) animSequence = 1;
    else animSequence += 1;
    console.log(animSequence);

}
    
function KeyCheckDown()
{
    var KeyID = event.keyCode;

    switch(KeyID)
    {
      case 39: //right
        rightHold = true;
      break;
      
      case 37: //left
        leftHold = true;
      break

      case 38: //up
    //   if(grounded)
    //   {
        env_accell = playerJumpheight;
    //   }
      break;

      case 40: //down
      
      break;
      case 27:
        pause();
     }
}
function KeyCheckUp()
{
    var KeyID = event.keyCode;

    switch(KeyID)
    {
      case 39: //right
        rightHold = false;
      break;
      
      case 37: //left
        leftHold = false;
      break

      case 38: //up
        //empty
      break;

      case 40: //down
      
      break;   
     }
}

function pause(){
    mainLoopStop();
    document.getElementById("pauseMenu").style.display = "block";
}


document.getElementById("pauseMenu").style.display = "none";
mainLoopStart();