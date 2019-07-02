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

//GET /notes/:id - returns the selected note with attached event and kid
router.get('/notes/:id', function(req,res) {
    db.note.findOne({
        where: {id: parseInt(req.params.id)}, //where the db id - the modle id
        include: [db.event,db.kid] //goes out and grabs as many events and kids and attaches them
    }).then(function(note) {
        res.render('events/show', {note})
    });
});
//POST /notes - create a new note in event page
router.post('/new', function(req,res){
    db.note.create({
        time: req.body.time,
        content: req.body.content,
        kidId: req.body.kidId,
        eventId: req.body.eventId
    }).then(function(note){
        res.redirect('/events/' + req.body.eventId);
    }); 
    
});


module.exports = router;