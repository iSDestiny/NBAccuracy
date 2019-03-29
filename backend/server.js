var request = require ('request');
var express = require('express');
const bodyParser = require('body-parser');
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

Game.find({}, function(err,game){
    if (err){
        console.log("oh no, error");
        console.log(err);
    } else{
        console.log("All games");
        console.log(game);
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

function parser(address){
    return new Promise(function(resolve, reject){

        request(address, function(error,response,body){
            if (error){
                console.log("WRONG");
                reject();
            } else {
                console.log("DID U GO IN HERE");
                if(response.statusCode == 200){
                    let bodyParse = JSON.parse(body);
                    resolve(bodyParse);
                }
            }
        });
    });
}


function  get_teams(teamsBody){
    var teams = [];
    var stdleague = teamsBody["league"]["standard"];
    stdleague.forEach(function(v){
        if (v.isNBAFranchise === true){
            teams.push(v);
        }
    });
    return teams;
}


function get_date(todayBody){
    return todayBody['links']['currentDate'];
}


function id_to_team(id,teams){
    var name = "";
    teams.forEach(function(t){
        if (t["teamId"] === id){
            name += t["fullName"];
        }
    });
    return name;
}


function get_matches(scoreboardBody, teams){
    var matches = [];
    scoreboardBody["games"].forEach(function(m){
        var match = [];
        match.push(id_to_team(m["vTeam"]["teamId"], teams));
        match.push(id_to_team(m["hTeam"]["teamId"], teams));
        matches.push(match);
    });
    return matches;
}

var matches;
var date;
parser('http://data.nba.net/10s/prod/v2/2018/teams.json').then(function(val){
    var nba_teams=get_teams(val);
    parser('http://data.nba.net/10s/prod/v1/today.json').then(function(val){
        date = get_date(val);
        parser('http://data.nba.net/10s/prod/v1/' + date + '/scoreboard.json').then(function(m){
            matches=get_matches(m,nba_teams);
            console.log(matches);
        })
    })
})

var date;
parser('http://data.nba.net/10s/prod/v1/today.json').then(function(val){
    date=get_date(val);
    console.log(date);
})

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.post('/login', function(req,res)
{
    //request.body.user.name;
    //request.body.user.email;
});

app.post('/create_account', function(req,res)
{
    //add to database and sht;
});

app.get('/api/home', function(req, res)
{
    var count = 0;
    var games = [];
    for (var i = 0; i < matches.length; i++)
    {
        var jsonsht = {};
        var team = [];
        if (matches[i][0] === "")
        {
            games.push("No Matches");
        }
        else{
            team.push(matches[i][0]);
            team.push(matches[i][1]);
            games.push({'teams': JSON.stringify(team), 'date': date});
            //jsonsht['teams'] = team;
            //jsonsht['date'] = date;
            //games.push(JSON.stringify(jsonsht));
        }
    }
    res.contentType('application/json');
    res.send(JSON.stringify(games));
});

app.get('/api/stats', function(req, res)
{
    var stats = [{user_id: 'abcde123', user_name: 'Bright Red Hats', correct: 10, loss: 9}];
    res.send(JSON.stringify(stats));
});

app.listen(3001);

console.log('Passed1');