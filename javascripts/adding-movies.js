"use strict";

let $ = require('jquery');
let db = require("./db-interactions.js");
let user = require("./user.js");

// function that adds searched movie cards
function addSuggested(movieData) {
    console.log('addSuggested initiated');
    console.log('movieData.length = ', movieData.length);
    var currentUser = user.getUser();
    for (var i = 0; i < movieData.length; i++) {
        console.log('movieData[i] = ', movieData[i]);
        if (movieData[i].userID === currentUser) {
            $("#my-movies").append(`<p>movieData[i]</p>`);
        } else {
        $("#suggested-movies").append(
                                        `<section id="card-${movieData[i]}" class="card-wrapper col-xs-4" >
                                            <div class="innerCard" style="border: 2px solid black">
                                                <h3 class="movie-header">${movieData[i].title}</h3>
                                                <h4 class="movie-year">${movieData[i].year}</h4>
                                                <img src="${movieData[i].posterURL}" height="200" >
                                                <h5>${movieData[i].actors}</h5>
                                                <button type="button" class="add-to-my-movies" value="${movieData[i].title}">I want to see this movie</button>
                                                <button type="button" class="add-to-my-watched-movies" value="add-to-my-watched-movies">I seen this movie</button>
                                            </div>
                                        </section>`);
        }
    }
    // $(".add-to-my-watched-movies").click(addToWatched);
    $(".add-to-my-movies").click(addToMyMovies);
}

// function that adds movie to the database
function addToMyMovies() {
    console.log('you clicked I want to see this movie');
    var currentCard = $(event.currentTarget);
    console.log('url:', currentCard.siblings("img").attr("src"));
    var currentUser = user.getUser();
    var myMovie = {
        "title": currentCard.siblings("h3").html(),
        "year": currentCard.siblings("h4").html(),
        "actors": currentCard.siblings("h5").html(),
        "userID": currentUser,
        "rating": "",
        "posterURL": currentCard.siblings("img").attr("src")
    };
    return new Promise (function(resolve, reject) {
        $.ajax({
            url: "https://movie-history-6e707.firebaseio.com/movies.json",
            type: "POST",
            data: JSON.stringify(myMovie),
            dataType: "json"
        }).done(function(movie) {
            resolve(movie);
        });
    });
}

// function addToWatched() {
//     addToMyMovies()
//     .then(function(){

//     });
//     console.log('you clicked I seen this movie');
// }

module.exports = {addSuggested};
