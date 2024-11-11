import OpenAI from "openai";
import toolNames from "./tools.js";
import toolFuctions from "./function.js";


const openai = new OpenAI();
// Storing conversation
let conversationMessages = [{
    role: "system",
    content: "You are a helpful cooking assistant. Always use the supplied tools when specific cooking instructions or any food suggestions are needed. If you can't find any recipes that meet the user's needs, just say 'I don't know.'. Refuse to answer all non-cooking related questions. Meal should be described when it's suggested. You can use your knowledge to describe meals if it doesn't have description. You don't have to strictly give the user instructions, you can modify to make your guidance more friendly. Always estimate the spices and ingredients when giving detailed instructions. You should respond in paragraphs. You shouldn't use any special characters to highlight text or bold text like '*' or '#'. When including images, always place them inside HTML tag <img> properly. When including guide videos, always place them inside HTML tag <a> properly."
}];
// Storing most recent user message
let recentUserMessage = "";

export default {
    // Return recent user input and LLM output
    getRecentMessages() {
        if (conversationMessages.length < 2) {
            return [
                { role: "user", content: "Hi!" },
                { role: "assistant", content: "Hi! How can I help you?" },
            ];
        }

        return [
            { role: "user", content: recentUserMessage },
            {
                role: "assistant",
                content: conversationMessages[conversationMessages.length - 1].content.replace(/\n/g, '<br>'),
            },
        ];
    },
    
    async addNewUserInput(userInput) {
        // Update recent user message
        recentUserMessage = userInput;

        // Store user message to history
        conversationMessages.push({
            role: "user",
            content: userInput,
        });

        // Create chat request to LLM
        await createChatRequest(userInput);
    }
}

// Make a call to LLM
async function createChatRequest(message) {
    try {
        // Loop while still have tool call
        while (true) {

            // Make a call after receive user input or after process called function
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: conversationMessages,
                tools: toolNames,
            });

            // Storing result of model to history
            conversationMessages.push(completion.choices[0].message);
            // Tracking conversation on server console
            console.log("\nModel response:\n", completion.choices[0].message);

            // Check for tool call
            if (completion.choices[0].finish_reason === "tool_calls") {

                // For each tool call
                for (const element of completion.choices[0].message.tool_calls) {
                    // Parse agurment and get the function
                    const functionName = element.function.name;
                    const argument = element.function.arguments ? JSON.parse(element.function.arguments) : {};

                    // Track on server
                    console.log(`\nFunction called: ${functionName}\nArguments: ${element.function.arguments}`);

                    // Process function
                    const functionResult = await processFunction(functionName, argument);

                    // Pack result into a message
                    const toolResult = {
                        role: "tool",
                        content: JSON.stringify(functionResult),
                        tool_call_id: element.id,
                    };

                    // Save that message to conversation history
                    conversationMessages.push(toolResult);
                    // Tracking conversation on server console
                    console.log("\nResponse to model:\n", toolResult);
                }
            }
            else {
                // No tool is called
                break;
            }
        }

    } catch (error) {
        console.error("\nError fetching response from OpenAI:", error);
    }
}

async function processFunction(functionName, argument) {
    switch (functionName) {
        case "list_all_areas":
            return await toolFuctions.listAllAreas();
        case "filter_meals_by_area":
            return await toolFuctions.filterByArea(argument.area);
        case "list_all_meal_categories":
            return await toolFuctions.listAllMealCategories();
        case "filter_meals_by_category":
            return await toolFuctions.filterByCategory(argument.category);
        case "lookup_single_random_meal":
            return await toolFuctions.lookupASingleRandomMeal();
        case "lookup_full_meal_details_by_id":
            return await toolFuctions.lookupFullMealDetailsById(argument.mealID);
        case "search_meals_by_name":
            return await toolFuctions.searchMealsByName(argument.name);
        default:
            throw new Error(`\nUnknown function name: ${functionName}`);
    }
    return {};
}