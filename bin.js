

const request = require('request');

const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1446603/card',
    qs: {
        mask: 'ellipseMask',
        backgroundImage: 'background1',
        backgroundColor: 'ffffff',
        fontColor: '333333'
    },
    headers: {
        'x-rapidapi-key': '6bac4df34cmshf9865ec8b990d1ap19e754jsn77f1a19baa1b',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});