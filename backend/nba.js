var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nba_app1");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

var gameSchema = new mongoose.Schema({
    date: Date,
    team1: String,
    team2: String,
    user_id: mongoose.Schema.Types.ObjectId,
    winner: String,
    choice: String
});

var User = mongoose.model("User",userSchema);
var Game = mongoose.model("Game",gameSchema);

Game.create({
    date:"<2019-02-17>",
    team1: "BKN",
    team2: "CHA",
    user_id: "5c69299ad558c623d021294f",
    winner: "GS",
    choice: "LAL"
    
}, function(err,game){
    if (err){
        console.log(err);
    } else {
        console.log(game);
    }
});

Game.find({}, function(err,game){
    if (err){
        console.log("oh no, error");
        console.log(err);
    } else{
        console.log("All games");
        console.log(game);
    } 
});

User.create({
    username:"kulraj",
    password: 1234,
    email: "kulraj1@gmail.com"
}, function(err,user){
    if (err){
        console.log(err);
    } else {
        console.log(user);
    }
});

User.find({}, function(err,user){
    if (err){
        console.log("oh no, error");
        console.log(err);
    } else{
        console.log("All users ");
        console.log(user);
    } 
});




