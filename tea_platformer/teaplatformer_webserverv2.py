from flask import Flask
from flask import request
from flask_cors import CORS
import json


app = Flask(__name__)

currentmap = ""

CORS(app)

nextid = 0

players = []

@app.route('/getplayers', methods=['GET'])
def getPlayers():
    print(request.remote_addr)
    return json.dumps(players)


@app.route('/registerplayer', methods=['GET'])
def registerPlayer():
    global nextid
    knownip = -1
    for i in range (0, len(players)):
        if(players[i].get("ip") == request.remote_addr):
            knownip = players[i].get("id")
    if(knownip == -1):
        players.append({"id" : nextid, "x" : 0, "y" : 0, "dx" : 0, "jump" : 0, "crouch" : 0, "ip" : request.remote_addr})
        knownip = nextid
        nextid += 1
    return json.dumps({"status" : "ok", "id" : knownip})

@app.route('/updateplayer/<id>/<x>/<y>/<dx>/<jump>/<crouch>', methods=['GET'])
def updatePlayer(id, x, y, dx, jump, crouch):
    players[int(id)] = {"ip" : request.remote_addr, "id" : int(id), "x" : float(x), "y" : float(y), "dx" : float(dx), "jump" : int(jump), "crouch" : int(crouch)}
    return json.dumps({"status" : "ok"})

@app.route('/getmap', methods=['GET'])
def getMap():
    return json.dumps({"status" : "ok", "code" : currentmap})


@app.route('/setmap/<code>')
def setMap(code):
    currentmap = code
    return json.dumps({"status" : "ok"}) 


app.run(debug=True, host='0.0.0.0', port=5000)