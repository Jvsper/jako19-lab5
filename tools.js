const request = require('request');
module.exports ={

/**  Using Callback
* Return random image URLs from an API
* @param string keyword - search term
* @param int imageCount - number of random images
* @return array of image URLs
*/
getRandomImages_cb : function (keyword, imageCount, callback){
	var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=008ec2df11766f9883e96a82d4145ab8a241e26b66cc4810b6673098b8aba1de&orientation=landscape";
  	
  	request(requestURL, function (error, response, body) {
	  //console.log('error:', error); // Print the error if one occurred
	  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the API data
	  
	  if (!error){

	  	var parsedData = JSON.parse(body);
	  	//console.log("Image URL : ", parsedData["urls"]["regular"]);
	  	var imageURLs = [] ; 

	  	for(var i=0; i < 9; i++){
	  		imageURLs.push(parsedData[i].urls.regular);
	  	}
	  	//console.log(imageURLs);
	  	//return imageURLs;
	  	callback(imageURLs);
	 	} else {
	 		console.log("error : ", error);
	 	}

	});
},



/**  Using Promise
* Return random image URLs from an API
* @param string keyword - search term
* @param int imageCount - number of random images
* @return array of image URLs
*/
getRandomImages: function (keyword, imageCount){
	var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=008ec2df11766f9883e96a82d4145ab8a241e26b66cc4810b6673098b8aba1de&orientation=landscape";
  	
  	return new Promise( function(resolve, reject){
  		request(requestURL, function (error, response, body) {
	  //console.log('error:', error); // Print the error if one occurred
	  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the API data
	  
	  if (!error){

	  	var parsedData = JSON.parse(body);
	  	//console.log("Image URL : ", parsedData["urls"]["regular"]);
	  	var imageURLs = [] ; 

	  	for(var i=0; i < parsedData.length; i++){
	  		imageURLs.push(parsedData[i].urls.regular);
	  	}
	  	//console.log(imageURLs);
	  	resolve(imageURLs);
	  	
	 	} else {
	 		console.log("error : ", error);
	 	}

		}); // Request
  	}) // Promise
  	
}

} // Module exports