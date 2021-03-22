const express = require('express');
const app = express();
const port = 5555;
const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries); 
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
  let profiles = {}
  profiles = await db.collection('profile').find({like:false}).toArray()
  res.render('index', {
    title: 'Sportbuddy',
    results: profiles.length,
    profiles,
    countries
  })
})

// rendered post page
// form method="post"
app.post('/', async (req, res) => {
  // data from database
  let profiles = {}
  profiles = await db.collection('profile').find({like:false}).toArray()
  // filter criteria
  if (req.body.sport !== 'all') {
    profiles = profiles.filter(profile => { return profile.sport === req.body.sport })
  }
  if (req.body.age !== 'all') {
    profiles = profiles.filter(profile => { return profile.age <= req.body.age })
  }
  if (req.body.country !== 'all') {
    profiles = profiles.filter(profile => { return profile.country <= req.body.country })
  }
  if (req.body.gender !== 'all') {
    profiles = profiles.filter(profile => { return profile.gender <= req.body.gender })
  }
  res.render('index', {
    title: 'SportBuddy',
    results: profiles.length,
    profiles,
    countries
  })
})

 
/* if (req.body.activity !== 'all') {
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



app.use(function (req, res) {
	res.status(404).send('Sorry, deze pagina kon ik niet vinden.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});