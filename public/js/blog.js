var baseurl='http://localhost:3000/blog/increaselike';
var baseurl1='http://localhost:3000/blog/addtofavourites';
const radios=document.querySelectorAll(".category-chooser");

function toggle1(){
    const element1=document.getElementById('choose1');
    const element2=document.getElementById('choose2');
    const div1=document.getElementById("your_blogs");
    const div=document.getElementById("all_blogs");
    element1.classList.remove('black');
    element1.classList.add('blue');
    element2.classList.remove('blue');
    element2.classList.add('black');
    div.classList.remove("hide");
    div1.classList.add("hide");
}

function toggle2(){
    const element2=document.getElementById('choose1');
    const element1=document.getElementById('choose2');
    const div=document.getElementById("your_blogs");
    const div1=document.getElementById("all_blogs");
    element1.classList.remove("black");
    element1.classList.add("blue");
    element2.classList.remove("blue");
    element2.classList.add("black");
    div.classList.remove("hide");
    div1.classList.add("hide");
}

function addtofavourites(){
    const span1=document.getElementById("fetcher");
    var id=span1.innerText;
    sendpostrequest1(id);
}

function increaselike(){
    const span=document.getElementById("rating");
    const span1=document.getElementById("fetcher");
    var val=span.innerText;
    var id=span1.innerText;
    val++;
    span.innerText=val;
    sendpostrequest(val,id);
    const liker=document.getElementById("like");
    const disliker=document.getElementById("dislike");
    liker.classList.add("hide");
    disliker.classList.remove("hide");
}

function decreaselike(){
    const span=document.getElementById("rating");
    const span1=document.getElementById("fetcher");
    var val=span.innerText;
    var id=span1.innerText;
    val--;
    span.innerText=val;
    sendpostrequest(val,id);
    const liker=document.getElementById("like");
    const disliker=document.getElementById("dislike");
    liker.classList.remove("hide");
    disliker.classList.add("hide");
}

async function sendpostrequest(id){
    const res=await fetch(baseurl,{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            parcel:val,
            id:id
        })
    })
}

async function sendpostrequest1(id){
    const res=await fetch(baseurl1,{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            id:id
        })
    })
}

