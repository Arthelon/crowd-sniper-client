const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const bodyparser = require("body-parser")
const dotenv = require("dotenv")
const cors = require('cors');
const io = require('socket.io')(server)
const session = require('express-session');
const liveUpdates = require('./db/models').liveUpdates;
dotenv.config()
liveUpdates(io);

/**
 * Middleware
 */
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

/**
 * Routes
 */
const apiBaseRoute = require("./routes/api");
const apiFeedsRoute = require('./routes/feeds');
const apiTSRoute = require('./routes/ts');
app.use("/api", apiBaseRoute)
app.use("/api/feeds", apiFeedsRoute);
app.use("/api/feeds/ts", apiTSRoute);

/**
 * Error handlers
 */
app.use(function (req, res, next) { //Forward 404 request to handlers
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    if (err.status == 404) {
        res.status(404).json({
            success: false,
            message: "endpoint not found"
        })
    } else {
        next(err)
    }
})
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || 'Internal server error'
    })
    console.log(err)
});

server.listen(process.env.PORT, err => {
    if (err) {
        console.log("Error binding to port:")
        console.log(err)
    } else {
        console.log(`Server listening on port: ${process.env.PORT}`)
    }
})