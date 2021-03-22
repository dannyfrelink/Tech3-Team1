const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;

let db;

MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.log('MongoDB Error:' + err);
	} else {
		db = client.db(process.env.DB_NAME);
		console.log('Connectie gelukt');
	}
});

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  let like = {}
  like = await db.collection('profile').find({}).toArray();
  if (req.body.like != true){
    like = await db.collection('profile').update({"like":false}, {$set:{"like":true}});
    console.log("whoop");
  }
  res.render('explore', {
    title:'Likes & Matches'
  });
})

app.get('/likes', async (req, res) => {
    let people = {}
    people = await db.collection("profile").find({like:true}).toArray();
    res.render('like', {
      title:'Likes & Matches',
      results: people.length,
      people
    });
});

app.use(function (req, res, next) {
	res.status(404).send("Sorry can't find that page")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});