const express = require('express'); //import module
const app = express(); //create express application


//route handlers
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/random/:profileId', (req, res) => {
    res.send(`<h2>Detailpage of ${req.params.profileId} </h2>`);
});

app.get('/chat', (req, res) => {
    res.send('My matches');
});

app.get('/profile', (req, res) => {
    res.send('My profile');
});

app.get('/chat', (req, res) => {
    res.send('My matches');
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry, can't find that!")
})

app.listen(3000, () => {
    console.log('Express web app on localhost:3000');
});