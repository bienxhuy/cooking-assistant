import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1446603/card',
    params: {
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
  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }