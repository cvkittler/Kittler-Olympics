// import express (after npm install express)
const express = require("express");
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
  res.sendFile(__dirname + "/index.html");
});

app.get("/page/:game", function (req, res) {
  res.sendFile(__dirname + "/public/page/" + req.params.game, (err) =>{
    if (err){
      console.log("ERROR: "+req.params.game+" NOT FOUND \nCreating file");
      fs.readFile( __dirname + "/public/gameTemplate/template.html", (err, data) => {
        if(err){
          console.log(err)
        }else{
          let fileContent = data.toString();
          fileContent = fileContent.replace("TEMPLATE", req.params.game.replace(".html",""))
          fs.appendFileSync(__dirname + "/public/page/" + req.params.game, fileContent);
          res.send(fileContent);
        }
      });
    }
  });
});
app.get("/getData/:game", function (req, res) {
  console.log("sedning data for: " + req.params.game);
  fs.readFile(__dirname + "/public/data/" + req.params.game, (err, data) => {
    if (err) {
      console.log("ERROR: FILE NOT FOUND \nCreating file");
      fs.readFile( __dirname + "/public/gameTemplate/template.json", (err, data) => {
        if(err){
          console.log(err)
        }else{
          fs.appendFileSync(__dirname + "/public/data/" + req.params.game, data.toString());
          res.send(JSON.parse(data));
        }
      });
    } else {
      res.send(data.toString());
    }
  });
});

app.post("/updateStandings/:game", function (req, res) {
  console.log("Updating " + req.params.game);
  fs.writeFile(
    __dirname + "/public/data/" + req.params.game,
    JSON.stringify(req.body),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log("Updating Leaderboad")
  fs.readFile(__dirname + "/public/data/leaderboard.json", (err, data) => {
    if (err) {
      console.log(err);
    }else{
      let standing = JSON.parse(data);
      const game = req.params.game.replace(".json","");
      let temp = {};
      temp["first"] = req.body.first.toString();
      temp["second"] = req.body.second.toString();
      temp["third"] = req.body.third.toString();
      standing[game] = temp;
      let stringOfStandings = JSON.stringify(standing);

      fs.writeFile(
        __dirname + "/public/data/leaderboard.json",
        stringOfStandings,
        (err) => {
          if (err) console.log("write leaderboard fail:" +err);
        }
      );
    }
  });
  res.send("foo");
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
