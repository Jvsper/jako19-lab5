// Without $(doument).ready, this js file won't be able to access html tags when
// having js file in different file and not in the same html file

$(document).ready(function(){



	$(".favoriteIcon").on('click', function(){
		var imageURL = $(this).prev().attr("src");
		if($(this).attr("src")== "img/favorite.png"){
			$(this).attr("src", "img/favorite_on.png");
			//alert("Adding URL : " + $(this).prev().attr("src"))

			updateFavorite(imageURL);
		}
		else {
			$(this).attr("src", "img/favorite.png");
			//alert("Removing URL : " + $(this).prev().attr("src"))
		}
	}) 

	function updateFavorite(imageURL){
		$.ajax({
			method: "get",
			url: "/api/updateFavorites",
			data: {"imageURL" : imageURL,
					"keyword" : "love"
				}
		}); // ajax
	}

});