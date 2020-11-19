var http = require('http');
var https = require('https');
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
 
app.listen(34257, function(){
    console.log("API server started on port 34257!");
});
 
var data = null;
 
function jsonHttpRequest(host, port, data, callback, path){
    path = path || '/json_rpc';
 
    var options = {
        hostname: host,
        port: port,
        path: path,
        method: data ? 'POST' : 'GET',
        headers: {
            'Content-Length': data.length,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
 
    var req = (port == 443 ? https : http).request(options, function(res){
        var replyData = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            replyData += chunk;
        });
        res.on('end', function(){
            var replyJson;
            try{
                replyJson = JSON.parse(replyData);
            }
            catch(e){
                callback(e);
                return;
            }
            callback(null, replyJson);
        });
    });
 
    req.on('error', function(e){
        callback(e);
    });
 
    req.end(data);
}
 
var pullData = function(){
    jsonHttpRequest('api.coinmarketcap.com', 443, '', function(err, response){
        if(!err && response.length > 0){
            data = response;
        }
    }, '/v1/ticker/electroneum/');
};
 
setInterval(function(){
    pullData();
}, 30000);
 
pullData();
 
app.get("/cmc", function(req, res){
    res.json(data);
});