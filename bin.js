// Test code

// Assume we have fetched the weather data from somewhere
const weather_data = {
    "New York": { "temperature": "22°C", "condition": "Sunny" },
    "London": { "temperature": "15°C", "condition": "Cloudy" },
    "Tokyo": { "temperature": "25°C", "condition": "Rainy" }
};

// Prepare the chat completion call payload with inline function call result creation
const completion_payload = {
    model: "gpt-4o",
    messages: [
        { role: "system", content: "You are a helpful assistant providing weather updates." },
        { role: "user", content: "Can you tell me the weather in New York, London, and Tokyo?" },
        // Append the original function calls to the conversation
        response.message,
        // Include the result of the function calls
        {
            role: "tool",
            content: JSON.stringify({
                city: "New York",
                weather: weather_data["New York"]
            }),
            // Here we specify the tool_call_id that this result corresponds to
            tool_call_id: response.message.tool_calls[0].id
        },
        {
            role: "tool",
            content: JSON.stringify({
                city: "London",
                weather: weather_data["London"]
            }),
            tool_call_id: response.message.tool_calls[1].id
        },
        {
            role: "tool",
            content: JSON.stringify({
                city: "Tokyo",
                weather: weather_data["Tokyo"]
            }),
            tool_call_id: response.message.tool_calls[2].id
        }
    ]
};

// Call the OpenAI API's chat completions endpoint to send the tool call result back to the model
const response = await openai.chat.completions.create({
    model: completion_payload.model,
    messages: completion_payload.messages
});

// Print the response from the API, which will return something like "In New York the weather is..."
console.log(response);