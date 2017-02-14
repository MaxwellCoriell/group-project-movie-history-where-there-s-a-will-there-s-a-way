"use strict";

let $ = require('jquery');
let db = require("./db-interactions.js");
let user = require("./user.js");

function addSuggested(movieData) {
    for (var i = 0; i < movieData.length; i++) {
        $("#suggested-movies").append(
                                        `<section id="card-${movieData[i]}" class="card-wrapper col-xs-4" >
                                            <div class="innerCard" style="border: 2px solid black">
                                                <h3 class="movie-header"><strong>${movieData[i].title}</strong></h3>
                                                <h4 class="movie-year"><strong>${movieData[i].year}</strong></h4>
                                                <img src="${movieData[i].posterURL}" height="200" >
                                                <h4><strong>Leading Actors:</strong>${movieData[i].actors}</h4>
                                                <button type="button" class="add-to-my-movies" value="${movieData[i].title}">I want to see this movie</button>
                                                <button type="button" class="add-to-my-watched-movies" value="add-to-my-watched-movies">I seen this movie</button>
                                            </div>
                                        </section>`);
    }
    $(".add-to-my-watched-movies").click(addToWatched);
    $(".add-to-my-movies").click(addToMyMovies);
}


function addToMyMovies() {
    console.log('you clicked I want to see this movie');
    console.log('closest title:', $(event.currentTarget).closest("h3"));
    var currentUser = user.getUser();
    var testMovie = {
        "title":"Movie",
        "year":"1999",
        "actors":["list", "of", "actors"],
        "userID": currentUser,
        "rating": "",
        "plot":"awesome",
        "posterURL": "https://images-na.ssl-images-amazon.com/images/M/MV5BMWEzNmUxZTMtZjY0My00OGNmLWIyNDctODM2YzZjM2YwZWEwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    };
    // return new Promise (function(resolve, reject) {
    //     $.ajax({
    //         url: "https://movie-history-6e707.firebaseio.com/movies.json",
    //         type: "POST",
    //         data: JSON.stringify(testMovie),
    //         dataType: "json"
    //     }).done(function(movie) {
    //         resolve(movie);
    //     });
    // });
}

function addToWatched() {
    addToMyMovies()
    .then(function(){

    });
    console.log('you clicked I seen this movie');
}

module.exports = {addSuggested};

// function addSong(songFormObj) {
//     console.log('addSong =', songFormObj);
//     return new Promise (function(resolve, reject) {
//         $.ajax({
//             url: "https://movie-history-6e707.firebaseio.com/movies.json",
//             type: "POST",
//             data: JSON.stringify(songFormObj),
//             dataType: "json"
//         }).done(function(songId) {
//             resolve(songId);
//         });
//     });
// }