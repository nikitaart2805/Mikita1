const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const exphbs = require('express-handlebars')

const app = express();
const appflex =require ('./routes/appflex')
var corsOptions = {
    origin: "http://localhost:8081"
};
const hbs = exphbs.create({
    defaultLayout: 'main' ,
    extname : 'hbs'
})

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs',hbs.engine)
app.set('view engine' , 'hbs')
app.set('views', 'views')
app.use(appflex)
app.use(express.static(path.join(__dirname, 'public')))
// simple route

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});