export default [
    {
        type: "function",
        function: {
            name: "lookup_full_meal_details_by_id",
            description: "Retrieve full details of a meal by its ID, including its name, instructions, image, guide video, ingredients, and equivalent measures.",
            parameters: {
                type: "object",
                properties: {
                    mealID: {
                        type: "string",
                        description: "The unique ID of the meal."
                    }
                },
                required: ["mealID"],
                additionalProperties: false,
            }
        }
    },
    {
        type: "function",
        function: {
            name: "search_meals_by_name",
            description: "Search for all meals that contain the given name. Each meal contains name, instructions, image, guide video, ingredients, and equivalent measures.",
            parameters: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "The name or part of the name of the meal to search for."
                    }
                },
                required: ["name"],
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "lookup_single_random_meal",
            description: "Retrieve full details of a random meal, including its name, instructions, image, guide video, ingredients, and equivalent measures.",
            parameters: {
                type: "object",
                properties: {},
                required: [],
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "list_all_meal_categories",
            description: "Retrieve a list of all meal categories or kind of foods. This function returns the names of categories.",
            parameters: {
                type: "object",
                properties: {},
                required: [],
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "filter_meals_by_category",
            description: "Retrieve a list of meals that belong to a specific category. Each meal will include its name, ID, and thumbnail image.",
            parameters: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        description: "The category of meals to filter by."
                    }
                },
                required: ["category"],
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "list_all_areas",
            description: "Retrieve a list of all areas. Each area contains only its name.",
            parameters: {
                type: "object",
                properties: {},
                required: [],
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "filter_meals_by_area",
            description: "Retrieve a list of meals that belong to a specific area. Each meal will include its name, ID, and thumbnail image.",
            parameters: {
                type: "object",
                properties: {
                    area: {
                        type: "string",
                        description: "The area to filter meals by."
                    }
                },
                required: ["area"],
                additionalProperties: false
            }
        }
    }
]
