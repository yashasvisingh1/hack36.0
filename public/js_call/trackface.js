var data=document.getElementById("status");
const queryString1 = window.location.search
const urlParams1 = new URLSearchParams(queryString1)
let roomId1 = urlParams.get('room')
var url="/sendpatientsdata/";
url=url.concat(roomId);

let array=[0,0,0,0,0,0,0,0,0,0];

var frequency=new Map([
    ["happy",0],
    ["sad",1],
    ["angry",2],
    ["disgust",3],
    ["fear",4],
    ["neutral",5],
    ["surprise",6],
    ["Loading",7],
    ["Loaded",8],
    ["No Face",9],
])
var calling = setInterval(store, 30000);

async function store(){
    var value=await data.innerHTML;
    var idx=await frequency.get(value);
    array[idx%10]++;
        // frequency.get(value)+=1;
        sendpatientdata();
    console.log(array);
}

async function sendpatientdata(){
    console.log("url "+url);
    const res=fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({net:array})
    })
}