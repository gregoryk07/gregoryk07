

animTime = 1250; // minimum time of the splashscreen

var cancelSplashScreenOnHashInUrlPresent = true;
var noSplash = false;

function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
async function initLoad(){
    if(cancelSplashScreenOnHashInUrlPresent){
        keyword = "?nosplash=true";
        noSplash = location.href.includes(keyword);
        if(noSplash){
            history.pushState(null, "", location.href.slice(0, keyword.length * -1));
            document.getElementById("splashscreen").style.display = "none";
        }
    }



    if(!noSplash)
    {
        //LOADING WRAPPER P1
        var beginTime = new Date();
        var initloaddone = false;
        setTimeout(() => {
            if(!initloaddone)
            {
                document.getElementById("loadingstuckcheck").checked = true;
                console.log("its taking longer than usual...");
            }
        }, 4000)
    }

    //LOADING WARPPER P1 END



    //LOADING CODE HERE






    // await delay(10000); //wait 10 seconds (test delay)






    //LOADING CODE END



    //LOADING WRAPPER P2
    if(!noSplash)
    {
        initloaddone = true;
        console.log(1250 - (new Date() - beginTime));
        setTimeout(() => {
            console.log("finish");
            document.getElementById("loadingstuckcheck").checked = false;
            document.getElementById("fadesplash").checked = true;
            setTimeout(() => {
                document.getElementById("splashscreen").style.display = "none";
            document.getElementById("fadesplash").checked = false;
            }, 500);
        }, animTime - (new Date() - beginTime));
        //LOADING WRAPPER P2 END
    }
}

    
initLoad();