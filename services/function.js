export default {
    // 1. Return all ingredients, each one has: name and description
    async listAllIngredients() {

    },

    // 2. Return a list of meals has the ingredient, each one has: meal name, meal ID, meal thumbnail
    async filterByMainIngredient(ingredient) {

    },

    // 3. Return a list of meals but only has 1 element, which has full details of a meal equivalent to provided meal ID
    async lookupFullMealDetailsById(mealID) {

    },

    // 4. Return bucnh of meals has 'name' in their names,  each one has full details
    async searchMealsByName(name) {

    },

    // 5. Return a list of meals but only has 1 element, which has full details of a random meal
    async lookupASingleRandomMeal() {

    },

    // 6. Return a list of all categories, each one has: category name, category thumbnail, category description 
    async listAllMealCategories() {

    },

    // 7. Return a list of meals belong to provided category, each one has: meal name, meal ID, meal thumbnail
    async filterByCategory(category) {

    },

    // 8. Return a list named meals, but contains all areas, each one has only area name
    async listAllAreas() {

    },

    // 9. Return a list named meals but contains all meals belong to provided area, each one has: meal name, meal ID, meal thumbnail
    async filterByArea(area) {
        
    }
};