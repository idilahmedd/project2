const express = require('express');
const router = express.Router();
const passport = require('../config/passportConfig');
const db = require('../models');

//GET /auth/signup - sends the signup form
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

//GET /auth/signup - recieves the data from that form above
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user,created) {
    //you can also do .then(function([user,created])
    if (created) {
      console.log("user was created, not found");
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in!'
      })(req,res);
    }else {
      console.log("Email already in use!");
      req.flash('error', 'Email already in use!❌');
      res.redirect('/auth/signup');
    }
  }).catch(function(error){
    console.log("error", error.message);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});
router.get('/login', function(req, res) {
  res.render('auth/login');
});

//
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: "You have logged in!",
  failureFlash: 'Invalid username and/or password!'
}))

//
router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

module.exports = router;
