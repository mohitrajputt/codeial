const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err) {
        console.log('Server failed', err);
    }
    console.log(`Server running on port http://localhost:${port} <- click to visit`);
});
