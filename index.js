const express = require("express");
const routes = require("./routes/api");

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
}



// setup express app
const app = express();
app.use(allowCrossDomain);
app.use("/api", routes);



app.listen(process.env.port || 4000, function(req, res) {
    console.log("App runs at Port 4000");
})