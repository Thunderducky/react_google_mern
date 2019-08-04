require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001
const passport = require('./config/passport.js')
const { google } = require('googleapis')

//let clientHost = "localhost:3000"

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: "http://localhost:3000/api/google/callback",
}

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email'
]

function createConnection(){
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    )
}
const googleConnection = createConnection();

function getGoogleAccountFromCode(code){
    return googleConnection.getToken(code).then(data => Promise.resolve(data.tokens))
}

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope
    });
  }

app.use(express.urlencoded({extended:false}))
app.use(express.json())

if(true || process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.use(session({secret: process.env.SESSION_SECRET || "the cat ate my keyboard", resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

// API ROUTES GO HERE
app.post('/api/login', passport.authenticate("local"),  (req, res) => {
    res.json(req.user)
})

app.get("/api/google/url", (req, res) => {
    res.json({ url: getConnectionUrl(googleConnection)})
})

// We'll have to manually log in the user after we find them
// http://www.passportjs.org/docs/login/
// we'll just allow for that other page login, so it'll be full redirects I suppose at that point

// This is where we add the authorization stuff from here I guess
app.post('/api/google/code', (req, res) => {
    console.log(req.body)
    console.log("CODE RECEIVED");
    getGoogleAccountFromCode(req.body.code).then(tokens => {
        console.log(tokens)
        const userConnection = createConnection();
        userConnection.setCredentials(tokens)
        userConnection.getTokenInfo(tokens.access_token).then(response => console.log(response))
        console.log(userConnection.credentials)
        // res.json(tokens)
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    }).catch((errors) => {
        console.log(errors)
        console.log(errors.response.data)
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    })
    // return the page
})


app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-google-mern")

app.listen(PORT, () => console.log(`I am listening... (on port ${PORT})`))