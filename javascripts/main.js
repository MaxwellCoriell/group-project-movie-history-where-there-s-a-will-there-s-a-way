'use strict';

let $ = require('jquery');

// Required modules
let templates = require("../templates/movie-grid.hbs");
let db = require("./db-interactions.js");
let user = require("./user.js");
let addingMovies = require("./adding-movies.js");




function populateDOM(){
	let currentUser = user.getUser();
	db.getMovies(currentUser)
	.then(addingMovies.addSuggested);
}




// Login button onClick:
$("#nav-login-link").click(function(){
	user.logInGoogle()
	.then( function(result){
		user.setUser(result.user.uid);
		populateDOM();
	});
});