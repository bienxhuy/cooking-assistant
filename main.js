import express from 'express';

import { engine } from 'express-handlebars';

const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.render('home', {
        title: 'Cooking Assistant',
    })
});

app.get('/c', function (req, res) {
    res.render('chat', {
        title: 'Cooking Assistant - Chat',
        style: '/chat.css',
    })
});

app.listen(3030, function() {});
