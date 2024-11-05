import OpenAI from "openai";
const openai = new OpenAI();
let conversationMessages = [];

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
        // createChatRequest(userInput);
    },
};

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
    });

    console.log(completion.choices[0].message);

    // Add API response to conversation
    conversationMessages.push({
        role: "assistant",
        content: `${completion.choices[0].message.content}`,
    });
};