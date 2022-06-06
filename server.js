// import express (after npm install express)
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");

// create new express app and save it as "app"
const app = express();
app.use(express.static("./public"))


// server configuration
const PORT = 8081;

//Middle Ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create a route for the app
app.get("/", function (req, res) {
  console.log("Serving index.html");
  res.sendFile(__dirname + "/index.html");
});
//load page
app.get("/loadpage/:page", function (req, res) {
  console.log("Loading Page" + req.params.page)
  console.log(__dirname + "/" + req.params.page + ".html");
  res.sendFile(__dirname + "/" + req.params.page + ".html");
});

// app.get("/getData/:game", function (req, res) {
//   console.log(req.params.game);
//   fs.readFile(__dirname + "/" + req.params.game + ".txt", (err, data) => {
//     if (err) {
//       console.log("ERROR: FILE NOT FOUND \nCreating file");
//       fs.appendFileSync(
//         __dirname + "/" + req.params.game + ".txt",
//         '{"game":"' + req.params.game + '"}'
//       );
//       fs.readFileSync(
//         __dirname + "/" + req.params.game + ".txt",
//         (err, data) => {
//           if (err) {
//             throw err;
//           }
//           res.send('{"game":"' + req.params.game + '"}');
//         }
//       );
//     } else {
//       res.send(data.toString());
//     }
//   });
// });

// // POST method route
// app.post("/bet", function (req, res) {
//   console.log(req.body);
//   fs.writeFile(__dirname + "/bets.txt", JSON.stringify(req.body), (err) => {
//     if (err) throw err;
//   });
//   res.send("foo");
// });

// app.post("/updateStandings/:game", function (req, res) {
//   console.log(req.body);
//   fs.writeFile(
//     __dirname + "/" + req.params.game + ".txt",
//     JSON.stringify(req.body),
//     (err) => {
//       if (err) throw err;
//     }
//   );
//   console.log("The file has been saved!");
//   fs.readFile(__dirname + "/leaderboard.txt", (err, data) => {
//     if (err) {
//       throw err;
//     }
//     let standing = JSON.parse(data);
//     const game = req.params.game;
//     standing[game].first = req.body.first;
//     standing[game].second = req.body.second;
//     standing[game].third = req.body.third;
//     fs.writeFile(
//       __dirname + "/leaderboard.txt",
//       JSON.stringify(standing),
//       (err) => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//       }
//     );
//   });
//   res.send("foo");
// });

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
