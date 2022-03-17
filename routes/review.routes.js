const router = require("express").Router();
const mongoose = require("mongoose");
const Room = require("../models/Room.model");
const Review = require("../models/Review.model");

router.get("/review/create/:roomId", async (req, res) => {
    const roomId = mongoose.Types.ObjectId(req.params.roomId);

    res.render("reviewCreate", {roomID});
});

router.post("/review/create/:roomId", async (req, res) => {
    const roomId = mongoose.Types.ObjectId(req.params.roomId);
    const room = await Room.findById(roomId);

    res.redirect("/room/reviews/"+roomId);
});

module.exports = router;