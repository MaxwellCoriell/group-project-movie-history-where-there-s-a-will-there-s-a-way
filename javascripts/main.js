'use strict';

let $ = require('jquery');

// Required modules
let templates = require("../templates/movie-grid.hbs");
let db = require("./db-interactions.js");
let user = require("./user.js");

$("#suggested-movies").hide();
$("#my-movies").hide();
$("#my-watched-movies").hide();
$("#favorites").hide();

function populateDOM(){
	let currentUser = user.getUser();
	db.getMovies(currentUser)
	.then(function(movieData) {
		// let movieActors = "";
		for (var i = 0; i < movieData.length; i++) {
			$("#suggested-movies").append(
											`<section id="card-${movieData[i]}-${movieData[i].keys}" class="card-wrapper col-xs-4" >
												<div class="innerCard" style="border: 2px solid black">
												    <h3 class="movie-header"><strong>${movieData[i].title}</strong></h3>
												    <h4 class="movie-year"><strong>${movieData[i].year}</strong></h4>
												    <img src="${movieData[i].posterURL}" height="200" >
												    <h4><strong>Leading Actors:</strong>${movieData[i].actors}</h4>
												    <button type="button" value="add-to-my-movies">I want to see this movie</button>
		    										<button type="button" value="add-to-my-watched-movies">I seen this movie</button>
		    									</div>
											</section>`);
		}
	});
}




// Login button onClick:
$("#nav-login-link").click(function(){
	user.logInGoogle()
	.then( function(result){
		user.setUser(result.user.uid);
		populateDOM();
	});
});

// When searching and pressing enter, shows the My Searched Movie DIV and applies styling
$("#text-input").keypress(function(e) {
	if (e.keyCode == '13') {
		let input = $("#text-input").val();
		$("#text-input").val("");
		console.log("Input: ", input);
		$("#suggested-movies").show();
		$("#current-list-visible").html("My Movie Search");
		$(".select-button").removeClass("blue-background");
		$(".select-button").children("div").removeClass("blue-background");
		$("#my-movie-search-button").addClass("blue-background");
		$("#my-movie-search-text").addClass("blue-background");
	}
});

$(".select-button").click(function(event) {
	$(".select-button").removeClass("blue-background");
	$(".select-button").children("div").removeClass("blue-background");
	$(this).addClass("blue-background");
	$(this).children("div").addClass("blue-background");
	if (event.currentTarget.id === "my-favorites-button") {
		$("#current-list-visible").html("My Favorites");
		$("#favorites").show();
	}
	// let allButtons = $(".select-button");
	// $.each(allButtons, function(index, value) {
	// 	console.log('looping?');
	//   if (event.currentTarget) {
	// 		$(event.currentTarget).addClass("blue-background");
	// 		$(event.currentTarget).children("div").addClass("blue-background");
	// 	} else {
	// 		allButtons[index].removeClass("blue-background");
	//
	// 	}
	// });
});
