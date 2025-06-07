import express from 'express';

import { engine } from 'express-handlebars';
import { marked } from 'marked';
import assistantOpenAI from './services/assistant.openAI.js';


const app = express();

// App configuration
app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.urlencoded({
    extended: true
}))

// ROUTING

// Route home
app.get('/', renderChat);

function renderChat(req, res) {
    const messages = assistantOpenAI.getRecentMessages();
    const userInput = marked.parse(messages[0].content ?? '');
    const assistantOutput = marked.parse(messages[1].content ?? '');
    res.render('home', {
        layout: 'main',
        title: 'ChatBot',
        style: '/chat.css',
        userMessage: userInput,
        assistantMessage: assistantOutput
    });
}


// Route post to add message
app.post('/', respond);

async function respond(req, res) {
    console.log("\nRequest body:\n", req.body);
    await assistantOpenAI.addNewUserInput(req.body.userInput);
    const messages = await assistantOpenAI.getRecentMessages();
    res.json({
        userMessage: marked.parse(messages[0].content ?? ''),
        assistantMessage: marked.parse(messages[1].content ?? '')
    });
}



// Listen for access from user
app.listen(3030, function () {
    console.log("App is running on port 3030");
});