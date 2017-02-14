'use strict';

let $ = require('jquery');

// Required modules
let templates = require("../templates/movie-grid.hbs");
let db = require("./db-interactions.js");
let user = require("./user.js");




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