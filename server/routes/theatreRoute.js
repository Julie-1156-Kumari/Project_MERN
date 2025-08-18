const router = require("express").Router();
const Theatre = require("../models/theatreModel");


// Add a theatre
router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    console.log("new theatre added: ", newTheatre);

    res
      .status(200)
      .json({ success: true, message: "New Movie was added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//Get all theatres admin
router.get("/get-all-theatres", async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "All theatres has successfully fetched!",
      data: allTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//Get all theatres for individual partners
router.get("/get-all-theatres/:ownerId", async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({
      success: true,
      message: "All theatres has successfully fetched!",
      data: allTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//update a theatre
router.put("/update-theatre/:theatreId", async (req, res) => {
    try {
        const theatre = await Theatre.findByIdAndUpdate(req.params.theatreId, req.body);
        res.send({
            success: true,
            message: "The theatre has updated",
            data: theatre,
        });
        } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
});

//Delete a theatre
router.delete("/delete-theatre/:theatreId", async (req, res) => {
  try {
     await Theatre.findByIdAndDelete(req.params.theatreId);
    res.send({
      success: true,
      message: "Selected theatre has successfully deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
