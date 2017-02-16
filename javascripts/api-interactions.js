"use strict";

let $ = require('jquery');

function searchFor(movie){
	// console.log("movie", movie);
	return new Promise( function(resolve, reject){
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=1425d42c47a975ca77e4f3f66bcb94d2&include_adult=false&language=en-US`,
			type: "GET"
		}).done( function(movieData){
			// console.log("XXX MovieData: ", movieData.search);
			console.log("MovieData: ", movieData);

			// if(movieData.Response === "False"){
			// 	console.log("Weird error that the promise does not catch, I believe is the result of no matches found from the search.");
			// 	return;

			// }

				resolve(movieData);

				
		}).fail( function(error){
			console.log("API CALL ERROR");
			reject(error);
		});
	});
}

module.exports = {searchFor};