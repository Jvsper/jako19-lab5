const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const request = require('request');  // allow us to connect to web api
const mysql = require('mysql');  // connect to mysql db

// ROUTES*****************

//root
app.get("/", function(req, res){

  var requestURL = "https://api.unsplash.com/photos/random?client_id=008ec2df11766f9883e96a82d4145ab8a241e26b66cc4810b6673098b8aba1de&orientation=landscape"
  request(requestURL, function (error, response, body) {
	  //console.log('error:', error); // Print the error if one occurred
	  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the API data
	  
	  if (!error){

	  	var parsedData = JSON.parse(body);
	  	//console.log("Image URL : ", parsedData["urls"]["regular"]);
	  	var imageURL = parsedData["urls"]["regular"];

	 	 res.render("index", {"imageURL": imageURL}); // This is in the callback function because of asyncronous coding
	 	} else {
	 		res.render("index", {"error": imageURL})
	 	}

	});
})




// Listen
app.listen(3000, function(){
	console.log("Connection successful");
})