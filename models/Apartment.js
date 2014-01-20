/**
 * New node file
 */

module.exports = function (config, mongoose) {
    var crypto = require('crypto');

    // define user account schema
    var ApartmentSchema = new mongoose.Schema({
        email: { type: String, unique: true },
        address: {
            houseno: { type: Number, min: 1, required: true },
            street: {type: String, required: true},
            aptNo: { type: String, required: false },
            city: { type: String },
            state: { type: String },
            zipcode: { type: Number }
        },
        bath: { type: Number },
        bed: { type: Number },
        rent: { type: Number },
        moveout: { type: String },
        neighbourhood: { type: String },
        headline: { type: String },
        desc: { type: String },
        landlord: {
            name: { type: String },
            houseno: { type: Number},
            street: {type: String},
            aptNo: { type: String},
            city: { type: String },
            state: { type: String },
            zipcode: { type: Number },
            contactnumber: { type: Number }
        },
        img: { type: [String] }
    });

    // define account model
    var Apartment = mongoose.model('Apartment', ApartmentSchema);

    // define callback method
    var registerCallback = function (err) {
        if (err) {
            return console.log(err);
        }
        ;
        return console.log('apartment was uploaded');
    };

    // define method to upload apartment address
    var uploadAddress = function (email, houseno, street, aptNo, city, state, zipcode) {

        Apartment.update({email: email}, {
            $set: {
                "address.houseno": houseno,
                "address.street": street,
                "address.aptNo": aptNo,
                "address.city": city,
                "address.state": state,
                "address.zipcode": zipcode
            }
        }, {upsert: true}, function (err, numberAffected, raw) {
            if (err) {
                console.log("error in update");
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
        });
    };

    var uploadDetails = function (email, rent, moveout, neighbourhood, bed, bath, headline, desc) {

        Apartment.update({email: email}, {
            $set: {
                rent: rent,
                moveout: moveout,
                neighbourhood: neighbourhood,
                bed: bed,
                bath: bath,
                headline: headline,
                desc: desc
            }
        }, {upsert: true}, function (err, numberAffected, raw) {
            if (err) {
                console.log("error in update");
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
        });

    };

    var uploadLandlord = function (email, name, houseno, street, aptNo, city, state, zipcode) {

        Apartment.update({email: email}, {
            $set: {
                "landlord.name": name,
                "landlord.houseno": houseno,
                "landlord.street": street,
                "landlord.aptNo": aptNo,
                "landlord.city": city,
                "landlord.state": state,
                "landlord.zipcode": zipcode
            }
        }, {upsert: true}, function (err, numberAffected, raw) {
            if (err) {
                console.log("error in update");
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
        });

    };

    var uploadImage = function (email, imgName) {

        Apartment.update({email: email},
            { $push: {
                "img": imgName
            }
            }, {upsert: true}, function (err, numberAffected, raw) {
                if (err) {
                    console.log("error in update");
                }
                console.log('The number of updated documents was %d', numberAffected);
                console.log('The raw response from Mongo was ', raw);
            });
    };

    var getApartmentAddress = function (email, callback) {

        Apartment.findOne({email: email}, function (err, doc) {
            callback(doc);
        });
    };

    var getApartmentDetails = function (email, callback) {

        Apartment.findOne({email: email}, function (err, doc) {
            callback(doc);
        });
    };

    // define return routes
    return {
        uploadAddress: uploadAddress,
        uploadDetails: uploadDetails,
        uploadLandlord: uploadLandlord,
        uploadImage : uploadImage,
        getApartmentAddress: getApartmentAddress,
        getApartmentDetails: getApartmentDetails,
        Apartment: Apartment
    };
};