//ENVIROMENT
var env_gravity = 0.5; //0.5
var env_accell_y = 0;
var env_accell_x = 0;

var env_speed_normal = 3;
var env_speed_run = 5;

var grounded = false;

var leftHold = false;
var rightHold = false;

//PLAYER
var xpos = 0; //0
var ypos = 0; //0

var xvector = 0;
var yvector = 0;

var sizex = 48;
var sizey = 48;

var doLoop = true;

var timeout = 10;

var playerspeed = 3;
var playerJumpheight = -15;

var crouching = false;

var running = false;

var inAirNerf = 0.99;

var player = document.getElementById("player");
var playergraphic = document.getElementById("playergraphic");


var objects = document.getElementsByClassName("enviroment");

//ANIMATION SEQUENCE
var animSequence = 1;
var faviconAnimSequence = 1;

//AUTO SCROLLING

var scrollmargin = 5;

var scrollValue = 0;

//SCREEN SIZE

var screenmaxwidth = 4096;
var screenmaxheight = 576;

//SETUP

document.onkeyup = KeyCheckUp;
document.onkeydown = KeyCheckDown;
function setup(){
    //ENVIROMENT
    env_gravity = 0.5; //0.5
    env_accell_y = 0;
    env_accell_x = 0;

    env_speed_normal = 3;
    env_speed_run = 5;

    grounded = false;

    leftHold = false;
    rightHold = false;

    //PLAYER
    xpos = 0; //0
    ypos = 0; //0

    xvector = 0;
    yvector = 0;

    sizex = 48;
    sizey = 48;

    doLoop = true;

    timeout = 10;

    playerspeed = 3;
    playerJumpheight = -15;

    crouching = false;

    running = false;

    inAirNerf = 0.99;

    objects = document.getElementsByClassName("enviroment");

    //ANIMATION SEQUENCE
    animSequence = 1;
    faviconAnimSequence = 1;

    //AUTO SCROLLING

    scrollmargin = 5;

    scrollValue = 0;

    //SCREEN SIZE

    screenmaxwidth = 4096;
    screenmaxheight = 576;
}

// setup();

const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    };
          
    const mainLoop = async () => {
        HandleInput();
        gravity();
        collisionCheck();
        if(xvector < -playerspeed) xvector = -playerspeed;
        if(xvector > playerspeed) xvector = playerspeed;
        xpos += xvector;
        ypos += yvector;
        ScrollScreen()
        yvector = 0;
        collisionCheck();
        if(!grounded || crouching)
        {
            xvector *= inAirNerf;
            // console.log("RESET " + (crouching ? "CROUCH" : ""))
        }
        else{
            xvector = 0;
        }
        RunAnimation()

        
        player.style.transform = "translate(" +xpos + "px ," + ypos + "px)";
        // console.log("translate(" +xpos + "px ," + ypos + "px)");


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
    env_accell_y += env_gravity;
    yvector += env_accell_y;
    // console.log("current gravity = " + env_gravity + " (" + yvector + ")");
}

function collisionCheck(){
    grounded = false;
    if(xpos < 0) xpos = 0;
    if(ypos < 0) ypos = 0;
    if(ypos + sizey > screenmaxheight)
    {
        //BOTTOM
        ypos = screenmaxheight - sizey;
        grounded = true;
        env_accell_y = 0;
    }
    if(xpos + sizex > screenmaxwidth) xpos = screenmaxwidth - sizex;


    for(var i = 0; i < objects.length; i++){
        var objposx = Number(objects[i].getAttribute("posx"));
        var objposy = Number(objects[i].getAttribute("posy"));
        var objsizex = Number(objects[i].getAttribute("sizex"));
        var objsizey = Number(objects[i].getAttribute("sizey"));

        var vaultable = Boolean(Number(objects[i].getAttribute("vaultable")));
        
        //BOTTOM
        if(ypos < objposy + objsizey && xpos < objposx + objsizex - (0.1 * objsizex) && xpos + sizex > objposx + (0.1 * objsizex) && ypos > objposy + (vaultable ? (0.01 * objsizey) : 0)){
            if(yvector < 0) yvector = 0;
            env_accell_y = 0;
            ypos = objposy + objsizey;
        }

        //LEFT
        if(xpos + sizex > objposx && xpos + sizex < objposx + (0.5 * objsizex) && ypos >= objposy && ypos < objposy + objsizey){
            xpos = objposx - sizex;
        }

        //RIGHT
        if(xpos < objposx + objsizex && xpos > objposx + (0.5 * objsizex) && ypos >= objposy && ypos < objposy + objsizey){
            xpos = objposx + objsizex;
        }

        //TOP
        if(ypos + sizey > objposy && xpos < objposx + objsizex && xpos + sizex > objposx && ypos < objposy + (vaultable ? (0.01 * objsizey) : 0)){
            if(yvector > 0 || env_accell_y > 0) 
            {
                env_accell_y = 0;
                yvector = 0;
            }
            ypos = objposy - sizey;
            grounded = true;
        }

        
    }
}

function ScrollScreen(){
    if(xpos < scrollmargin + scrollValue){
        scrollValue += xvector;
        xpos = scrollmargin + scrollValue;
        // console.log("SCROLLLEFT");
    }
    if(xpos + sizex > innerWidth + scrollValue - scrollmargin){
        scrollValue += xvector;
        xpos = innerWidth + scrollValue - scrollmargin - sizex;
        // console.log("SCROLLRIGHT");
    }
    if(scrollValue < 0) scrollValue = 0;
    if(scrollValue > screenmaxwidth) scrollValue = screenmaxwidth;
    scrollTo(scrollValue, scrollY);

    document.getElementById("pauseMenu").style.left = scrollValue + "px";
    document.getElementById("controls").style.left = scrollValue + "px";
    // console.log(scrollValue);
}

function HandleInput(){
    if(!crouching)
    {
        if(rightHold) xvector += playerspeed;
        if(leftHold) xvector -= playerspeed;
    }
}

function RunAnimation(){
    var sprite = "";
    if(crouching && leftHold){
        sprite = "tea_crouch_left"
    }
    else if(crouching){
        sprite = "tea_crouch_right";
    }
    else if(!grounded && leftHold){
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

    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = 'assets/tea_idle_'+((faviconAnimSequence > 100) ? 2 : 1)+".png";

    if(faviconAnimSequence > 200) 
        faviconAnimSequence = 1;
    else if(faviconAnimSequence < 1) faviconAnimSequence = 1;
    else faviconAnimSequence += 1;

    // console.log(sprite);
    playergraphic.style.background = "url(assets/"+sprite+".png)";
    playergraphic.style.backgroundSize = sizex + "px, " + sizey +"px";
    if(animSequence > 20) 
        animSequence = 1;
    else if(animSequence < 1) animSequence = 1;
    else animSequence += 1;

    if(running){
        animSequence += 1;
    }
    // console.log(animSequence);

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
      break;

      case 38: //up
      if(grounded)
      {
        env_accell_y = playerJumpheight;
      }
      break;

      case 40: //down
        crouching = true;
      break;
      case 27: //esc
        pause();
        break;

        case 16: //shift
        running = true;
        playerspeed = env_speed_run;
      break;
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
      break;

      case 38: //up
        //empty
      break;

      case 40: //down
        crouching = false;
      break;   
      
      case 16: //shift
        running = false;
        playerspeed = env_speed_normal;
      break;
     }
}

function pause(){
    mainLoopStop();
    document.getElementById("pauseMenu").style.display = "block";
}


document.getElementById("pauseMenu").style.display = "none";
mainLoopStart();

function exportMap(){
    objects = document.getElementsByClassName("enviroment");

    var part1 = screenmaxwidth + "x" + screenmaxheight;





    var part2 = "";

    for(var i = 0; i < objects.length; i++)
    {
        var spritePath = String(objects[i].style.background).split("\"")[1];

        part2 += objects[i].getAttribute("posx") + "$" + 
        objects[i].getAttribute("posy") + "$" + 
        objects[i].getAttribute("sizex") + "$" + 
        objects[i].getAttribute("sizey") + "$" + 
        objects[i].getAttribute("vaultable") + "$" + 
        spritePath;

        if(i + 1 < objects.length) part2 += "&";
    }

    var fullPart = part1 + "???" + part2;

    document.getElementById("mapcodetextarea").value = fullPart;
}

function importMap(){
    objects = document.getElementsByClassName("enviroment");
    
    for(var i = 0; i < objects.length; i++)
    {
        objects[i].remove();
    }

    
    var fullpart = String(document.getElementById("mapcodetextarea").value);

    var part1 = fullpart.split("???")[0];
    
    

    var part2 = fullpart.split("???")[1];


    // document.getElementById("xsizeinput").value = Number(part1.split("x")[0]);

    // document.getElementById("ysizeinput").value = Number(part1.split("x")[1]);
    

    var partedpart2 = part2.split("&");
    for(var i = 0; i < partedpart2.length; i++){
        var posx = partedpart2[i].split("$")[0];
        var posy = partedpart2[i].split("$")[1];
        var sizex = partedpart2[i].split("$")[2];
        var sizey = partedpart2[i].split("$")[3];
        var vaultable = partedpart2[i].split("$")[4]
        var sprite = partedpart2[i].split("$")[5];


        selectedObject = -1;
        // console.log("NOTFOUND");
        var newObject = document.createElement("div");
        newObject.className = "enviroment";
        newObject.setAttribute("posx", posx);
        newObject.setAttribute("posy", posy);
        newObject.setAttribute("sizex", sizex);
        newObject.setAttribute("sizey", sizey);
        newObject.setAttribute("vaultable", vaultable);
        newObject.style.background = "url("+sprite+")";
        newObject.style.width = sizex + "px";
        newObject.style.height = sizey + "px";
        newObject.style.transform = "translate("+posx+"px, " + posy + "px)";
        newObject.style.backgroundSize = "64px 64px";
        newObject.style.imageRendering = "pixelated"
        newObject.style.position = "absolute";
        document.getElementById("game").appendChild(newObject);
    }

    setup();
    var game = document.getElementById("game");

    screenmaxwidth = part1.split("x")[0];
    screenmaxheight = part1.split("x")[1];

    game.style.backgroundSize = screenmaxheight + "px 100%";
    game.style.width = screenmaxwidth + "px";
    game.style.height = screenmaxheight + "px";
}


    if(location.search > 1)
    {
    document.getElementById("mapcodetextarea").value = location.search;

    document.getElementById("mapcodetextarea").value = String(document.getElementById("mapcodetextarea").value).substring(1);
    
    }
    else{
        document.getElementById("mapcodetextarea").value = "2048x576???0$448$896$64$0$assets/ground1.png&0$512$896$64$0$assets/ground1_2.png&1024$0$64$320$0$assets/ground2.png&1088$128$64$64$0$assets/ground2.png&1152$0$64$320$0$assets/ground2.png&1280$128$64$192$0$assets/ground2.png&1280$0$64$64$0$assets/ground2.png&1472$256$64$64$0$assets/ground2.png&1472$0$64$192$0$assets/ground2.png&896$512$768$64$0$assets/ground1.png&1664$448$384$64$0$assets/ground1.png&1664$512$384$64$0$assets/ground1_2.png&512$128$64$64$0$assets/ground2.png&640$128$64$64$0$assets/ground2.png&704$128$64$64$0$assets/ground2.png&448$256$64$64$0$assets/ground2.png&512$256$64$64$0$assets/ground2.png&576$256$64$64$0$assets/ground2.png&640$256$64$64$0$assets/ground2.png&704$256$64$64$0$assets/ground2.png&768$256$64$64$0$assets/ground2.png";
    }
    importMap();

function editLevel(){
    exportMap();

    location.replace("editor.html?" + String(document.getElementById("mapcodetextarea").value));

    // location.pathname = desiredLink;
    console.log(desiredLink);
    // location.search = "?" + String(document.getElementById("mapcodetextarea").value);
    console.log("?" + String(document.getElementById("mapcodetextarea").value));

}