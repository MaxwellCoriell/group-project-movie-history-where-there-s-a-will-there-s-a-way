"use strict";

let $ = require('jquery');


function searchFor(movie){
	return new Promise( function(resolve, reject){
		$.ajax({
			url: `http://www.omdbapi.com/?s=${movie}`,
			type: "GET"
		}).done( function(movieData){
			console.log("XXX MovieData: ", movieData.Search);
			console.log("MovieData: ", movieData);
			if(movieData.Response === "False"){
				console.log("Weird error that the promise does not catch, I believe is the result of no matches found from the search.");
				return;
			}
			resolve(movieData.Search);
		}).fail( function(error){
			console.log("API CALL ERROR");
			reject(error);
		});
	});
}




module.exports = {searchFor};