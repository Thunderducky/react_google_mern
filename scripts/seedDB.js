const mongoose = require('mongoose')
const User = require("../models/user")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-google-mern")

const testUser = {
    email: "test@test.com",
    password: "testtest"
}
// Remove all of our users and then try and make a new one
User.remove({}).then(() => {
    User.create(testUser).then(user => {
        console.log(user)
        return user.checkPassword(testUser.password)
    }).then(result => {
        console.log(result)
        mongoose.connection.close()
    })
})