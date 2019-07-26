const DestinationModel = require('../models/destination');
const mongoose = require('mongoose');
const router = require('express').Router();
var express = require('express');
const jwt = require('jsonwebtoken');
const uploadPics = require('../config/multer');


router.get('/', (req, res) => {
    DestinationModel.findAll().then(destinations => {
        res.send(destinations);
    })
});

router.get('/add/:destination', (req, res) => {
    DestinationModel.create({
        nombre: req.params.destination
    }).then(() => res.redirect('/destinations'))
});

router.get('/remove/:destination', (req, res) => {
    // var query = { nombre : 'Punta_Cana'};
    // DestinationModel.findAll(query)
    
    DestinationModel.drop( {id : req.params.destination})

    // DestinationModel.findOne({'nombre' : 'Punta_Cana'}) 
        .then(destinations => {
            res.send(destinations);
        })
})

module.exports = router;