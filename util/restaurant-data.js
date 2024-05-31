const fs = require('node:fs')
const path = require('node:path')

const path_appdata = path.join(__dirname, "..", "app-data.json");

function getStoredRestaurants() {

    const restaurants = JSON.parse(fs.readFileSync(path_appdata));

    return restaurants;
}

function addRestaurant(restaurant) {
    const restaurants = getStoredRestaurants();

    restaurants.push(restaurant);

    fs.writeFileSync(path_appdata, JSON.stringify(restaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    addRestaurant: addRestaurant
}