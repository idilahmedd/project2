const express = require('express');
const db = require('../models');
const router = express.Router();

//GET /kid- returns user's kids
router.get('/', function(req, res) {
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(function(user) {
        console.log(user);
        db.kid.findAll({
            where: {userId: user.id}
        }).then(function(kids) {
            res.render('kids/index', {kids});
        });
    })
});


//GET /kids/new- sends a form to add new kid- form use res.render
router.get('/new', function(req, res) {
    res.render('kids/new');
});

//POST /kids - create a new kid
router.post('/', function(req, res) {
    db.kid.create({
        name:req.body.name,
        birthdate: req.body.birthdate,
        userId: req.user.id
    }).then(function(data) {
        res.redirect('/kids');
    });
});

//GET/ kids/:id/EDIT - serve up our EDIT kid form
router.get('/:id/edit', function(req, res){
    db.kid.findByPk(parseInt(req.params.id)).then(function(kid) {
        res.render('kids/edit', {kid});
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
//DELETE
router.delete('/:id', function(req,res) {
    db.kid.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/kids');
    });
})
//PUT 
router.put('/:id', function(req, res) {
    db.kid.update({
        name:req.body.kidName,
        birthdate: req.body.kidBirthdate,
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(kid) {
        res.redirect('/kids/' + req.params.id)
    });
});


module.exports = router;