const router = require("express").Router();
const Movie = require("../models/movieModel");

router.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Add a movie
router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res
      .status(200)
      .json({ success: true, message: "New Movie was added successfully" }); // Return a success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//Get all movies 
router.get("/get-all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies has been successfully fetched!",
      data: allMovies,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//update a movie
router.put("/update-movie/:movieId", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body);
        res.send({
            success: true,
            message: "The movie has updated",
            data: movie,
        });
        } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
});

//Delete a movie
router.delete("/delete-movie/:movieId", async (req, res) => {
  try {
     await Movie.findByIdAndDelete(req.params.movieId);
    res.send({
      success: true,
      message: "Selected movie has successfully deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
