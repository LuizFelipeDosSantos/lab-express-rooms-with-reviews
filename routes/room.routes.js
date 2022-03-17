const router = require("express").Router();
const mongoose = require("mongoose");
const Room = require("../models/Room.model");

router.get("/room/list", async (req, res) => {
    const rooms = await Room.find();
    rooms.forEach(async (room) => {
        await room.populate("owner");
    });

    res.render("roomList", {rooms});
});

router.get("/room/reviews/:id", async (req, res) => {
    const roomId = mongoose.Types.ObjectId(req.params.id);
    const room = await Room.findById(roomId);
    await room.populate("reviews");

    res.render("roomReviews", {room});
});

router.use(require("../middlewares/requireLogin"));
router.get("/room/create", (req, res) => {
    res.render("roomCreate");
});

router.post("/room/create", async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const userId = mongoose.Types.ObjectId(req.session.user._id);

    await Room.create({
        name: name,
        description: description,
        imageUrl: imageUrl,
        owner: userId
    });

    res.redirect("/room/list");
});

router.get("/room/edit/:id", async (req, res) => {
    const roomId = mongoose.Types.ObjectId(req.params.id);
    const room = await Room.findById(roomId);
    const userId = mongoose.Types.ObjectId(req.session.user._id); 

    if (userId.equals(room.owner)) {
        res.render("roomEdit", {room});
    } else {
        res.redirect("/room/list");
    }
});

router.post("/room/edit/:id", async (req, res) => {
    const { name, description, imageUrl } = req.body;
    const roomId = mongoose.Types.ObjectId(req.params.id);

    await Room.findByIdAndUpdate(roomId, {name: name, description: description, imageUrl: imageUrl});

    res.redirect("/room/list");
});

router.post("/room/delete/:id", async (req, res) => {
    const roomId = mongoose.Types.ObjectId(req.params.id);
    const room = await Room.findById(roomId);
    const userId = mongoose.Types.ObjectId(req.session.user._id);

    if (userId.equals(room.owner)) {
        await Room.findByIdAndRemove(roomId);
    }

    res.redirect("/room/list");
});

module.exports = router;