const express = require('express');
const router = express.Router();
const User = require("../models/userSchema");
const JWT = require("jsonwebtoken");
require('dotenv').config();
const Key = process.env.SecretKey;


router.post('/register', async (req, res) => {
    const user = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Mobile: req.body.Mobile
    });

    var user2 = await User.findOne({ Email: req.body.Email }).exec();
    if (user2) {
        res.send("Register unsuccessful")
    }
    else {
        await user.save()
            .then(data => {
                res.send("Register successful");
            })
            .catch(err => {
                console.log(err);
            })
    }
});

router.post('/login',async (req, res) => {

    var user = await User.findOne({ Email: req.body.Email, Password: req.body.Password }).exec();
    if (!user) {
        res.send("User not found");
    } else {
        console.log(user);
        const authToken = JWT.sign({id: user._id}, Key);
        // console.log(authToken);
        // res.send("Login Successful");
        res.json({check: true, authToken: authToken, userId: user._id});
    }
})

router.get('/profile/:id',async(req,res)=>{
    const uid=req.params.id;
    var user = await User.findOne({ _id:uid }).exec();
    if (!user) {
        res.send("No user detected");
    } else {
        res.json({Mobile:user.Mobile,Name:user.Name});
    }
})

module.exports = router;