const express = require("express");
// const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const router = new express.Router();
const blogdata = require("../../src/models/blogdata");
const favBlogData = require("../../src/models/favblog");
const isAuth = require("../auth/isauth");
const openai = require("../../config/open-ai-conf");
// const http = require("http").Server(app);
// const io = require("socket.io")(http);

router.use(express.static("public"));
router.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

var reply = "";
const axios = require("axios");
const headers = {
  Authorization: "Bearer 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",
  "Content-Type": "application/json",
};

const data = {
  prompt: "I am not feeling well",
};
async function start() {
  console.log("satrt called");
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    // '{"prompt": "I am not feeling well", "model": "davinci:ft-personal-2023-03-25-03-01-43"}',
    // {
    //   'prompt': 'I am not feeling well',
    //   'model': 'davinci:ft-personal-2023-03-25-03-01-43'
    // },
    {
      headers: {
        "Authorization":
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: {
        prompt: "Bad day",
        model: "davinci:ft-personal-2023-03-25-20-41-27",
      },
    }
  );
  const data = await response.json;
  console.log(data);

//   const completion = await openai.createCompletion({
//     model: "davinci:ft-personal-2023-03-25-20-41-27",
//     prompt: "i am feeling depressed ->",
//     max_tokens: 40,
//   });
//   console.log(completion.data.choices[0].text);
  // console.log(reply);
  //     axios.post('https://api.openai.com/v1/engines/davinci/completions', data, { headers })
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // console.log(reply);
}

router.get("/chat/bot", async function (req, res) {
  res.render("bot");
  start();
});

router.get("/chat/bot1", async function (req, res) {
  res.status(200).json({ data: reply });
});

router.get("/bot/:roomid", async function (req, res) {
  const user = isAuth(req);
  if (user) res.render("bot.ejs");
  else console.log("bot not allowed to visit");
});

// io.on("connection", function(socket) {
//     console.log("socket connected");
//     var room_name = socket.request.headers.referer; // link of page, where user connected to socket
//     console.log(room_name);
//     //connecting to room
//     socket.join(room_name);
//     socket.on('message', function(msg,id) {
//       socket.to(id).emit('message', msg);
//     });
//     // socket.on("message", (msg) => {
//     //   socket.broadcast.emit("message", msg, room);
//     // })
// });

// const axios = require('axios');

// axios.post('https://api.openai.com/v1/completions', data, { headers })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

module.exports = router;
