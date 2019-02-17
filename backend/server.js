var request = require ('request');
var express = require('express');
const bodyParser = require('body-parser');

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
    var name = '';
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
parser('http://data.nba.net/10s/prod/v2/2018/teams.json').then(function(val){
    var nba_teams=get_teams(val);
    //console.log(nba_teams)
    parser('http://data.nba.net/10s/prod/v1/20190217/scoreboard.json').then(function(m){
        matches=get_matches(m,nba_teams);
        //console.log(matches);

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

app.get('/api/home', function(req, res)
{
    var games = '';
    for (var i = 0; i < matches.length; i++)
    {
        if (matches[i][0] === "")
        {
            games = 1;
        }
    }
    if (games != 1){
        games = [{teams: matches, date: date}];
    }
    else{
        games = ["No matches"];
    }
    res.send(JSON.stringify(games));
});

app.get('/api/stats', function(req, res)
{
    var stats = [{user_id: 'abcde123', user_name: 'Bright Red Hats', correct: 10, loss: 9}];
    res.send(JSON.stringify(stats));
});

app.listen(3001);

console.log('Passed1');