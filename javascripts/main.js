'use strict';

let $ = require('jquery');

// Required modules
let templates = require("../templates/movie-grid.hbs");
let db = require("./db-interactions.js");
let user = require("./user.js");




function populateDOM(){
	let currentUser = user.getUser();
	db.getMovies(currentUser)
	.then( function(movieData){
		console.log("Movie Data: ", movieData);
		// var idArray = Object.keys(movieData);
		// idArray.forEach(function(key){
		// 	movieData[key].id = key;
		// });
		// console.log("With Keys: ", movieData);
		// templates.makeSongList(movieData);
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