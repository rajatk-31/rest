//requiring all modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
//var cors = require('cors');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var user = require('../model/user'); // get our mongoose model
var Building = require('../model/building')
var registrationLogin = require('../routes/registrationLogin')
var jwtVerify = require('../routes/jwtVerify')

var BuildingRoutes = express.Router()
//for authentication
// BuildingRoutes.use(function(req, res, next) {
//   jwtVerify(req, res, next)
// })

//Adding a new Building
BuildingRoutes.post('/addbuilding', function(req,res){
    var building= new Building({
        name: req.body.name,
        address: req.body.address
    })
    building.save(function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                data: data
            });
        }

    });
})


//Adding a new restaurant
BuildingRoutes.post('/addrest', function(req, res){
    var newrest ={
        rest_name: req.body.name,
        rest_phone: req.body.phone
    }

    Building.findOneAndUpdate({name: req.body.build},{$push: {restaurants: newrest}}, {upsert: true}, function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                data: data,
                msg: "updated"
            });
        }

    });
})


//Adding new dish
BuildingRoutes.post('/adddish', function(req, res){
    var newdish ={
        dish_name: req.body.named,
        price: req.body.price
    }

    Building.aggregate({$match:{"office.office_name": req.body.name}}, function(err, data) {
        if (err) {
            res.send({
                status: false,
                error: err
            });
        } else {
            res.send({
                status: true,
                data: data,
                msg: "updated"
            });
        }

    });
})
module.exports = BuildingRoutes;