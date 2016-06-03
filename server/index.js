// import path from 'path';
// import express from 'express';
// import HBS from 'express-handlebars';
// import compression from 'compression';
// const app = express();
// const port = 7000;
//
// app.engine('hbs', HBS({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     layoutsDir: path.resolve(`${__dirname}/templates/layouts`),
// }));
// console.log(`dir + ${__dirname}`);
// app.set('views', path.resolve(`${__dirname}/templates`));
// app.set('view engine', 'hbs');
// //app.use(compression());
// // app.use(express.static(`${__dirname}/../build/`));
// app.get('/', function (req, res) {
//     console.log('res', req, res);
//     res.render('index');
// });
// app.listen(port, (error) => {
//     console.log('Server is listening');
//     if (error) {
//         console.error('error',error);
//     } else {
//         console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
//     }
// });
//
'use strict';

import express from 'express';
import HBS  from 'express-handlebars';
import path from 'path'; // "express-handlebars"

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