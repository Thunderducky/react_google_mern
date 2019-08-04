// const mongoose = require('mongoose')
// const User = require("./models/user")

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-google-mern")

// const testUser = {
//     email: "test@test.com",
//     password: "testtest"
// }
// // Remove all of our users and then try and make a new one
// User.remove({}).then(() => {
//     User.create(testUser).then(user => {
//         console.log(user)
//         return user.checkPassword(testUser.password)
//     }).then(result => console.log(result))
// })

const express = require('express')
const PORT = 3001;
const app = express();

const axios = require("axios");
// Let's get that first code first :p


app.get("/api/google/callback", (req, res) => {
    console.log(res.json())
})
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: "http://localhost:3001/api/google/callback",
}

app.listen(PORT, () => {
    console.log('I am listening...')
    // Send out the original request
})