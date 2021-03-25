const express = require('express');
const app = express();
const port = 5555;
const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries); 
const { ObjectID } = require('mongodb');
/* eslint-disable-next-line no-unused-vars */
const bodyParser = require('body-parser');

/* eslint-disable-next-line no-unused-vars */
require('dotenv').config();
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
	let profiles;
	let queryArray = [];
	let personalDB;

	try {
		profiles = await db.collection('profile').find({like:false}).toArray();
		personalDB = await db.collection('personal').findOne({});
	}    
	catch (error) {
		console.error('Error:', error);
	}

	// filter criteria
	if (Object.keys(req.query).length) {
		if (req.query.sport !== 'All') {
			profiles = profiles.filter(profile => { return profile.sport == req.query.sport; });
			queryArray.push(`sport=${req.query.sport}`);
		}
		else {
			queryArray.push(`sport=${req.query.sport}`);
		}
		if (req.query.age !== 'All') {
			profiles = profiles.filter(profile => { return profile.age <= req.query.age; });
			queryArray.push(`age=${req.query.age}`);
		}
		else {
			queryArray.push(`age=${req.query.age}`);
		}
		if (req.query.country !== 'All') {
			profiles = profiles.filter(profile => { return profile.country == req.query.country; });
			queryArray.push(`country=${req.query.country}`);
		}
		else {
			queryArray.push(`country=${req.query.country}`);
		}
		if (req.query.gender !== 'All') {
			profiles = profiles.filter(profile => { return profile.gender == req.query.gender; });
			queryArray.push(`gender=${req.query.gender}`);
		}
		else {
			queryArray.push(`gender=${req.query.gender}`);
		}
	}

	const selectedQueries = queryArray.length && `?${queryArray.join('&')}`;

	profile = await profiles[0];

	res.render('explore', {
		title: 'Sportbuddy',
		profilesLength: profiles.length,
		countries,
		profile,
		queries: req.query,
		selectedQueries,
		personalDB
	});
});

app.post('/', async (req, res) => {
	let queryArray = [];
	const id = new ObjectID(req.body.id);
	
	try {
		await db.collection('profile').updateOne({'_id':id}, {$set:{'like':null}});
		profiles = await db.collection('profile').find({like:false}).toArray();
	} 
	catch (error) {
		console.error('Error:', error);
	}

	// filter criteria
	if (Object.keys(req.query).length) {
		if (req.query.sport !== 'All') {
			profiles = profiles.filter(profile => { return profile.sport == req.query.sport; });
			queryArray.push(`sport=${req.query.sport}`);
		}
		else {
			queryArray.push(`sport=${req.query.sport}`);
		}
		if (req.query.age !== 'All') {
			profiles = profiles.filter(profile => { return profile.age <= req.query.age; });
			queryArray.push(`age=${req.query.age}`);
		}
		else {
			queryArray.push(`age=${req.query.age}`);
		}
		if (req.query.country !== 'All') {
			profiles = profiles.filter(profile => { return profile.country == req.query.country; });
			queryArray.push(`country=${req.query.country}`);
		}
		else {
			queryArray.push(`country=${req.query.country}`);
		}
		if (req.query.gender !== 'All') {
			profiles = profiles.filter(profile => { return profile.gender == req.query.gender; });
			queryArray.push(`gender=${req.query.gender}`);
		}
		else {
			queryArray.push(`gender=${req.query.gender}`);
		}
	}

	const selectedQueries = queryArray.length && `?${queryArray.join('&')}`;

	profile = await profiles[0];

	res.render('explore', {
		title: 'SportBuddy',
		profilesLength: profiles.length,
		countries, 
		profile,
		queries: req.query,
		selectedQueries
	});
});

// rendered post page
// form method="post"
app.post('/liked', async (req, res) => {
	let queryArray = [];
	const id = new ObjectID(req.body.id);
	
	try {
		await db.collection('profile').updateOne({'_id':id}, {$set:{'like':true}});
		profiles = await db.collection('profile').find({like:false}).toArray();
	} 
	catch (error) {
		console.error('Error:', error);
	}

	// filter criteria
	if (Object.keys(req.query).length) {
		if (req.query.sport !== 'All') {
			profiles = profiles.filter(profile => { return profile.sport == req.query.sport; });
			queryArray.push(`sport=${req.query.sport}`);
		}
		else {
			queryArray.push(`sport=${req.query.sport}`);
		}
		if (req.query.age !== 'All') {
			profiles = profiles.filter(profile => { return profile.age <= req.query.age; });
			queryArray.push(`age=${req.query.age}`);
		}
		else {
			queryArray.push(`age=${req.query.age}`);
		}
		if (req.query.country !== 'All') {
			profiles = profiles.filter(profile => { return profile.country == req.query.country; });
			queryArray.push(`country=${req.query.country}`);
		}
		else {
			queryArray.push(`country=${req.query.country}`);
		}
		if (req.query.gender !== 'All') {
			profiles = profiles.filter(profile => { return profile.gender == req.query.gender; });
			queryArray.push(`gender=${req.query.gender}`);
		}
		else {
			queryArray.push(`gender=${req.query.gender}`);
		}
	}

	const selectedQueries = queryArray.length && `?${queryArray.join('&')}`;

	profile = await profiles[0];

	res.render('explore', {
		title: 'SportBuddy',
		profilesLength: profiles.length,
		countries, 
		profile,
		queries: req.query,
		selectedQueries
	});
});

app.use(function (req, res) {
	res.status(404).send('Sorry, deze pagina kon ik niet vinden.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});