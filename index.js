const express = require('express');
const app = express();
const port = 5555;
const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries); 
const { ObjectID } = require('mongodb');
/* eslint-disable-next-line no-unused-vars */
const ejs = require('ejs');
const bodyParser = require('body-parser');

// const multer = require('multer');

/* eslint-disable-next-line no-unused-vars */
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;

let db;
let filter; 

MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.log('MongoDB Error:' + err);
	} else {
		db = client.db(process.env.DB_NAME);
		filter = db.collection('filter'); 
		console.log('Connectie gelukt');
	}
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


// rendered page
app.get('/', async (req, res) => {
	let profiles = {};
	let filterDB = {}; 
	filterDB = await filter.findOne({}, { sort: { _id: -1 }, limit: 1 });
	profiles = await db.collection('profile').findOne({like:false});
	const profilesLength = await db.collection('profile').countDocuments({like:false})
	res.render('index', {
		title: 'Sportbuddy',
		profilesLength,
		countries,
		profiles: profiles,
		filterDB
	});
});

// rendered post page
// form method="post"
app.post('/liked', async (req, res) => {
	await db.collection('profile').updateOne({'like':false}, {$set:{'like':true}}, {sort: {_id:1}});

	try {
		await db.collection('profile').updateOne({'like':false}, {$set:{'like':true}}, {sort: {_id:1}});
		} 
	catch (error) {
		console.error('Error:', error);}

	let profiles = {};
	profiles = await db.collection('profile').find({like:false}).toArray();
	let filterDB = {}; 
	filterDB = await filter.findOne({}, { sort: { _id: -1 }, limit: 1 });

	if (req.body.sport !== 'All') {
		profiles = profiles.filter(profile => { return profile.sport == req.body.sport; });
	}
	if (req.body.age !== 'All') {
		profiles = profiles.filter(profile => { return profile.age <= req.body.age; });
	}
	if (req.body.country !== 'All') {
		profiles = profiles.filter(profile => { return profile.country == req.body.country; });
	}
	if (req.body.gender !== 'All') {
		profiles = profiles.filter(profile => { return profile.gender == req.body.gender; });
	}

	const profilesLength = await db.collection('profile').countDocuments({})
	profiles = await profiles[0];

	res.render('index', {
		title: 'SportBuddy',
		profilesLength,
		countries, 
		profiles: profiles,
		filterDB
	});
});

app.post('/', async (req, res) => {
	// data from database
	let filterDB;
		try {
			const document = { 'sport': req.body.sport, 'age': req.body.age, 'country': req.body.country, 'gender': req.body.gender };
			filterDB = await filter.findOne({}, { sort: { _id: -1 }, limit: 1 });
			if(await filter.countDocuments() > 0) {	
				await filter.updateOne({}, {$set: { document }});
			} 
			else {
			   await filter.insertOne({ document });
			}
		    }    
		catch (error) {
			console.error('Error:', error);
		}
	
	profiles = await db.collection('profile').find({like:false}).toArray();
	// filter criteria
	if (req.body.sport !== 'All') {
		profiles = profiles.filter(profile => { return profile.sport == req.body.sport; });
	}
	if (req.body.age !== 'All') {
		profiles = profiles.filter(profile => { return profile.age <= req.body.age; });
	}
	if (req.body.country !== 'All') {
		profiles = profiles.filter(profile => { return profile.country == req.body.country; });
	}
	if (req.body.gender !== 'All') {
		profiles = profiles.filter(profile => { return profile.gender == req.body.gender; });
	}
	

	const profilesLength = await db.collection('profile').countDocuments({})
	profiles = profiles[0];
	
	res.render('index', {
		title: 'SportBuddy',
		profilesLength,
		countries, 
		profiles: profiles,
		filterDB
	});
});

app.use(function (req, res) {
	res.status(404).send('Sorry, deze pagina kon ik niet vinden.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});