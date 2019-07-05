const express = require('express');
const db = require('../models');
const router = express.Router();

//GET /notes- returns user's notes
router.get('/', function(req, res) {
    // res.send('get notes');
    db.note.findAll().then(function(notes) {
        res.render('notes/index', {notes});
    });
});

//GET /kids/new- sends a form to add new kid- form use res.render
router.get('/new', function(req, res) {
    res.render('notes/new');
});
//POST /notes - create a new note in event page
router.post('/', function(req,res){
    db.note.create({
        time: req.body.time,
        content: req.body.content,
        kidId: req.body.kidId,
        eventId: req.body.eventId
    }).then(function(note){
        res.redirect('/notes/new');
    }); 
    
});

//GET /notes/:id - returns the selected note with attached event and kid
router.get('/notes/:id', function(req,res) {
    db.note.findOne({
        where: {id: parseInt(req.params.id)}, //where the db id - the modle id
        include: [db.event,db.kid] //goes out and grabs as many events and kids and attaches them
    }).then(function(note) {
        res.render('events/show', {note})
    });
});

//DELETE
router.delete('/:id', function(req,res) {
    db.note.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/notes');
    });
})
module.exports = router;