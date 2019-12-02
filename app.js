const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const request = require('request');  // allow us to connect to web api
const mysql = require('mysql');  // connect to mysql db
const tools = require("./tools.js");

// ROUTES*****************

//root
app.get("/", async function(req, res){

  	var imageURLs = await tools.getRandomImages("", 1);
	console.log(imageURLs);
	res.render("index", {"imageURLs": imageURLs});

})

app.get("/search", async function(req, res){
	// console.dir(req);
	//console.log(req.query.keyword);
	var keyword = req.query.keyword;
	
	// Using Promise
	var imageURLs = await tools.getRandomImages(keyword, 9);
	console.log(imageURLs);
	res.render("results", {"imageURLs": imageURLs, "keyword":keyword});

	/*Using callback
	getRandomImages_cb(keyword, 9, function(imageURLs){
		console.log("imageURLs: " + imageURLs);
		res.render("results", {"imageURLs": imageURLs}); 
	})
	*/
})
	

app.get("/api/updateFavorites", function(req, res){
	var conn = tools.createConnection();

	var sql = [];
	var sqlParams
	if(req.query.action == "add"){
		sql = "INSERT INTO favorites (imageURL, keyword) VALUES (? , ?)"
		sqlParams = [req.query.imageURL, req.query.keyword];
	} else {
		sql = "DELETE FROM favorites WHERE imageURL=?"
		sqlParams = [req.query.imageURL];
	}

	conn.connect(function(err){
		if (err) throw err;

		// conn.query sends SQL query
		conn.query(sql, sqlParams, function(err, result){
			if (err) throw err;
		}) // query
	}) // connect
	res.send("it works!");
})

//Display favorites view with data from db
app.get("/displayKeywords", async function(req, res){
	var imageURLs = await tools.getRandomImages("", 1);
	console.log(imageURLs);

	var conn = tools.createConnection();
	var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";

	conn.connect(function(err){
		if (err) throw err;

		conn.query(sql, function(err, result){
			if(err) throw err;
			console.log(result);
			res.render("favorites", {"rows": result, "imageURLs": imageURLs});
		})
	})// connect

})

app.get("/api/displayFavorites", function(req, res){
	var conn = tools.createConnection();
	var sql = "SELECT imageURL FROM favorites WHERE keyword = ? "
	var sqlParam =  req.query.keyword;
	console.log("SQL PARAM IS : " + sqlParam);

	conn.connect(function(err){
		if (err) throw err;

		conn.query(sql, sqlParam, function(err, result){
			// Query for the result and send the result back to ajax
			if(err) throw err;
			console.log(result);
			res.send(result);	// sending the result to ajax
		})
	})// connect
})
// Listening
// For Heroku port
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Express server is now running");
})
/*
app.listen(3000, function(){
	console.log("Connection successful");
})
*/



