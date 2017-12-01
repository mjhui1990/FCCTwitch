let url = "https://api.twitch.tv/kraken";
let userurl = "/users/";
let channelsurl = "/channels/";
let streamsurl = "/streams/"; //stream will be null if user is offline
let clientid = "?client_id=9ffc56eqpuna4lgj2mz47bktqya492";
let selectAll = true;
let selectOnline = false;
let selectoffline = false;
var streamerurl = "";

var user = "";
var game = "";
var status = "";

let offline = document.querySelector("#offline");
let online = document.querySelector("#online");
let all = document.querySelector("#all");


var streamerArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "axtlol"];

displayAll();

all.addEventListener("click", function(){
  selectAll = true;
  selectOnline = false;
  selectOffline = false;
  clearList();
  displayAll();
  highLight();
});

offline.addEventListener("click", function(){
  selectAll = false;
  selectOnline = false;
  selectOffline = true;
  clearList();
  highLight();
  for( var i = 0; i < streamerArray.length; i++)
  axios({
    method:'get',
    url: url+streamsurl+streamerArray[i],
    headers: {
    'Client-ID': '9ffc56eqpuna4lgj2mz47bktqya492'
  }
}).then(function(response) {
if(response.data.stream == null) {
displayOffline(response);
  }
})
  })

online.addEventListener("click", function(){
  selectAll = false;
  selectOnline = true;
  selectOffline = false;
  clearList();
  highLight();
  for( var i = 0; i < streamerArray.length; i++)
  axios({
    method:'get',
    url: url+streamsurl+streamerArray[i],
    headers: {
    'Client-ID': '9ffc56eqpuna4lgj2mz47bktqya492'
  }
}).then(function(response) {
   displayOnline(response);
  })
    });   


function displayAll() {
    for( var i = 0; i < streamerArray.length; i++)
    axios({
      method:'get',
      url: url+streamsurl+streamerArray[i],
       headers: {
       'Client-ID': '9ffc56eqpuna4lgj2mz47bktqya492'
     }
    }).then(function(response) {
       if(response.data.stream == null) {
       displayOffline(response);
      }else {
    displayOnline(response);
       }
    })
    .catch(function (error) {
        console.log(error);
    });
}

// '<a href="https://www.twitch.tv/' + streamername" + 'target="_blank">" +


function displayOffline(response) {
var streamerarr = response.data._links.channel.split("/");
var streamername = streamerarr[streamerarr.length-1];
var appendme = document.createElement('section');
streamerurl = "https://www.twitch.tv/" + streamername;   
appendme.innerHTML = '<a href='+ streamerurl +' target="_blank"><section class="title"><section class="titlelabel" id="all">'+ streamername  + '</section><section class="titlelabel" id="online">' + "N/A" + '</section><section class="titlelabel" id="online">' + "Not Online" + '</section></section></a>' ; 

document.querySelector('.bigbox').appendChild(appendme); 
}

function displayOnline(response)    {
 if(response.data.stream != null) {
console.log(response);
var streamerarr = response.data._links.channel.split("/");
var streamername = streamerarr[streamerarr.length-1];
var appendme = document.createElement('section');
streamerurl = "https://www.twitch.tv/" + streamername;   
appendme.innerHTML = '<a href='+ streamerurl +' target="_blank"><section class="title"><section class="titlelabel" id="all">'+ response.data.stream.channel.display_name + '</section><section class="titlelabel" id="online">' + response.data.stream.channel.game + '</section><section class="titlelabel" id="online">' + response.data.stream.stream_type + '</section></section>' ;                  
document.querySelector('.bigbox').appendChild(appendme);  
   }
}

function clearList() {
  document.querySelector('.bigbox').innerHTML = "";
}

function highLight(){
  if(selectAll == true) {
    document.querySelector('#all').style.backgroundColor = "white";
    document.querySelector('#online').style.backgroundColor = "#90D7FF";
    document.querySelector('#offline').style.backgroundColor = "#90D7FF";
  }
    if(selectOnline == true) {
    document.querySelector('#online').style.backgroundColor = "white";
    document.querySelector('#all').style.backgroundColor = "#90D7FF";
    document.querySelector('#offline').style.backgroundColor = "#90D7FF";
  }
     if(selectOffline == true) {
    document.querySelector('#offline').style.backgroundColor = "white";
    document.querySelector('#all').style.backgroundColor = "#90D7FF";
    document.querySelector('#online').style.backgroundColor = "#90D7FF";
  }
    
}


//add url 

// '<a href="https://www.twitch.tv/' + streamername" + 'target="_blank">" +
