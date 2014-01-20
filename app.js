var express = require("express");
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var Grid = require('gridfs-stream');
var fs = require("fs");
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var formidable = require("formidable");
//Import the data layer

var mongoose = require('mongoose');
//var config = {
//		mail: require('./config/mail')
//};

var config = null;

//Import documents
var Account = require('./models/Account')(config, mongoose, nodemailer);
var Apartment = require('./models/Apartment')(config, mongoose);


var db = mongoose.db;

app.configure(function () {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/public/views');
    app.use(express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "SocialNet secret key",
        store: new MemoryStore()
    }));
    //mongoose.connect('mongodb://localhost/nodebackbone');
    mongoose.connect("mongodb://shashank.mr.1:shanky316@ds053718.mongolab.com:53718/herokutest");

    AWS.config.loadFromPath('./config.json');
});


var s3 = new AWS.S3();


app.get('/', function (req, res) {
    console.log("call made to '/'");
    res.render('index.jade');
});

app.post('/login', function (req, res) {
    console.log('login request');
    var email = req.param('email', null);
    var password = req.param('password', null);

    console.log('email : ' + email);
    console.log('password : ' + password);

    if (null == email || email.length < 1
        || null == password || password.length < 1) {
        res.send(400);
        return;
    }
    Account.login(email, password, function (success) {
        if (!success) {
            console.log("login failed!");
            res.send(401);
            return;
        }
        console.log('login was successful');
        req.session.loggedIn = true;
        req.session.email = email;
        res.send(200);
    });
});

app.post('/register', function (req, res) {
    console.log('inside register');
    var firstName = req.param('firstName', '');
    var lastName = req.param('lastName', '');
    var email = req.param('email', null);
    var password = req.param('password', null);
    console.log('values received');

    console.log('email : ' + email);
    console.log('password : ' + password);
    console.log('firstName : ' + firstName);
    console.log('lastName : ' + lastName);
    if (null == email || email.length < 1
        || null == password || password.length < 1) {
        console.log('registeration failed');
        res.send(400);
        return;
    }
    Account.register(email, password, firstName, lastName);
    console.log('registeration success');
    res.send(200);
});

app.get('/account/authenticated', function (req, res) {
    console.log('checking for authentication');
    if (req.session.loggedIn) {
        console.log('user authenticated');
        res.send(200);
    } else {
        console.log('user not authenticated');
        res.send(401);
    }
});

app.post('/forgotpassword', function (req, res) {
    var hostname = req.headers.host;
    var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
    var email = req.param('email', null);
    if (null == email || email.length < 1) {
        res.send(400);
        return;
    }
    Account.forgotPassword(email, resetPasswordUrl, function (success) {
        if (success) {
            res.send(200);
        } else {
            // Username or password not found
            res.send(404);
        }
    });
});

app.get('/resetPassword', function (req, res) {
    var accountId = req.param('account', null);
    res.render('resetPassword.jade', {
        locals: {accountId: accountId}
    });
});

app.post('/resetPassword', function (req, res) {
    var accountId = req.param('accountId', null);
    var password = req.param('password', null);
    if (null != accountId && null != password) {
        Account.changePassword(accountId, password);
    }
    res.render('resetPasswordSuccess.jade');
});

// enter apartment address
app.post('/uploadAptAddr', function (req, res) {
    console.log('uploading apartment');
    var houseno = req.param('houseno', null);
    var street = req.param('street', null);
    var aptNo = req.param('aptNo', null);
    var city = req.param('city', null);
    var state = req.param('state', null);
    var zipcode = req.param('zipcode', null);

    console.log('houseno : ' + houseno);
    console.log('street : ' + street);
    console.log('aptNo : ' + aptNo);
    console.log('city : ' + city);
    console.log('state : ' + state);
    console.log('zipcode : ' + zipcode);

    Apartment.uploadAddress(req.session.email, houseno, street, aptNo, city, state, zipcode);

    console.log('upload success');
    res.send(200);
});


// return apartment address
app.get('/uploadAptAddr', function (req, res) {
    console.log('apartment info requested');
    Apartment.getApartmentAddress(req.session.email, function (obj) {
        if (obj) {
            console.log(obj);
            res.json(obj);
        } else {
            console.log("object not found");
            res.send(200);
        }
    });
});

app.post('/uploadAptDetails', function (req, res) {
    console.log('uploading apartment');
    var rent = req.param('rent', '');
    var moveout = req.param('moveout', '');
    var neighbourhood = req.param('neighbourhood', null);
    var bed = req.param('bed', null);
    var bath = req.param('bath', null);
    var headline = req.param('headline', null);
    var desc = req.param('desc', null);

    console.log('email : ' + req.session.email);
    console.log('rent : ' + rent);
    console.log('moveout : ' + moveout);
    console.log('neighbourhood : ' + neighbourhood);
    console.log('bed : ' + bed);
    console.log('bath : ' + bath);
    console.log('headline : ' + headline);
    console.log('desc : ' + desc);


    Apartment.uploadDetails(req.session.email, rent, moveout, neighbourhood, bed, bath, headline, desc);

    console.log('upload success');
    res.send(200);

});

app.get('/uploadAptDetails', function (req, res) {
    console.log('apartment details requested');
    Apartment.getApartmentDetails(req.session.email, function (obj) {
        if (obj) {
            console.log(obj);
            res.json(obj);
        }
    });
});


app.post('/uploadLandlord', function (req, res) {
    console.log('uploading landlord info');

    var name = req.param('name', '');
    var houseno = req.param('houseno', '');
    var street = req.param('street', '');
    var aptNo = req.param('aptNo', null);
    var city = req.param('city', null);
    var state = req.param('state', null);
    var zipcode = req.param('zipcode', null);

    console.log('name : ' + name);
    console.log('houseno : ' + houseno);
    console.log('street : ' + street);
    console.log('aptNo : ' + aptNo);
    console.log('city : ' + city);
    console.log('state : ' + state);
    console.log('zipcode : ' + zipcode);


    Apartment.uploadLandlord(req.session.email, name, houseno, street, aptNo, city, state, zipcode);

    console.log('upload success');
    res.send(200);

});

app.get('/uploadAptDetails', function (req, res) {
    console.log('apartment details requested');
    Apartment.getApartmentDetails(req.session.email, function (obj) {
        if (obj) {
            console.log(obj);
            res.json(obj);
            return;
        }
    });
});

app.post("/uploadImage", function (req, res) {

    /*s3.listBuckets(function (err, data) {
        for (var index in data.Buckets) {
            var bucket = data.Buckets[index];
            console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
        }
    });*/



    console.log("uploading image");

    /*var form = new formidable.IncomingForm();
    console.log("about to parse");

    form.parse(req, function(error, fields, files){

        console.log("parsing done");

        if(error){
            console.log(error);
            res.send(400);
        } else {

            console.log(files);
            console.log(files.upload);

            var filePath = files.upload.path;

            var fileName = uuid.v4();

            //fs.readFile('/Users/shashankmelkote1/Desktop/interior_3.jpeg', function (err, data) {
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    console.warn(err);
                }
                else {
                    console.log("uploading file")
                    var params = {Bucket: 'rentorama', Key: fileName, Body: data};

                    s3.putObject(params, function (err, data) {

                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Successfully uploaded image");
                            Apartment.uploadImage(req.session.email, fileName);
                        }
                    });
                }
            });
        }

    });*/

    console.log("param file : " +JSON.stringify(req.param('file',null)));

    console.log("files output " + JSON.stringify(req.files));

    var filePath = req.files.files[0].path;

    var fileName = uuid.v4();

    console.log("req.files.files[0].path) : ", req.files.files[0].path);



    //fs.readFile('/Users/shashankmelkote1/Desktop/interior_3.jpeg', function (err, data) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.warn(err);
        }
        else {
            console.log("uploading file");
            var params = {Bucket: 'rentorama', Key: fileName, Body: data};

            s3.putObject(params, function (err, data) {

                if (err) {
                    console.log(err)
                } else {
                    console.log("Successfully uploaded image");
                    Apartment.uploadImage(req.session.email, fileName);
                }
            });
        }
    });
});

app.get("/DownloadFile", function (req, res) {

    var downloadParams = {
        Bucket: 'rentorama',
        Key: 'testImg.jpeg',
        ResponseContentType : 'image/jpeg'
    };

    s3.getObject(downloadParams, function (err, data) {

        if (err) {
            console.log(err);
            res.send(400);
        } else {

            console.log("Successfully downloaded data ");
            //res.contentType('image/jpeg');
            res.send(data.Body);
        }
    });
});

app.get('/image/*?', function(req, res){

    console.log("request made to get images");

    var downloadParams = {
        Bucket: 'rentorama',
        Key: 'e86d1bd1-7238-490c-82d4-aa40e295e86d',
        ResponseContentType : 'image/jpeg'
    };

    s3.getObject(downloadParams, function (err, data) {

        if (err) {
            console.log(err);
            res.send(400);
        } else {

            console.log("Successfully downloaded data ");
            //res.send(data.Body, 'binary');
            res.set('Content-Type', 'image/jpeg');
            res.send(data.Body);
        }
    });
});

app.get('/*?', function (req, res) {
    console.log('in default case');
    var url = req.url;
    console.log('request paams are : ' + url);
    var ext = url.substring(url.lastIndexOf("."));
    if (ext === ".png" || ext === ".jpg") {
        res.sendfile(path.resolve('./assets/images' + url));
    }
    if (ext === ".css") {
        res.sendfile(path.resolve('./assets/styles' + url));
    }
});

app.listen(5000);