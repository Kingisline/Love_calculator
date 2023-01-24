// jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https")

const hostname = '0.0.0.0';

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/about.html");
});

app.get("/success", function(req, res){
    res.sendFile(__dirname + "/success.html");
});

app.get("/failure", function(req, res){
    res.sendFile(__dirname + "/failure.html");
});

app.post("/", function(req, res){


    var yourName = req.body.yName;

    var crushName = req.body.cName;

    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    YNAME: yourName,
                    CNAME: crushName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/dfecc024b5";

    const options = {
        method: "POST",
        auth: "kalai:743bcd55de15c11f9df364e83186d7ce-us17"
    }

   const request = https.request(url, options, function(response) {


     if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");

     }else{
        res.sendFile(__dirname + "failure.html")
     };

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })


    request.write(jsonData);
    request.end();
});


app.listen(5050, hostname, function() {
    console.log("app is running on port 5050");
});


// 743bcd55de15c11f9df364e83186d7ce-us17

// 743bcd55de15c11f9df364e83186d7ce-us17

// dfecc024b5

// 743bcd55de15c11f9df364e83186d7ce-us17

// dfecc024b5