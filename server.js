require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001
const passport = require('./config/passport.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.use(session({secret: process.env.SESSION_SECRET || "the cat ate my keyboard", resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

// API ROUTES GO HERE
app.post('/api/login', passport.authenticate("local"),  (req, res) => {
    res.json(req.user)
})

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-google-mern")

app.listen(PORT, () => console.log(`I am listening... (on port ${PORT})`))