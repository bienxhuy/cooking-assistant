export default {
    // Return a list of meals but only has 1 element, which has full details of a meal equivalent to provided meal ID
    async lookupFullMealDetailsById(mealID) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return filterMealDetails(data.meals[0]);
    },

    // Return bunch of meals has 'name' in their names, each one has full details
    async searchMealsByName(name) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.meals.map(element => {
            return filterMealDetails(element);
        })
    },

    // Return a list of meals but only has 1 element, which has full details of a random meal
    async lookupASingleRandomMeal() {
        const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return filterMealDetails(data.meals[0]);
    },

    // Return a list of all categories, each one has name only
    async listAllMealCategories() {
        const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.meals;
    },

    // Return a list of meals belong to provided category, each one has: meal name, meal ID, meal thumbnail
    async filterByCategory(category) {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.meals;
    },

    // Return a list contains all areas, each one has only area name
    async listAllAreas() {
        const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.meals;
    },

    // Return a list contains all meals belong to provided area, each one has: meal name, meal ID, meal thumbnail
    async filterByArea(area) {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`; // Thêm URL tương ứng ở đây
        // Fetch data from url
        const response = await fetch(url);
        // Parse data
        const data = await response.json();

        // Error check
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.meals;
    }
};



// Filter important fields of a meal detail
function filterMealDetails(meal) {
    // Filter out needed fieldss
    const filteredMeal = {
        name: meal.strMeal,
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        youtubeLink: meal.strYoutube,
        ingredients: [],
        measures: []
    };

    // Filter out redundant ingredients and measures
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
            filteredMeal.ingredients.push(ingredient);
            filteredMeal.measures.push(measure);
        }
    }

    return filteredMeal;
};