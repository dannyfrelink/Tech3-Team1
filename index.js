const express = require('express');
const app = express();
const port = 5555;
/* eslint-disable-next-line no-unused-vars */
const ejs = require('ejs');
const bodyParser = require('body-parser')

// const multer = require('multer');

/* eslint-disable-next-line no-unused-vars */
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

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

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


// rendered page
app.get('/', async (req, res) => {
  let groups = {}
  groups = await db.collection('options').find({}).toArray()
  res.render('index', {
    title: 'ActiveTogether',
    results: groups.length,
    groups: groups
  })
})

// rendered post page
// form method="post"
app.post('/', async (req, res) => {
  // data from database
  let userLogedIn = {
    "id": 11,
    "username": "Tristanvrw",
    "password": 12345,
    "email": "tristan88@live.nl"
}
  let groups = {}
  groups = await db.collection('options').find({}).toArray()
  // filter criteria
  /* Filter on: 
     - Gender 
     - Age 
     - Country 
     - Sport
  if (req.body.activity !== 'all') {
    groups = groups.filter(group => { return group.activity === req.body.activity })
  }
  if (req.body.distance !== 'all') {
    groups = groups.filter(group => { return group.distance <= req.body.distance })
  }
  if (req.body.attendence !== 'all') {
    groups = groups.filter(group => { return group.attendence <= req.body.attendence })
  }
  if (req.body.duration !== 'all') {
    groups = groups.filter(group => { return group.duration <= req.body.duration })
  }
  res.render('index', {
    title: 'ActiveTogether',
    results: groups.length,
    groups: groups
  })
}) */ 

 if (req.body.activity !== 'all') {
    groups = groups.filter(group => { return group.activity === req.body.activity })
  }
  if (req.body.distance !== 'all') {
    groups = groups.filter(group => { return group.distance <= req.body.distance })
  }
  if (req.body.attendence !== 'all') {
    groups = groups.filter(group => { return group.attendence <= req.body.attendence })
  }
  if (req.body.duration !== 'all') {
    groups = groups.filter(group => { return group.duration <= req.body.duration })
  }
  res.render('index', {
    title: 'ActiveTogether',
    results: groups.length,
    groups: groups
  })
})



app.use(function (req, res) {
	res.status(404).send('Sorry, deze pagina kon ik niet vinden.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});