const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        require: true,
    },
    language: {
        type: String,
        require: true,
    },
    genre: {
        type: "String",
        require: true,
    },
    releaseDate: {
        type: Date,
        require: true,
    },
    poster: {
        type: "String",
        require: true,
    },
});

const Movies = mongoose.model("movies", movieSchema, "movies_Collection");

module.exports = Movies;