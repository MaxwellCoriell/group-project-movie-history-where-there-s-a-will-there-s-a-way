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
		// Prevents an API call with bad search string
		if(userMovie === "" || userMovie === " " || userMovie === undefined || userMovie.length <= 2){
			console.log("INVALID USER INPUT ");
			return;
		}

		// Declare movie arrays
		var searchedMovies;
		var myMovies;
		// Search for user specified movie (IN API)
		api.searchFor(userMovie)
		.then( function(apiMovies){
			// Store the returned movies that were searched for (API)
			searchedMovies = apiMovies;
		})
		.then( db.getMovies)
		.then( function(dbMovies){
			// Store the returned movies (DATABASE)
			myMovies = dbMovies;
		// Then find movies with matching imdmIDs among the two arrays
		}).then( function(){
			findDuplicates(searchedMovies, myMovies);
		});
	}
});


// Login button onClick:
$("#nav-login-link").click(function(){
	user.logInGoogle()
	.then( function(result){
		user.setUser(result.user.uid);
		populateDOM();
	});
});




