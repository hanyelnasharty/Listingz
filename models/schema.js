const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListingSchema = new Schema({
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
    },
    unitType: {type: String},
    rooms: {type: String},
    bathrooms: {type: String},
    space: {type: String},
    price: {type: String},
    description: {type: String},
    imgs: {
        img1: String,
        img2: String,
        img3: String,
        img4: String,
        img5: String
    },
    listingType: {type: String},
    contact: {
        phone: String,
        email: String,
    }
})

const ListingModel = mongoose.model('ListingModel', ListingSchema)
module.exports = ListingModel