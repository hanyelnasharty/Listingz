const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const Listing = require('./models/listing.js');
const ListingModel = require('./models/schema.js')

app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost:27017/listingz').then(() => {
    console.log('connection with mongo established');
})

app.listen(3000, () => {
    console.log('listening');
})

// SEED ROUTE
// app.get('/seed', (req, res) => {
//     ListingModel.create(Listing).then((data) => {
//         res.send(data)
//     })
// })

// HOME
app.get('/', (req, res) => {
    res.render('home.ejs')
})


// INDEX
app.get('/browse', (req, res) => {
    ListingModel.find({}).then((listing) => {
        res.render('index.ejs', { data: listing })})
    });

//NEW
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

// SHOW
app.get('/:id', (req, res) => {
    ListingModel.findById(req.params.id).then((listing) => {
    res.render('show.ejs', { data: listing })
    })
})

// CREATE
app.post('/browse', (req, res) => {
    console.log('data ', req.body);
    const newListing = {
        address: {},
        unitType: {},
        rooms: {},
        bathrooms: {},
        space: {},
        price: {},
        description: {},
        imgs: {},
        listingType: {},
        contact: {},
        }
        newListing.address.street = req.body.street
        newListing.address.city = req.body.city
        newListing.address.state = req.body.state
        newListing.address.zipcode = req.body.zipcode
        newListing.unitType = req.body.unitType
        newListing.rooms = req.body.rooms
        newListing.bathrooms = req.body.bathrooms
        newListing.space = req.body.space
        newListing.price = req.body.price
        newListing.description = req.body.description
        newListing.imgs.img1 = req.body.img1
        newListing.imgs.img2 = req.body.img2
        newListing.imgs.img3 = req.body.img3
        newListing.imgs.img4 = req.body.img4
        newListing.imgs.img5 = req.body.img5
        newListing.listingType = req.body.listingType
        newListing.contact.phone = req.body.phone
        newListing.contact.email = req.body.email
        
    ListingModel.create(newListing).then(((createdListing) => {
        res.redirect('/browse')
}))
})

// DELETE
app.delete('/:id', (req, res) => {
    ListingModel.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/browse')
    })
})

// EDIT
app.get('/:id/edit', (req, res) => {
    ListingModel.findById(req.params.id).then((selectedListing) => {
        res.render('edit.ejs', {
            data: selectedListing
        })
    })
})

// UPDATE
app.put('/:id', (req, res) => {
    const newListing = {
        address: {},
        unitType: {},
        rooms: {},
        bathrooms: {},
        space: {},
        price: {},
        description: {},
        imgs: {},
        listingType: {},
        contact: {},
        }
        newListing.address.street = req.body.street
        newListing.address.city = req.body.city
        newListing.address.state = req.body.state
        newListing.address.zipcode = req.body.zipcode
        newListing.unitType = req.body.unitType
        newListing.rooms = req.body.rooms
        newListing.bathrooms = req.body.bathrooms
        newListing.space = req.body.space
        newListing.price = req.body.price
        newListing.description = req.body.description
        newListing.imgs.img1 = req.body.img1
        newListing.imgs.img2 = req.body.img2
        newListing.imgs.img3 = req.body.img3
        newListing.imgs.img4 = req.body.img4
        newListing.imgs.img5 = req.body.img5
        newListing.listingType = req.body.listingType
        newListing.contact.phone = req.body.phone
        newListing.contact.email = req.body.email

    ListingModel.findByIdAndUpdate(req.params.id, newListing, {new:true}).then(() => {
        res.redirect('/browse')
      })
    })