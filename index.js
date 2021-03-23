<<<<<<< HEAD
const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const { ObjectID } = require('mongodb');

=======
const express = require('express'); 
const app = express(); 
const port = 3000;
const dotenv = require('dotenv').config();
const {MongoClient} = require('mongodb');
const bodyParser = require("body-parser");
>>>>>>> mandemt
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
<<<<<<< HEAD

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  let users = {}
  users = await db.collection('profile').find({}).toArray();
  res.render('explore', {
    title:'Likes & Matches',
    users
  });
})

app.post('/like.ejs', (req, res) => {
  let users = {}
    users = db.collection('profile').updateOne({"name":req.body.name}, {$set:{"like":true}});
    res.render('like', {title: 'test'});
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
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// console.log(req.body.name)



app.set('view engine', 'ejs') // instellen voor view engine

app.use(express.static('static'))

app.listen(port,() =>{
    console.log('luistert op port: port');
})

app.get('/', async (req,res)=>{
	res.render('index')
    
})
>>>>>>> mandemt
