    var serverip = "192.168.50.228";
    var serverport = "5000";

    var playerid = -1;
    
    var refreshms = 100;
    var players = [];


	var readytosync = true;

	var synctimeout = 100;
	var synctimer = 0;

	var tempdump;

	var localplayerslength = -1;

    var hidelocalplayer = true;

    async function netMainLoop() {
            
        fetch('http://' + serverip + ':' + serverport + "/getplayers").then(response => {
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
            }
                
            return response.json();
            }).then(data => {
                console.log(data);
				players = data;
				runNetVisual();
            }).catch(error => {
                console.error('Fetch error:', error);
            });
        await setTimeout(() => {
            if(connected)
            {
                netMainLoop();
            }
        }, refreshms);
    }

    function connect(){
        serverip = document.getElementById("net_ip_addr_and_port").value.split(":")[0];
        serverport = document.getElementById("net_ip_addr_and_port").value.split(":")[1];
        joinServer();
    }
    
    function joinServer()
    {
        fetch('http://' + serverip + ':' + serverport + "/registerplayer").then(response => {
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
            }
                    
            return response.json();
        }).then(data => {
            console.log(data);
            playerid = data.id;
            connected = true;
            netMainLoop();
        }).catch(error => {
            console.error('Fetch error:', error);
        });
    }

    function updateNetworkPlayer(x, y, dx, jump, crouch){
        var status = false;
		if(readytosync){
			readytosync = false;
			synctimer = setTimeout(() => {
				readytosync = true;
			}, synctimeout);
			fetch('http://' + serverip + ':' + serverport + "/updateplayer/" + playerid + "/" + x + "/" + y + "/" + dx + "/" + jump + "/" + crouch).then(response => {
				if (!response.ok) {
					console.error(`HTTP error! Status: ${response.status}`);
				}
					
				return response.json();
			}).then(data => {
                status = true;
			}).catch(error => {
				console.error('Fetch error:', error);
			});
		}
		else{
			// console.warn("NOT READY TO SYNC!");
		}
        return status;
    }

	function runNetVisual(){
		if(players.length == localplayerslength){
			for(var i = 0; i < players.length; i++){
				document.getElementById("netplayer-" + players[i].id).style.width = sizex + "px";
				document.getElementById("netplayer-" + players[i].id).style.display = "inline-block";
                if(players[i].id == playerid && hidelocalplayer)
                {
                    document.getElementById("netplayer-" + players[i].id).style.display = "none";
                }
				document.getElementById("netplayer-" + players[i].id).style.height = sizey + "px";
				document.getElementById("netplayer-" + players[i].id).style.position = "absolute";
				document.getElementById("netplayer-" + players[i].id).style.transform = "translate(" + players[i].x + "px, " + players[i].y + "px)";
				
                var sprite = "tea_idle_1";
                if(players.dx < 0 && player.crouch == 1){
                    sprite = "tea_crouch_left";
                }
                else if(players.crouch == 1){
                    sprite = "tea_crouch_right";
                }
                else if(player.jump && player.dx < 0){
                    sprite = "tea_jump_left";
                }
                else if(player.jump){
                    sprite = "tea_jump_right";
                }
                else if(player.dx > 0){
                    sprite = "tea_walk_right_" + ((animSequence > 10) ? 2 : 1);
                }
                else if(player.dx < 0){
                    sprite = "tea_walk_left_" + ((animSequence > 10) ? 2 : 1);
                }
                else{
                    sprite = "tea_idle_" + ((animSequence > 10) ? 2 : 1);
                }
                document.getElementById("netplayer-" + players[i].id).style.background = "url('assets/" + sprite + ".png')";
                document.getElementById("netplayer-" + players[i].id).style.backgroundSize = sizex + "px " + sizey +"px";
                
                // console.warn(players[i].id + "   " + document.getElementById("netplayer-" + players[i].id).style.transform);
                
			}
            return true;
		}
		else{
			console.log("PLAYER LIST CHANGED");
			localplayerslength = players.length;
			document.getElementById("netparent").innerHTML = "";
			for(var i = 0; i < players.length; i++){
				console.log("eeeee     " + players.length)
				document.getElementById("netparent").innerHTML += "<div id=\"netplayer-" + players[i].id + "\" class=\"players\"></div>";
			}
            return false;
		}
	}