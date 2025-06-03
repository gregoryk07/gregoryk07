var selectedIndex = 0;

var cursoroffsety = 32;
var cursoroffsetx = 32;

var cursorPosx = 0;
var cursorPosy = 0;

var screensizex = 4096;
var screensizey = 576;
var selectedObject = -1;

var snap = true; //false

var objList = ["ground1", "ground1_2", "ground2"];

var cursorSprite = document.getElementById("cursorSprite");

var objParent = document.getElementById("enviromentContainer");



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
    if(cursorPosy + 64 > screensizey) cursorPosy = screensizey - 64;
    cursorSprite.style.transform = "translate("+ cursorPosx + "px, " + cursorPosy + "px)";
    document.getElementById("footerDiv").style.transform = "translate("+scrollX +"px, 0px)";
});

addEventListener("click", (event) => {
    editorObjects = document.getElementsByClassName("enviroment");

    var hovered = false;
    for(var i = 0; i < editorObjects.length; i++)
    {

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
    if(!hovered){
        selectedObject = -1;
        // console.log("NOTFOUND");
        var newObject = document.createElement("div");
        newObject.className = "enviroment";
        newObject.setAttribute("posx", cursorPosx);
        newObject.setAttribute("posy", cursorPosy);
        newObject.setAttribute("sizex", "64");
        newObject.setAttribute("sizey", "64");
        newObject.style.background = "url(assets/"+objList[selectedIndex]+".png)";
        newObject.style.width = "64px";
        newObject.style.height = "64px";
        newObject.style.transform = "translate("+cursorPosx+"px, " + cursorPosy + "px)";
        newObject.style.backgroundSize = "64px 64px";
        newObject.style.imageRendering = "pixelated"
        newObject.style.position = "absolute";
        document.getElementById("game").appendChild(newObject);
    }
});

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
}


document.onkeyup = KeyCheckUp;
document.onkeydown = KeyCheckDown;