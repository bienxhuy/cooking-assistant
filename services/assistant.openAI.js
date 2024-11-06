export default {
    getRecentMessages() {
        // Return defaut message at start
        if (conversationMessages.length < 2) {
            return [
                { role: "user", content: "Hi!" },
                { role: "assistant", content: "Hi! How can I help you?" },
            ];
        }
        // Return recent messages
        return conversationMessages.slice(-2);
    },

    async addNewUserInput(userInput) {
        await createChatRequest(userInput);
    },
};

import OpenAI from "openai";
import tools from "./tools";

const openai = new OpenAI();

// Store chat history
let conversationMessages = [{
    role: "system", 
    content: "You are a helpful cooking assistant. Always use the provided tools when specific cooking instructions or recipes are needed, but only call functions when necessary to ensure accuracy."
}];

async function createChatRequest(message) {
    // Push user message
    conversationMessages.push({
        role: "user",
        content: message,
    });

    // Make a call to API
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: conversationMessages,
        tools: tools,
        tool_choice: "required",
    });

    console.log(completion.choices[0].message);

    // Add API response to conversation
    conversationMessages.push({
        role: "assistant",
        content: `${completion.choices[0].message.content}`,
    });
};