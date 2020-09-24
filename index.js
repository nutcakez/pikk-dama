var express=require("express");
var app=express();
var server=require("http").Server(app);
let appPort=process.env.PORT||2000
server.listen(appPort);


var tables={};
var users={};



var io=require('socket.io')(server,{});

//connecting to server
io.sockets.on('connection',function(socket){
    socket.on("CreateTable",createTable(socket.id))
    socket.on("JoinTable",JoinTable(data,socket.id))
    socket.on("PutCard",PutCard)
})

function createTable(userId)
{
    tables['randomIdINeedToCreate']={
        "users":[userId],
        "hands":{
            [userId]:[]
        },
        "playerTurn":"IdOfThePlayerHere"      //only this player can put down card
    }
}
function JoinTable(data,userid)
{
    if(tables[data].users.length<4)
    {
        tables[data].users.push(userid)
    }
    else
    {
        StartGame(data)
    }
}

function SendOutStartingHand(tableId)
{
    for(let i=0;i<4;i++)
    {
        io.to(tables[tableId].users[i]).emit('StartingHand', tables[tableId].hands[tables[tableId].users[i]]);
    }
}


function StartGame(tableId)
{
    //init each player hand and send it out
    //deck init and card managment is missing
    SendOutStartingHand(tableId)
}