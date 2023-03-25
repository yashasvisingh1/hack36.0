// const ctx=document.getElementById("myChart").getContext("2d");
var array;
var baseurl='http://localhost:3000/getarray';

getdata();
console.log("showdata called");
async function getdata(){
    const res=await fetch(baseurl,{
        method:'GET'
    })
    const val=await res.json();
    array=await val.emotions;
    console.log(array);
    const ctx = document.getElementById('myChart');
      
        new Chart(ctx, {
          type: 'line',
          data: {
            labels:[
                "happy",
                "sad",
                "angry",
                "disgust",
                "fear",
                "neutral",
                "surprise",
                "Loading",
                "Loaded",
                "No Face",
            ],
            datasets: [{
              label: 'patients data',
              data: array,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        })
}

// const myChart=new Chart(ctx,{

// })
// const labels=[
//     "happy",
//     "sad",
//     "angry",
//     "disgust",
//     "fear",
//     "neutral",
//     "surprise",
//     "Loading",
//     "Loaded",
//     "No Face",
// ];

// const data={
//     labels,
//     datasets:[{
//         data:array,
//         label:"PATIENTS DATA",
//     }]
// };

// const config={
//     type:'line',
//     data:data,
//     options:{
//         responsive:true,
//     },
// }
console.log("hi "+array);
// const ctx = document.getElementById('myChart');
      
//         new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels:[
//                 "happy",
//                 "sad",
//                 "angry",
//                 "disgust",
//                 "fear",
//                 "neutral",
//                 "surprise",
//                 "Loading",
//                 "Loaded",
//                 "No Face",
//             ],
//             datasets: [{
//               label: 'patients data',
//               data: array,
//               borderWidth: 1
//             }]
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true
//               }
//             }
//           }
//         })

       