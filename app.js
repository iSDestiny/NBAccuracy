var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res)
{
    if (req.url === '/api/home')
    {
        var games = [{teams: ['warriors', 'lakers'], date: "02-16-2019"}];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(games));
    }
    else if(req.url === '/api/stats')
    {
        var stats = [{user_id: 'abcde123', user_name: 'Bright Red Hats', correct: 10, loss: 9}];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(stats));
    }
    else if(req.url === '/' || req.url === '/home')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    }
    else if(req.url === '/stats')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/stats.html', 'utf8').pipe(res);
    }
    else if(req.url === '/createaccount')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/createaccount.html', 'utf8').pipe(res);
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
    }
});

server.listen(3000, '127.0.0.1');

console.log('Passed1');