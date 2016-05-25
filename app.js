/**Mighty Gumball, Inc.
Version 2.0

- Rudimentary Page Templates using RegEx
- REST Client Calling Grails GORM Scaffolded REST Controller
- Client State Validation using HMAC Key-Based Hash 

NodeJS-Enabled Standing Gumball
Model# M102988
Serial# 1234998871109

**/

var endpoint = "http://52.9.120.14:8080/GrailsGumballMachineVer2-2.0/gumballs/1";


// added in v2: crypto
// crypto functions:  http://nodejs.org/api/crypto.html

var crypto = require('crypto');
var fs = require('fs');
var express = require('express');
var Client = require('node-rest-client').Client;

var app = express();
app.use(express.bodyParser());
app.use("/images", express.static(__dirname + '/images'));

var secretKey = "kwRg54x2Go9iEdl49jFENRM12Mp711QI" ;

var get_hash = function( state, ts ) {

    // http://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key
    text = state + "|" + ts + "|" + secretKey ;
    hmac = crypto.createHmac("sha256", secretKey);
    hmac.setEncoding('base64');
    hmac.write(text);
    hmac.end() ;
    hash = hmac.read();
    //console.log( "HASH: " + hash )
    return hash ;

}



/*
var writeToDB = function (req, res){

var fs = require("fs");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://52.32.210.48:27017/write?w=0&readPreference=secondary";



MongoClient.connect(url, function(err, db) {
        var cursor =db.collection('hello').insert({
  id:2,  print: "Hello World #1" });
        var doc_total = {};
        var index = 0;
        cursor.each(function(err, doc) {
          console.log("Doc is "+JSON.stringify(doc))
          if (doc != null) {
             doc_total[index++] = doc;
          } else {
              db.close();
              res.end(JSON.stringify((doc_total),null,4));
          }
       });
    });
}       

*/
var getfromDB = function (req, res){


var fs = require("fs");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://52.32.210.48:27017/test?w=0&readPreference=secondary";



    MongoClient.connect(url, function(err, db) {
        var cursor =db.collection('hello').find();
        var doc_total = {};
        var index = 0;
        cursor.each(function(err, doc) {
          console.log("Doc is "+JSON.stringify(doc))
          if (doc != null) {
             doc_total[index++] = doc;
          } else {
              db.close();
              res.end(JSON.stringify((doc_total),null,4));
          }
       });
    });
}       

var getfromDBslave1 = function (req, res){


var fs = require("fs");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://52.39.136.0:27017/test?w=0&readPreference=secondary";



    MongoClient.connect(url, function(err, db) {
        var cursor =db.collection('hello').find();
        var doc_total = {};
        var index = 0;
        cursor.each(function(err, doc) {
          console.log("Doc is "+JSON.stringify(doc))
          if (doc != null) {
             doc_total[index++] = doc;
          } else {
              db.close();
              res.end(JSON.stringify((doc_total),null,4));
          }
       });
    });
}       

var getfromDBslave2 = function (req, res){


var fs = require("fs");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://52.39.27.47:27017/test?w=0&readPreference=secondary";



    MongoClient.connect(url, function(err, db) {
        var cursor =db.collection('hello').find();
        var doc_total = {};
        var index = 0;
        cursor.each(function(err, doc) {
          console.log("Doc is "+JSON.stringify(doc))
          if (doc != null) {
             doc_total[index++] = doc;
          } else {
              db.close();
              res.end(JSON.stringify((doc_total),null,4));
          }
       });
    });
}       


//app.set('port',5000);
app.set('port', (process.env.PORT || 5000));

//app.post("/wrimongoFinal_1",writeToDB);
app.get("/MongoFinal_1",getfromDB );
app.get("/MongoFinal_2",getfromDBslave1);
app.get("/MongoFinal_3",getfromDBslave2);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})