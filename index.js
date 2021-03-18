const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/likes', (req, res) => {
    res.render('like', {title:'Likes & Matches'})
});

app.use(function (req, res, next) {
	res.status(404).send("Sorry can't find that page")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});