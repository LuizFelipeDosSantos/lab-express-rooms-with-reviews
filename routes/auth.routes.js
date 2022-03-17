const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});

    if (!user) {
        res.redirect("/login");
        return;
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    
    if (!correctPassword) {
        res.redirect("/login");
        return;    
    }

    req.session.user = user;

    res.redirect("/room/list");
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return next(err);

      res.redirect("/login");
    });
  });

module.exports = router;
