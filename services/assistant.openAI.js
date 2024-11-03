import OpenAI from "openai";

export default { 
    getRecentMessages() {
        return [
            { role: "user", message: "Hi." },
            { role: "assistant", message: "Hi! How can I help you?" },
        ];
    },

    newUserInput() {

    },
};

