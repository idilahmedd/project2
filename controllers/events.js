require('dotenv').config();
const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios');

//geocoding setup
const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mapbox({
    accessToken: process.env.MAPBOX_PUBLIC_KEY
});


//GET /event- returns user's events
router.get('/', function(req, res) {
    // res.send('get events');
    db.event.findAll().then(function(events) {
        res.render('events/index', {events});
    });
});

//POST /events - receives form data for a new event
router.get('/results', function(req, res) {
    var searchTerms = '';
    if (req.query.location) {

        searchTerms = searchTerms + "location=" + req.query.location;
        // multiple = true;
    }
    if (req.query.name) {
        searchTerms = searchTerms + '&name=' + req.query.name;
    }
    if (req.query.specialty) {
        searchTerms = searchTerms + '&specialty_uid=' + req.query.specialty;
    }
    var url = `https://api.betterdoctor.com/2016-03-01/doctors?${searchTerms}&skip=0&limit=10&user_key=${process.env.API_KEY}`;
    console.log(url);
    db.kid.findAll().then(function(kids){
        axios.get(url)
          .then(function(response) {
            var practices = response.data;
        
            console.log("🐳🐳🐳 response from API: ");
            //res.json(practices)
            // Add mapbox stuff to the page you are rendering
            // res.json(practices.data)
            console.log();
            
            res.render('events/results', {events: practices.data, kids});

        }).catch(function(err) {
          res.json(err)
        });
    })
});
//GET /search- take out parameters and hit mapbox geocoding
router.get('/search', function(req,res) {
    let location = req.query.city + ", " + req.query.state;
    // use geocoder to query the location with parks appended to the query
    //then take response from mapbox render 'show' with the data
    geocodingClient.forwardGeocode({
        query: "park " + location
    }).send().then(function(response){
        let results = response.body.features.map(function(feature) {
            return feature.center
        })
        res.render('events/playmap', {results});
    })
});
//GET /events/new- sends a form to add new event
router.get('/new', function(req, res,) {
        db.kid.findAll().then(function(kids){
            res.render('events/new',{kids});
        })
});
//GET / events/searchdoc - get form to search for doctor
router.get('/searchdoc', function(req, res,) {
    db.event.findAll().then(function(events){
        res.render('events/searchdoc',{events});
    })
});
//GET / events/searchplay - get form to search for playdate
router.get('/searchplay', function(req, res,) {
    db.event.findAll().then(function(events){
        res.render('events/searchplay',{events});
    })
});
//GET/ events/:id/EDIT - serve up our EDIT event form
router.get('/:id/edit', function(req, res){
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
        kidId: parseInt(req.body.kidId)
    }).then(function(event){
        //if type is doctor redirect to doctor page or else
        if (event.type === 'doctor'){
            res.redirect('/events/searchdoc')
        } else {
            res.redirect('/events/searchplay')
        }
    });
    
});

//POST- /notes -should this shit be here?
router.post('/:id/notes', function(req,res) {
    db.event.findByPk(parseInt(req.params.id))
    .then(function(event) {
        event.createNote({
            time:req.body.time,
            content: req.body.content,
            eventId: parseInt(req.body.eventId)
        }).then(function(note) {
            res.redirect('/events/' + req.params.id);
        })
    })
});



//DELETE
router.delete('/:id', function(req,res) {
    db.event.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/events');
    });
})
//PUT - update form
router.put('/:id', function(req, res) {
    db.event.update({
        type:req.body.eventType,
        location: req.body.eventLocation,
        time: req.body.eventTime,
        with: req.body.eventWith,
        reason: req.body.eventReason,
        kidId: parseInt(req.body.eventKidId)
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(event) {
        res.redirect('/events/' + req.params.id)
    });
});


module.exports = router;