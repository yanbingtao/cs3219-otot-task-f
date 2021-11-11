// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

const axios = require("axios")
const cors = require("cors")
const Redis = require('redis')
app.use(cors())

const redisClient = Redis.createClient()

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Database connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Home Page, /api to api request'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Currently running RESTful API on port " + port);
});

const DEFAULT_EXPIRATION = 10000

app.get("/api/redis/contacts", async (req, res) => {

    const name = req.query.name

    redisClient.get('names', async(error, names) => {
        if(error) { console.error(error); }
        if (names != null) {
            console.log("Cache hit!")
            return res.json(JSON.parse(names))
        } else {
            console.log("Cache miss!")
            const { data } = await axios.get(
                "http://localhost:8080/api/contacts",
                { params: {name}}
            )
        
            redisClient.setex('names', DEFAULT_EXPIRATION, JSON.stringify(data))
            res.json(data)
        }
    })
    
})