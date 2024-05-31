const { getStoredRestaurants, addRestaurant } = require('../util/restaurant-data')
const uuid = require('uuid')
const express = require("express")

const router = express.Router()

router.get('/recommend', (req, res) => {
    res.render('recommend')
})

router.post('/recommend', (req, res) => {
    const restaurant = {
        id: uuid.v4(),
        name: req.body.name,
        address: req.body.address,
        cuisine: req.body.cuisine,
        website: req.body.website,
        description: req.body.description
    }

    addRestaurant(restaurant);

    res.redirect('/confirm')
})

router.get('/restaurants', (req, res) => {
    let order = req.query.order;
    const restaurants = getStoredRestaurants();
    const length = restaurants.length;

    if (order) {
        if (order == "asc") {
            restaurants.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }

                return -1;
            })

        } else if (order == "desc") {
            restaurants.sort((a, b) => {
                if (b.name > a.name) {
                    return 1;
                }

                return -1;
            })
        }
    }

    res.render('restaurants', { length: length, restaurants: restaurants })
})

router.get('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    const restaurants = getStoredRestaurants()

    for (const restaurant of restaurants) {
        if (restaurant.id === id) {
            return res.render('restaurant-detail', { restaurant: restaurant })
        }
    }

    res.status(404).render('404')
})

module.exports = router;