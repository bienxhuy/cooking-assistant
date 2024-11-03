import express from 'express';

import { engine } from 'express-handlebars';


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
app.get('/', function (req, res) {
    res.render('home', {
        title: 'Cooking Assistant',
    });
});

// Render chat view
function renderChat(req, res) {
    res.render('chat', {
        title: 'Cooking Assistant - Chat',
        style: '/chat.css',
    });
}

// Route get
app.get('/c', renderChat);

// Route post
app.post('/c', function (req, res) {
    console.log(req.body);
    renderChat(req, res); // Gọi hàm render đã tạo
});

app.listen(3030, function () { });
