'use strict';

///////////////////////////////////////////////
///		MODULAR (REQUIRED) VARIABLES		///
///////////////////////////////////////////////

let $ = require('jquery');

// Required modules
let templates = require("../templates/movie-grid.hbs");
let db = require("./db-interactions.js");
let user = require("./user.js");
let api = require("./api-interactions.js");


////////////////////////////////////
///		METHODS/FUNCTIONS		////
////////////////////////////////////

function populateDOM(userMovie){
	console.log("We need some movies!!", userMovie);
	let currentUser = user.getUser();
	console.log("the user is: ", currentUser);
	if (currentUser) {
		//db.getMovies(currentUser)
		api.searchFor(userMovie)
		.then( (mov)=>{ 
		var movieData = mov;
		console.log("13", movieData);
		for (var i = 0; i < movieData.results.length; i++) {
			console.log("15", movieData);
			$("#suggested-movies").append(
					`<section id="card-${movieData.results[i]}-${movieData.results[i].keys}" class="card-wrapper col-xs-4" >
						<div class="innerCard" style="border: 2px solid black; max-height: 700px ">
							<h3 class="movie-header"><strong>${movieData.results[i].original_title}</strong></h3>
							<h4 class="movie-year"><strong>${movieData.results[i].release_date}</strong></h4>
							<img src="https://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}" height="200px" >
							<!-- <h4><strong>Plot:</strong>${movieData.results[i].overview}</h4> -->
							<button type="button" id="add-to-my-movies-button" class="btn btn-default" value="add-to-my-movies">Add to My Movies</button>
							<!-- <button type="button" class="btn btn-default" value="add-to-my-watched-movies">I seen this movie</button> -->
						</div>
						<div id="starRating" class="hide">
							<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
						</div>
					</section>`);
			}
		});

	} else {
		window.alert("PLEASE SIGN IN!");

	}
	
	

}
	


// OTHER METHODS
function findDuplicates(searchedMovies, myMovies){
	var i, j;

	for(i = 0; i < searchedMovies.length; i++){
		for(j = 0; j < myMovies.length; j++){
			if(searchedMovies[i].imdbID === myMovies[j].imdbID){
				console.log("MATCHED!!: ", searchedMovies[i].Title);
			}
		}
	}
}





//////////////////////////////
//		EVENT LISTENERS		//
//////////////////////////////


// When user hits enter after searching
$("#text-input").keypress( function(event){

	// When user hits the enter key in search bar
	if(event.keyCode === 13){
		var userMovie = $("#text-input").val();
		// Prevents an API call with bad user input
		if(userMovie === "" || userMovie === " " || userMovie === undefined || userMovie.length <= 2){
			console.log("INVALID USER INPUT ");
			return;
		}

		// Declare movie arrays
		// var searchedMovies;
		// var myMovies;
		// Search for user specified movie (IN API)
		//api.searchFor(userMovie)
		console.log("userMovie", userMovie);
		populateDOM(userMovie);
		// .then(function(movieResults){	
		// 	// Store the returned movies that were searched for (API)
		// 	console.log("what is movieResults", movieResults);
		// });
		// // .then( db.getMovies);
		// .then( function(dbMovies){
		// 	// Store the returned movies (DATABASE)
		// 	myMovies = dbMovies;
		// // Then find movies with matching imdmIDs among the two arrays
		// }).then( function(){
		// 	findDuplicates(searchedMovies, myMovies);
		// });
	}
});


// Login button onClick:
$("#nav-login-link").click(function(){
	user.logInGoogle()
	.then( function(result){
		user.setUser(result.user.uid);
		$("#nav-login-link").addClass("hide");
		$("#nav-register-link").addClass("hide");
		$("#nav-logout-link").removeClass("hide");
		populateDOM();
	});
});

// Logout Button onClick:
$("#nav-logout-link").click( function(){
	user.logOut();
	console.log("CurrentUser: ", user.getUser());
	$("#nav-login-link").removeClass("hide");
	$("#nav-register-link").removeClass("hide");
	$("#nav-logout-link").addClass("hide");
	$("#suggested-movies").html(" ");
	$("#my-movies").html(" ");
	$("#my-watched-movies").html(" ");
});



