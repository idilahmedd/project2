const express = require('express');
const db = require('../models');
const router = express.Router();


//GET /event- returns user's events
router.get('/', function(req, res) {
    // res.send('get events');
    db.event.findAll().then(function(events) {
        res.render('events/index', {events});
    });
});

//GET /events/new- sends a form to add new event
router.get('/', function(req, res) {
    // Get fields for searching from req.body
    // Build the URL with those search terms
    // Use that URL in th axios call

    axios.get('https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=10&' + '&apikey=' + process.env.API_KEY)
      .then(function(response) {
        var practices = response.data;
        console.log("🐳🐳🐳 response from API: " + practices.data[1].name);
        //res.json(practices)
        // Add mapbox stuff to the page you are rendering
        res.render('events/new', {events: practices.data});
    }).catch( function(err) {
      res.json(err)
    });
  });

//GET /events/new- sends a form to add new event
router.get('/new', function(req, res,) {
    // db.event.findAll()
    //     .then(function(events) {
        db.kid.findAll().then(function(kids){
            res.render('events/new',{kids});
        })
            
        //});
});
//GET/ events/:id/EDIT - serve up our EDIT event form
router.get('/events/:id/edit', function(req, res){
    db.event.findByPk(parseInt(req.params.id)).then(function(event) {
        res.render('events/edit', {event});
    });
});
//GET /events/:id - returns the selected event
router.get('/:id', function(req,res) {
    db.event.findOne({
        where: {id: parseInt(req.params.id)}, //where the db id - the modle id
        include: [db.kid, db.note] //goes out and grabs as many kids and notes and attaches them
    }).then(function(event) {
        // db.comment.findOne({
        //     where: {postId: parseInt(req.params.id)}, //where the db id - the modle id 
        // }).then(function(events) {

            res.render('events/show', {event});
        });
});

//POST /events - create a new event
router.post('/', function(req,res){
    db.event.create({
        type: req.body.type,
        location: req.body.location,
        time: req.body.time,
        with: req.body.with,
        reason: req.body.reason,
        kidId: req.body.kidId,
    }).then(function(event){
        res.redirect('/');
    });
    
});


router.post('/:id/notes', function(req,res) {
    db.event.findByPk(parseInt(req.params.id))
    .then(function(event) {
        event.createNote({
            time:req.body.time,
            content: req.body.content,
            eventId: req.body.eventId
        }).then(function(note) {
            res.redirect('/events/' + req.params.id);
        })
    })
});



//DELETE
router.delete('/events/:id', function(req,res) {
    db.event.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/events');
    });
})
//PUT 
router.put('/events/:id', function(req, res) {
    db.event.update({
        type:req.body.eventType,
        location: req.body.eventLocation,
        time: req.body.eventTime,
        with: req.body.eventWith,
        reason: req.body.eventReason,
        kidId: req.body.eventKidId
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(event) {
        res.redirect('/events/' + req.params.id)
    });
});


module.exports = router;