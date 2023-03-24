var data=document.getElementById("status");
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')
var url="/sendpatientsdata";
url=url.concat(roomId);

let array=[0,0,0,0,0,0];

var frequency=new Map([
    ["happy",0],
    ["sad",1],
    ["angry",2],
    ["disgust",3],
    ["fear",4],
    ["neutral",5],
])
var calling = setInterval(store, 5000);
function store(){
    var value=data.innerHTML;
    var idx=frequency.get(value);
    array[idx]++;
    // frequency.get(value)+=1;
    sendpatientdata();
}

async function sendpatientdata(){
    const res=await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            id:id
        })
    })
}