'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var HBS = _interopDefault(require('express-handlebars'));
var path = _interopDefault(require('path'));

// "express-handlebars"

const app = express();
app.engine('hbs', HBS({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.resolve(`${__dirname}/templates/layouts`),
}));
app.set('views', path.resolve(`${__dirname}/templates`));
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});