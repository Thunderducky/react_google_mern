const express = require('express')

const app = express();
const PORT = process.env.PORT || 3001

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// API ROUTES GO HERE

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => console.log(`I am listening... (on port ${PORT})`))