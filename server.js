const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const mongoose = require('mongoose')
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
app.use('/api/auth', require('./routes/auth.routes'))
app.use(appflex)
app.use(express.static(path.join(__dirname, 'public')))
// simple route


// set port, listen for requests
const PORT = process.env.PORT || 8080;
async function start() {
    try {
    await mongoose.connect('mongodb+srv://Mikita:12341234@flex.shaji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),{
        useNewUrlParser: true,
        useUnifiedTopology :true ,
        useCreateIndex: true
    }



    }catch (e) {
        console.log(`Server Erorr`,e.message)
        process.exit(1)
    }
}
start()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});