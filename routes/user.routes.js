const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

router.post("/user/create", async (req, res) => {
    const { email, password, fullName} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
        email: email,
        password: hashPassword,
        fullName: fullName
    });

    res.redirect("/");
});

module.exports = router;