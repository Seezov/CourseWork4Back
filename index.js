var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crud_reactjs_mongodb');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers",'Content-type,Accept,X-Access-Token,X-Key');
    if(req.method == 'OPTIONS'){
        res.status(200).end();
    } else {
        next();
    }
});

var Shop = require('./schemas/shop.schema');

app.get('/api/shop/findAll', function(req, res){
    Shop.find({}, function(errors, data) {
        if(errors) {
            throw errors;
        } else {
            res.json(data);
        }
    });
});

app.get('/api/shop/find/:id', function(req, res){
    Shop.findById(req.params.id, function(errors, data) {
        if(errors) {
            throw errors;
        } else {
            res.json(data);
        }
    });
});

app.post('/api/shop/create', function(req, res){
    var newShop = new Shop({
        name: req.body.name,
        numOfAdsSpaces: req.body.numOfAdsSpaces
    });
    newShop.save(function(error, data) {
        if(error) {
            throw error;
        } else {
            res.json(data);
        }
    });
});

app.put('/api/shop/update', function(req, res){
    Shop.findByIdAndUpdate(
        req.body._id,
        {
            name: req.body.name,
            numOfAdsSpaces: req.body.numOfAdsSpaces      
        },
        function(error, data) {
            if(error) {
                throw error;
            } else {
                res.json(data);
            }
        }
    );
});

app.delete('/api/shop/delete/:id', function(req, res){
    console.log(req.params.id);
    Shop.findByIdAndDelete(
        req.params.id, function(error, data) {
            if(error) {
                throw error;
            } else {
                res.json(data);
            }
        });
});

app.listen(5000, 'localhost');