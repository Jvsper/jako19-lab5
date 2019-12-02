// Without $(doument).ready, this js file won't be able to access html tags when
// having js file in different file and not in the same html file

$(document).ready(function(){

	$(".favoriteIcon").on('click', function(){
		var imageURL = $(this).prev().attr("src");
		var keyword = $("input").attr("placeholder");

		if($(this).attr("src")== "img/favorite.png"){
			$(this).attr("src", "img/favorite_on.png");
			//alert("Adding URL : " + $(this).prev().attr("src"))

			updateFavorite("add", imageURL, keyword); // insert new record
		}
		else {
			$(this).attr("src", "img/favorite.png");
			//alert("Removing URL : " + $(this).prev().attr("src"))
			updateFavorite("delete", imageURL, keyword); // delete record
		}
	}) 

	$(".keywordLink").on('click', function(){
		// Calls 
		
		$.ajax({	// requesting to URL with the data {keyword}
			method: "get",
			url: "/api/displayFavorites",
			data: {
				"keyword" : $(this).text().trim() // Send this request to the url
			},
			success: function(rows, status){
				// success receives the query done by /displayfavorites
				// res.send(result) ends here as rows
				$("#favorites").html("");
				rows.forEach(function(row){
					$("#favorites").append("<img class='image' src='"+row.imageURL+"' width='200' height='200' alt='image'>");
				})
			}
		});
	})

	function updateFavorite(action, imageURL, keyword){
		// ajax sends a request with data object to the designated url
		// ajax is used to call server functions, or api url
		$.ajax({
			method: "get",
			url: "/api/updateFavorites",
			data: {"imageURL" : imageURL,
					"keyword" : keyword,
					"action"  : action
				}
		}); // ajax
	}



}); // document ready