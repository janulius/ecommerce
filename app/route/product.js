/*lib*/

const moment = require('moment');
const request = require('request');
const _ = require('underscore');
const async = require("async");

/*model*/
const Product = require('./../models/product');

module.exports = function(app) {

    /*
     |--------------------------------------------------------------------------
     | END POINT product
     |--------------------------------------------------------------------------
     */
    app.route('/product')
        .get(function(req, res) {
            Product.find({}, function(err,doc){
                if (err)  res.status(500).send({ message: err.message });
                res.send({ message: 'success' ,doc : doc });
            })
        })
        .put(function(req, res) {
            Product.update({sku:req.body.sku}, { $set: { quantity: req.body.quantity }},{upsert:true}, function (err,update) {
                if (err) res.status(500).send({ message: err.message });
                res.send({ message: 'success' });
            })
        })
        .delete(function(req, res){
            Product.remove({sku:req.body.sku},function(err){
                if (err) res.status(500).send({ message: err.message });
                res.send({ message: 'success' });
            })
        })
        .post(function(req, res){
            if(!_.isEmpty(req.body)){
                var products = new Product(req.body);
                products.save(function(err, doc) {
                    if (err)  res.status(500).send({ message: err.message });
                    res.send({ message: 'success' ,doc : doc });
                });
            }else{
                res.status(400).send({ message: 'body is empty' });
            }
        })
}
