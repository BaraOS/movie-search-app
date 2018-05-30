var express = require("express");
var app = express(); 
var request = require("request");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");    
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s="+ query +"/&apikey=thewdb"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render("results", {data: data, query: query});
        }
    });
});




app.get("*", function(req, res){
    res.send("Sorry page not found");
});

app.listen(3000, () => console.log('Movie Search app listening on port 3000!'));