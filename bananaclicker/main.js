var $$ = (a) => document.getElementById(a);
dataset = {
    buildings: [
        {
            name: "Banana tree",
            count: 0,
            bps: 2,
            bpsIncrease: 1.05,
            cost: 10,
            costIncrease: 1.5
        },
        {
            name: "Banana house",
            count: 0,
            bps: 5,
            bpsIncrease: 1.07,
            cost: 100,
            costIncrease: 1.6,
            multiplierIncrease: 1.1
        },
        {
            name: "Banana motel",
            count: 0,
            bps: 10,
            bpsIncrease: 1.1,
            cost: 500,
            costIncrease: 2.5,
            multiplierIncrease: 1.1
        },
        {
            name: "Banana hotel",
            count: 0,
            bps: 15,
            bpsIncrease: 1.2,
            cost: 1500,
            costIncrease: 3.5,
            multiplierIncrease: 1.1
        },
        {
            name: "Banana paradise",
            count: 0,
            bps: 22,
            bpsIncrease: 1.4,
            cost: 5000,
            costIncrease: 5.2,
            multiplierIncrease: 1.1
        },
        {
            name: "Banana space-station",
            count: 0,
            bps: 35,
            bpsIncrease: 1.9,
            cost: 20000,
            costIncrease: 7.1,
            multiplierIncrease: 1.1
        },
        {
            name: "Banana moon",
            count: 0,
            bps: 50,
            bpsIncrease: 2.1,
            cost: 100000,
            costIncrease: 9.1,
            multiplierIncrease: 1.1
        },
        {
            name: "Banana comet",
            count: 0,
            bps: 64,
            bpsIncrease: 2.25,
            cost: 1100000,
            costIncrease: 11
        },
        {
            name: "Banana planet",
            count: 0,
            bps: 78,
            bpsIncrease: 2.25,
            cost: 2700000,
            costIncrease: 11
        },
        {
            name: "Banana sun",
            count: 0,
            bps: 100,
            bpsIncrease: 2.7,
            cost: 3500000,
            costIncrease: 15
        },
        {
            name: "Banana solar system",
            count: 0,
            bps: 115,
            bpsIncrease: 2.95,
            cost: 5000000,
            costIncrease: 20
        },
        {
            name: "Banana galaxy",
            count: 0,
            bps: 137,
            bpsIncrease: 3.12,
            cost: 10000000,
            costIncrease: 22.1
        },
        {
            name: "Banana universe",
            count: 0,
            bps: 170,
            bpsIncrease: 3.8,
            cost: 50000000,
            costIncrease: 28.1
        },
        {
            name: "Banana",
            count: 0,
            bps: 10000000000000000,
            bpsIncrease: 100,
            cost: 10000000000000000000000000000000000000,
            costIncrease: 100,
            multiplierIncrease: 100
        },
    ]
}
async function clicker_click(){
    $$("banana").style.animation = "1 enlargeAndShrinkBanana 100ms linear";
    createScoreBubble(1 * multiplier);
    currentBanana += 1 * multiplier;
    updateScore();
    setTimeout(() => {
        
    $$("banana").style.animation = "linear enlargeAndShrink infinite 2s";
    }, 100);
}
var multiplier = 1;

var currentBanana = 0;

function updateScore(){
    $$("banana_count").innerHTML = unitify(currentBanana);
    $$("banana_bps").innerHTML = unitify(currentBPS);
    if(multiplier > 1){
        $$("multiplier_label").innerHTML = "Click multiplier";
        $$("multiplier_value").innerHTML = (Math.round(multiplier * 100) / 100) + "x";
    }
}

function unitify(num){
    console.log("num: " + num);
    var units = [
        "",
        "K",
        "M",
        "B",
        "T",
        "Aa",
        "Ab",
        "Ac",
        "Ad",
        "Ae",
        "Af",
        "Ag",
        "Ah"
    ]
    var unitindex = 0;
    var unit = "";
    outOfUnits = false;
    while(num / 1000 >= 1 && !outOfUnits){
        console.log(++unitindex);
        if(units[unitindex] != undefined)
        {
            unit = units[unitindex];
            num /= 1000;
        }
        else{
            outOfUnits = true;
            console.warn("OUT OF UNITS");
        }
    }
    return (Math.round(num * 100) / 100) + "&nbsp;" + unit;
}

var nextbubbleid = 0;
async function createScoreBubble(num = 1, color = "black"){
    var bubble = document.createElement("div");
    var randomXPos = Math.random() * 40 + 10;
    var randomYPos = Math.random() * 40 + 10;
    bubble.innerHTML = "+" + unitify(num);
    bubble.style.bottom = randomYPos + "%";
    bubble.style.position = "fixed";
    bubble.style.left = randomXPos + "%";
    let outlineWidth = 1;
    bubble.style.fontSize = "200%";
    bubble.style.zIndex = 3;
    bubble.style.pointerEvents = "none";
    bubble.style.color = color;
    bubble.style.textShadow = outlineWidth + "px " + outlineWidth + "px 0 white, -" + outlineWidth + "px " + outlineWidth + "px 0 white, " + outlineWidth + "px -" + outlineWidth + "px 0 white, -" + outlineWidth + "px -" + outlineWidth + "px 0 white";
    let lifeTime = 1500;
    bubble.style.animation = "riseAndFade " + lifeTime + "ms infinite linear";
    document.body.append(bubble);
    setTimeout(() => {
        bubble.outerHTML = "";
    }, lifeTime);
}
var currentBPS = 0;
function calculateBps(){
    calculated = 0;
    for (let i = 0; i < dataset.buildings.length; i++) {
        const element = dataset.buildings[i];

        // ciag geometryczny

        sum = element.bps;
        sum *= (1 - Math.pow(element.bpsIncrease, element.count));
        sum /= (1 - element.bpsIncrease);

        calculated += sum;
    }
    currentBPS = calculated;
}

var savetick = 0;

async function clock() {
    console.log("tick");
    
    
    calculateBps();
    savetick++;
    if(savetick >= 30){
        console.log("saving game...");
        saveGame();
        savetick = 0;
    }
    // add current BPS to currentBanana
    currentBanana += currentBPS;

    if(currentBPS > 0)
    createScoreBubble(currentBPS, "red");

    updateScore();
    setTimeout(() => {
        clock();
    }, 1000);
}


clock();

function updateShop(){
    var text = "";

    for (let i = 0; i < dataset.buildings.length; i++) {
        const element = dataset.buildings[i];
        text += "<button type=\"button\" onclick=\"buy(" + i + ")\">" + element.name + ": " + element.count + "<br>COST: " + unitify(element.cost * Math.pow(element.costIncrease, element.count)) + "<br>BPS: +"+unitify(element.bps * Math.pow(element.costIncrease, element.count))+"</button>";
    }
    // console.log(text);

    $$("content").innerHTML = text;
}
updateShop();

function buy(id){
    element = dataset.buildings[id];
    totalCost = element.cost * Math.pow(element.costIncrease, element.count)
    if(currentBanana >= totalCost){
        currentBanana -= totalCost;
        element.count++;
        if(element.multiplierIncrease != undefined){
            multiplier *= element.multiplierIncrease
        }
    }
    else{
        console.log(false);
    }
    console.log(totalCost);
    updateShop();
    updateScore();
}
function saveGame(){
    savefilestringpart1 = currentBanana + ":" + currentBPS + ":" + multiplier;
    savefilestringpart2 = JSON.stringify(dataset);
    savefilestring = savefilestringpart1 + "///SEPARATOR///" + savefilestringpart2;

    setCookie("bananaclickersavefile", savefilestring, 999);

    console.log("saved the game");
    toast("Saved the game", 2000);
}
function loadGame(){
    cookieString = getCookie("bananaclickersavefile");
    if(cookieString.length > 0){
        p1 = cookieString.split("///SEPARATOR///")[0];
        p2 = cookieString.split("///SEPARATOR///")[1];
        dataset = JSON.parse(p2);

        currentBanana = Number(p1.split(":")[0]);
        currentBPS = Number(p1.split(":")[1]);
        multiplier = Number(p1.split(":")[2]);

        console.log("game loaded!");
        updateScore();
        updateShop();
    }
    else{
        console.log("saved game not found");
    }
}

// credits go to w3schools
// https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
loadGame();
// end of w3schools code

function exportSave(){
    console.log(getCookie("bananaclickersavefile"));
}
function importSave(save){
    setCookie("bananaclickersavefile", save, 999);
    loadGame();
}

async function toast(msg = "message here!", time = 1000) {
    $$("toast").innerHTML = msg;
    $$("toast").style.transform = "translateY(0)";
    setTimeout(() => {  
        $$("toast").style.transform = "translateY(-47px)";
    }, time);
}

console.log("%cWelcome to banana clicker!", "color: #fff; font-size: 30px; background: #000; font-weight: bold")
console.log("%cYour data will be saved every 30 seconds using cookies in this browser.", "color: #fff; font-size: 20px; background: #000; font-weight: bold")
console.log("%cWhenever you want to get your save file type \"exportSave()\" in console or \"importSave(<your save file>)\" to import it (you may corrupt it this way so be careful!)", "color: #fff; font-size: 15px; background: #000; font-weight: bold")