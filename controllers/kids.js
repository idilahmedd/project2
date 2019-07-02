const express = require('express');
const db = require('../models');
const router = express.Router();

//GET /kid- returns user's kids
router.get('/', function(req, res) {
    db.kid.findAll().then(function(kids) {
        res.render('kids/index', {kids});
    });
});


//GET /kids/new- sends a form to add new kid- form use res.render
router.get('/new', function(req, res) {
    res.render('kids/new');
});

//POST /kids - create a new kid
router.post('/', function(req, res) {
    db.kid.create({
        name:req.body.name,
        birthdate: req.body.birthdate
    }).then(function(data) {
        res.redirect('/kids');
    });
});

//GET /kids/:id - returns the selected kid
router.get('/:id', function(req, res){
    db.kid.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.event]
    }).then(function(kid){
        var bDay = new Date(kid.birthdate);
        var bDayString = `${bDay.getMonth()}/${bDay.getDate()}/${bDay.getFullYear()}`
            res.render('kids/show', {kid, bDayString});
        });
});


module.exports = router;