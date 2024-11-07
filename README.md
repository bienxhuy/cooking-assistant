# Cooking Assistant
The goal of this project is to build a culinary helper bot using tool and function calls.  **Cooking Assistant** is an application designed to help users discover recipes based on ingredients they already have. We hope this will help users find creative recipes to try in their kitchen.

# Overview
In this project, we use `node.js` to desmonstrate the output of the LLM, which is an `OpenAI` model, `gpt-4o-mini`.
For the API we used to allow the LLM to search for information about recipes, we can get it at https://www.themealdb.com/api.php. It is a free recipe API support.

# Installation
1. Clone the current repository
   ```
   git clone https://github.com/leonart-delux/cooking-assistant.git 
   ```
2. Enter the project root directory
   ```
   cd cooking-assistant
   ```
3. Set up environment variables
   Add your Open AI API key to environment variables in your root device.
   ```
   OPENAI_API_KEY=your Open AI api key
   ```
4. Run project
   ```
   npm start
   ```
   The server should start running at http://localhost:3030/c

# Tool & function calling
## Introduction

When working with LLMs to develop applications that require specific, reliable data retrieval—such as retrieving recipe information, using **tools and function calling** offers distinct advantages over relying solely on direct LLM responses. 

### 1. Improved accuracy and reliability

LLMs are highly capable at generating natural language responses, but they may not always retrieve precise or up-to-date information, especially when interacting with structured data or APIs. By using tools and function calling:

- **We retrieve exact data** from verified sources and APIs, minimizing the risk of inaccuracies that can arise from general LLM responses.
- **We ensure consistency**, as the model relies on trusted functions or APIs rather than generating answers based solely on training data.

### 2. Better control over data handling

Function calling allows for fine-tuned control over how data is processed and used in the application. With function calling, we can:

- **Specify data formats** directly, ensuring uniformity in responses, which is particularly useful when presenting recipe ingredients, steps, or nutrition data.
- **Implement custom logic** that fits our project requirements, enabling specialized actions such as ingredient substitution, nutrition calculation, or cuisine-based filtering that may not be supported by direct LLM interaction.

### 3. Understanding token usage

Functions are injected into the model’s system message in a syntax the model recognizes, meaning that they count toward the model’s context limit and are billed as input tokens. Using tools & function calling can manage token limits effectively by:

- **Limit the number of functions** or **shorten descriptions** for function parameters if you approach token limits.
- **Consider fine-tuning** if you have a large number of functions, as this can help reduce the token usage associated with your tool specifications.

## How it worked
![tools&functioncalling](images/flow.png)

# Works in our project
## Function
In this session we will pick a function from `services\function.js` to show the detail:
```
lookupFullMealDetailsById(mealID) {
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
```
The `lookupFullMealDetailsById` function is designed to fetch and filter detailed information about a meal from the external API `https://www.themealdb.com/api.php`. The function takes a single parameter, `mealID`, and retrieves detailed meal information such as name, instructions, ingredients, and other related data from the API. 
## Tools
You can explore our prebuild tools in `services\tools.js`. To easy understand, we will get a tool related to function above:
```
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
```
### 1. **Type Specification**:
To specifies that this is a function call, we use `type: "function"` . In the context of LLMs, when the system sees type `function`, it understands that the request requires executing an external function to complete the task.
### 2. **Details**:
Function Name and Description:
- `name: "lookup_full_meal_details_by_id"`: This is the name of the function defined, used to identify and call. When above tool is use, it will call this function.
- `description`: Provides a description of the function's purpose. In this case, the function is used to retrieve detailed information about a meal via its `mealID`, including the meal name, instructions, image, guide video, ingredients, and equivalent measures.
### 3. **Parameters**:
Parameter Definition:
- In `parameters`, an object `properties` is declared to describe the parameters that the function requires. In thi case, this function requires only one parameter: `mealID`  `string` parameter, representing the unique ID of the meal whose details are being requested.

Required Parameters:
- `required: ["mealID"]`: Ensures that `mealID` is a required parameter when calling this function.

Restriction on Additional Parameters:
- `additionalProperties: false`: This prevents adding any unspecified parameters to the function call.

# Demo
Let start with a basic prompt
![user-input](images/user-input.png)
Result will be
![llm-output](images/llm-output.png)
Let break down how the data is processed, step by step:
1. User input
   ```
   Request body:
    { userInput: 'i want to make a meal with chicken' }
   ```
2. Model response
   ```
   Model response:
    {
        role: 'assistant',
        content: null,
        tool_calls: [
            {
            id: 'call_GwXw1i8aOi5frv24rXGGpCBz',
            type: 'function',
            function: [Object]
            }
        ],
        refusal: null
    }
   ```
`role: 'assistant'`: This indicates that the response is from the assistant, meaning this is the result returned by the model.

`content: null`: This is set to `null`, meaning no text content is returned in this response. This is typical when the system performs an action (such as calling a function) without needing to return immediate textual data.

`tool_calls`: This section describes the tools that the system called during the request processing. With `id` is a unique identifier for the tool call. `Type` to indicates that the system executed an external function to complete the task. `function` signifies that an object function was called, but the specific details about the function are not provided in this part of the response. 

`refusal: null`: This is `null`, meaning there is no refusal in the response. It indicates that the request was processed successfully without any errors or refusals.

A log to keep track easier:
```
    Function called: search_meals_by_name
    Arguments:{"name":"chicken"}
```
3. Response to model
```
Response to model:
 {
  role: 'tool',
  content: `[{"name":"Chicken Handi",...minutes and check again.","image":"`... 26380 more characters,
  tool_call_id: 'call_GwXw1i8aOi5frv24rXGGpCBz'
}
```
Because the response is very long so we decided to remove the content in the middle. We can see that `tool_call_id` is exactly the same of the model response. The role value of `'tool'` indicates that this response originates from an external tool or automated system, rather than directly from the user or LLM itself. This role designation shows that the response content has been fetched from a tool, such as an API or another automated system that processes or retrieves the necessary information based on the user's request.
4. Model response
```
Model response:
 {
  role: 'assistant',
  content: 'Here are some delicious chicken meal options you can try:\n' +
    '\n' +
    "1. **Chicken Handi**: This flavorful dish features marinated chicken cooked in a blend of spices, onions, tomatoes, and a creamy yogurt sauce. The chicken is simmered until tender and served with naan or rotis. It's a rich and aromatic meal with a touch of heat from the spices.\n" +
    '\n' +
    '   ![](https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg)\n' +
    '   [Watch the recipe here](https://www.youtube.com/watch?v=IO0issT0Rmc)\n' +
    '\n' +
    "2. **Chicken Congee**: A comforting rice porridge dish that's perfect for breakfast or a light meal. Marinated chicken is cooked with rice in a flavorful broth, creating a warm and soothing dish topped with green onions and ginger. \n" +
    '\n' +
    '   ![](https://www.themealdb.com/images/media/meals/1529446352.jpg)\n' +
    '   [Watch the recipe here](https://www.youtube.com/watch?v=kqEfk801E94)\n' +
    '\n' +
    '3. **Chicken Karaage**: This is a flavorful Japanese fried chicken dish. The chicken pieces are marinated in ginger, garlic, and soy sauce, coated in potato starch, and deep-fried until crispy. It’s typically served with lemon wedges for a refreshing contrast.\n' +
    '\n' +
    '   ![](https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg)\n' +
    '   [Watch the recipe here](https://www.youtube.com/watch?v=XivddFddthc)\n' +
     '4. **Chicken Marengo**: A rustic chicken dish cooked with mushrooms and olives, simmered in a rich tomato sauce. It’s a hearty meal perfect for serving with pasta or mashed potatoes. \n' +
    '\n' +
    '   ![](https://www.themealdb.com/images/media/meals/qpxvuq1511798906.jpg)\n' +
    '   [Watch the recipe here](https://www.youtube.com/watch?v=U33HYUr-0Fw)\n' +
    '\n' +
    '5. **Tandoori Chicken**: Chicken thighs are marinated in a mixture of yogurt and spices, then grilled until charred and juicy. This vibrant dish is often served with naan and a fresh salad, offering a perfect balance of flavors. \n' +
    '\n' +
    '   ![](https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg)\n' +
    '   [Watch the recipe here](https://www.youtube.com/watch?v=-CKvt1KNU74)\n' +
    '\n' +
    'If any of these options pique your interest, let me know, and I can give you further details or assist you with anything else!',
  refusal: null
}
```
And here is the final output, after interprets the tool's response, the model sends final response back to the users.
