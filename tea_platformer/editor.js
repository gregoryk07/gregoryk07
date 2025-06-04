var selectedIndex = 0;

var cursoroffsety = 32;
var cursoroffsetx = 32;

var cursorPosx = 0;
var cursorPosy = 0;

var realCursorPosY = 0;
var realCursorPosX = 0;

var screensizex = 4096;
var screensizey = 576;
var selectedObject = -1;

var snap = true; //false

var objList = ["ground1", "ground1_2", "ground2"];

var cursorSprite = document.getElementById("cursorSprite");

var objParent = document.getElementById("enviromentContainer");

var mapCode = "";

function setup(){
    var game = document.getElementById("game");

    var xsizeinput = document.getElementById("xsizeinput");
    var ysizeinput = document.getElementById("ysizeinput");

    screensizex = xsizeinput.value;
    screensizey = ysizeinput.value;

    game.style.backgroundSize = screensizey + "px 100%";
    game.style.width = screensizex + "px";
    game.style.height = screensizey + "px";
}

var prop_asset = document.getElementById("properties_asset");
var prop_posx = document.getElementById("properties_posx");
var prop_posy = document.getElementById("properties_posy");
var prop_sizex = document.getElementById("properties_sizex");
var prop_sizey = document.getElementById("properties_sizey");
var prop_vaultable = document.getElementById("properties_vaultable");

setup();



var editorObjects = document.getElementsByClassName("enviroment");

    cursorSprite.style.background = "url(assets/"+objList[selectedIndex]+".png)";
    cursorSprite.style.backgroundSize = "64px 64px";

addEventListener("wheel", (event) => {
    selectedIndex += (event.deltaY > 0 ? 1 : -1);
    if(selectedIndex < 0) selectedIndex = objList.length - 1;
    if(selectedIndex >= objList.length) selectedIndex = 0;
    console.log(selectedIndex + "  (" +event.deltaY +")");
    cursorSprite.style.background = "url(assets/"+objList[selectedIndex]+".png)";
    cursorSprite.style.backgroundSize = "64px 64px";
    editorObjects = document.getElementsByClassName("enviroment");
});

addEventListener("mousemove", (event) => {
    cursorPosx = (event.pageX - (snap ? event.pageX%64 : cursoroffsetx));
    cursorPosy = (event.pageY - (snap ? event.pageY%64 : cursoroffsety));
    realCursorPosY = event.pageY;
    realCursorPosX = event.pageX;
    if(cursorPosy + 64 > screensizey) cursorPosy = screensizey - 64;
    if(cursorPosx + 64 > screensizex) cursorPosx = screensizex - 64;
    cursorSprite.style.transform = "translate("+ cursorPosx + "px, " + cursorPosy + "px)";
    document.getElementById("footerDiv").style.transform = "translate("+scrollX +"px, 0px)";
});

addEventListener("click", (event) => {
    editorObjects = document.getElementsByClassName("enviroment");

    var hovered = false;
    for(var i = 0; i < editorObjects.length; i++)
    {

        if(realCursorPosY > screensizey || realCursorPosX > screensizex) continue;

        editorObjects[i].style.boxShadow = "";
        editorObjects[i].style.zIndex = "initial";

        if(hovered) continue;
        
        var objposx = Number(editorObjects[i].getAttribute("posx"));
        var objposy = Number(editorObjects[i].getAttribute("posy"));
        var objsizex = Number(editorObjects[i].getAttribute("sizex"));
        var objsizey = Number(editorObjects[i].getAttribute("sizey"));

        // if(cursorPosx >= Number(editorObjects[i].getAttribute("posx")) + Number(editorObjects[i].getAttribute("sizex")) &&
        // cursorPosx + (2 * cursoroffsetx) <= Number(editorObjects[i].getAttribute("posx")) &&
        // cursorPosy >= Number(editorObjects[i].getAttribute("posy")) + Number(editorObjects[i].getAttribute("sizey")) &&
        // cursorPosy + (2 * cursoroffsety) <= Number(editorObjects[i].getAttribute("posy")))
        if(cursorPosy + cursoroffsety < objposy + objsizey && cursorPosx + cursoroffsetx < objposx + objsizex && cursorPosx + cursoroffsetx > objposx && cursorPosy + cursoroffsety > objposy)
        {
            editorObjects[i].style.boxShadow = "2px 2px 2px 2px green";
            editorObjects[i].style.zIndex = "9";
            // console.log("FOUND");
            hovered = true;
            selectedObject = i;
        }
    }
    if(!hovered && realCursorPosY <= screensizey){
        selectedObject = -1;
        // console.log("NOTFOUND");
        var newObject = document.createElement("div");
        newObject.className = "enviroment";
        newObject.setAttribute("posx", cursorPosx);
        newObject.setAttribute("posy", cursorPosy);
        newObject.setAttribute("sizex", "64");
        newObject.setAttribute("sizey", "64");
        newObject.setAttribute("vaultable", "0");
        newObject.style.background = "url(assets/"+objList[selectedIndex]+".png)";
        newObject.style.width = "64px";
        newObject.style.height = "64px";
        newObject.style.transform = "translate("+cursorPosx+"px, " + cursorPosy + "px)";
        newObject.style.backgroundSize = "64px 64px";
        newObject.style.imageRendering = "pixelated"
        newObject.style.position = "absolute";
        document.getElementById("game").appendChild(newObject);
        
    }
    if(realCursorPosY <= screensizey){
        if(selectedObject >= 0)
        {
            prop_asset.value = String(editorObjects[selectedObject].style.background).split("\"")[1];;

            prop_posx.value = editorObjects[selectedObject].getAttribute("posx");
            prop_posy.value = editorObjects[selectedObject].getAttribute("posy");
            prop_sizex.value = editorObjects[selectedObject].getAttribute("sizex");
            prop_sizey.value = editorObjects[selectedObject].getAttribute("sizey");
            prop_vaultable.value = editorObjects[selectedObject].getAttribute("vaultable");
        }
        else
        {
            prop_asset.value = "";
            prop_posx.value = "";
            prop_posy.value = "";
            prop_sizex.value = "";
            prop_sizey.value = "";
            prop_vaultable.value = "";
        }
    }


    
});

function setProperties(){
    if(selectedObject >= 0){
        editorObjects[selectedObject].style.background = "url("+prop_asset.value+")";
        editorObjects[selectedObject].style.width = prop_sizex.value + "px"
        editorObjects[selectedObject].style.height = prop_sizey.value + "px";
        editorObjects[selectedObject].style.transform = "translate("+prop_posx.value+"px, " + prop_posy.value + "px)";
        editorObjects[selectedObject].style.backgroundSize = "64px 64px";


        editorObjects[selectedObject].setAttribute("posx", prop_posx.value);
        editorObjects[selectedObject].setAttribute("posy", prop_posy.value);
        editorObjects[selectedObject].setAttribute("sizex", prop_sizex.value);
        editorObjects[selectedObject].setAttribute("sizey", prop_sizey.value);
        editorObjects[selectedObject].setAttribute("vaultable", prop_vaultable.value);
    }
}

function disselectCurrent(){
    for(var i = 0; i < editorObjects.length; i++)
    {
        editorObjects[i].style.boxShadow = "";
        editorObjects[i].style.zIndex = "initial";
    }
    selectedObject = -1;

        prop_asset.value = "";
        prop_posx.value = "";
        prop_posy.value = "";
        prop_sizex.value = "";
        prop_sizey.value = "";
        prop_vaultable.value = "";
}

function KeyCheckDown()
{
    var KeyID = event.keyCode;

    switch(KeyID)
    {
        case 16: //shift
            // snap = true;
            break;
        case 46: //delete
            deleteSelected();
            break;
        case 27: //esc
            disselectCurrent();
            break;
     }
}
function KeyCheckUp()
{
    var KeyID = event.keyCode;

    switch(KeyID)
    {
        case 16: //shift
            // snap = false;
            break;
    }
}

function deleteSelected(){
    if(selectedObject < 0) return;

    editorObjects[selectedObject].remove();

    editorObjects = document.getElementsByClassName("enviroment");

    disselectCurrent();
}


document.onkeyup = KeyCheckUp;
document.onkeydown = KeyCheckDown;


function exportMap(){
    editorObjects = document.getElementsByClassName("enviroment");

    var part1 = screensizex + "x" + screensizey;





    var part2 = "";

    for(var i = 0; i < editorObjects.length; i++)
    {
        var spritePath = String(editorObjects[i].style.background).split("\"")[1];

        part2 += editorObjects[i].getAttribute("posx") + "$" + 
        editorObjects[i].getAttribute("posy") + "$" + 
        editorObjects[i].getAttribute("sizex") + "$" + 
        editorObjects[i].getAttribute("sizey") + "$" + 
        editorObjects[i].getAttribute("vaultable") + "$" + 
        spritePath;

        if(i + 1 < editorObjects.length) part2 += "&";
    }

    var fullPart = part1 + "???" + part2;

    document.getElementById("mapcodetextarea").value = fullPart;
}

function removeAll(){
    editorObjects = document.getElementsByClassName("enviroment");
    
    for(var i = editorObjects.length -1; i >= 0; i--)
    {
        editorObjects[i].remove();
    }
}

function importMap(){

    
    if(String(document.getElementById("mapcodetextarea").value).length == 0) return;

    editorObjects = document.getElementsByClassName("enviroment");
    
    for(var i = editorObjects.length -1; i >= 0; i--)
    {
        editorObjects[i].remove();
    }

    
    var fullpart = String(document.getElementById("mapcodetextarea").value);

    var part1 = fullpart.split("???")[0];

    var part2 = fullpart.split("???")[1];


    document.getElementById("xsizeinput").value = Number(part1.split("x")[0]);

    document.getElementById("ysizeinput").value = Number(part1.split("x")[1]);
    setup();

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
}

function testLevel(){
    exportMap();

    location.replace("index.html?" + String(document.getElementById("mapcodetextarea").value));

    // location.pathname = desiredLink;
    console.log(desiredLink);
    // location.search = "?" + String(document.getElementById("mapcodetextarea").value);
    console.log("?" + String(document.getElementById("mapcodetextarea").value));

}

if(location.search.length > 1)
    {
    document.getElementById("mapcodetextarea").value = location.search;

    document.getElementById("mapcodetextarea").value = String(document.getElementById("mapcodetextarea").value).substring(1);
    
    }
    else{
        document.getElementById("mapcodetextarea").value = "2048x576???0$448$896$64$0$assets/ground1.png&0$512$896$64$0$assets/ground1_2.png&1024$0$64$320$0$assets/ground2.png&1088$128$64$64$0$assets/ground2.png&1152$0$64$320$0$assets/ground2.png&1280$128$64$192$0$assets/ground2.png&1280$0$64$64$0$assets/ground2.png&1472$256$64$64$0$assets/ground2.png&1472$0$64$192$0$assets/ground2.png&896$512$768$64$0$assets/ground1.png&1664$448$384$64$0$assets/ground1.png&1664$512$384$64$0$assets/ground1_2.png&512$128$64$64$0$assets/ground2.png&640$128$64$64$0$assets/ground2.png&704$128$64$64$0$assets/ground2.png&448$256$64$64$0$assets/ground2.png&512$256$64$64$0$assets/ground2.png&576$256$64$64$0$assets/ground2.png&640$256$64$64$0$assets/ground2.png&704$256$64$64$0$assets/ground2.png&768$256$64$64$0$assets/ground2.png";
    }
    importMap();