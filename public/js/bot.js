var baseurl='/chat/bot';
var baseurl1='/chat/bot1';
// const socket=io();
var url;
var send=document.getElementById("socket-chat");
var area=document.getElementById("messages");

send.addEventListener('keyup',(e)=>{
  console.log(e.target.value);
  if(e.key==='Enter'){
    sendmessage(e.target.value);
    sendData(e.target.value);
    e.target.value='';
  }
});

//sending message to the server
async function sendData (message){
  const url=window.location.href;
  const roomId=url.slice(26);
  console.log(roomId);
  const res=await fetch(baseurl,{
    method:'POST',
    headers:{
        "Content-Type":'application/json'
    },
    body:JSON.stringify({
        msg: message,
        roomId : roomId
    })
})
receivedata();

}

async function receivedata(){
    const res=await fetch(baseurl1,{
        method:'GET',
    })
    console.log(res.json());
}

function sendmessage(msg){
  url=window.location.href;
  var roomId = url;
  let obj=msg;
  append(obj,"outgoing");
//   socket.emit("message",obj,roomId);
}

function append(msg,type){
  console.log("called");
  let maindiv=document.createElement('div');
  let classname=type;
  maindiv.classList.add(classname,'message');
  let markup;
  if(type==="incoming"){
    markup=`
      <div class="mess_o">
        <p>${msg}</p>
      </div>
    `
  }
  else{
    markup=`
      <div class="mess_i">
        <p>${msg}</p>
      </div>
    `
  }

  maindiv.innerHTML=markup;
  area.appendChild(maindiv);
}



// socket.on("message",(msg)=>{
//   append(msg,"incoming");
// })























// var baseurl="https://api.openai.com/v1/chat/completions";

// sendpostreq();
//     async function sendpostreq(){
//         try{
//             const res=await fetch(baseurl,{
//                 mode: 'no-cors',
//                 method:'POST',
//                 headers:{
//                     "Content-Type":'application/json',
//                     "Authorization": 'Bearer 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'
//                 },
//                 data:JSON.stringify({
//                     model: "davinci:ft-personal-2023-03-25-03-01-43",
//                     messages: [{"role": "user", "content": "hello!!"}],
//                     temperature: 0.7
//                 })
                
//             });
//             console.log(res);
//         }
//         catch(e){
//             console.log(e);
//         }
        
//     }













