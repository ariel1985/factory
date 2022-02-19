// Create express app
const express = require("express")
const app = express()
const apiRoutes = require("./routes/api.route")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port (as an env variable)
const HTTP_PORT = process.env.PORT || 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
    // res.json({"message":"Ok"})
    // TODO - redirect to login/home page
    res.send("This page is not found.") 
});

// API endpoints in routes
app.use('/api', apiRoutes);


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});