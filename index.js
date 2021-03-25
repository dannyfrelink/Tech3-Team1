const express = require('express');
/* eslint-disable-next-line no-unused-vars */
const app = express();
const port = 5555;
const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries); 
const { ObjectID } = require('mongodb');
/* eslint-disable-next-line no-unused-vars */
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
/* eslint-disable-next-line no-unused-vars */
const FileReader = require('filereader');
/* eslint-disable-next-line no-unused-vars */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;

let db;
let personal;

MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.log('MongoDB Error:' + err);
	} else {
		db = client.db(process.env.DB_NAME);
		personal = db.collection('personal');
		console.log('Connection success');
	}
});

const options = {
	random: [
		0x10,
		0x91,
		0x56,
		0xbe,
		0xc4,
		0xfb,
		0xc1,
		0xea,
		0x71,
		0xb4,
		0xef,
		0xe1,
		0x67,
		0x1c,
		0x58,
		0x36
	]
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './public/uploads/');
	},
	filename: (req, file, callback) => {
		callback(null, `${uuidv4(options.random)}.jpg`);
	}
});

const upload = multer({
	storage: storage
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

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

app.get('/profile', async (req, res) => {
	let personalDB;
	try {
		personalDB = await personal.findOne({}, { sort: { _id: -1 }, limit: 1 });
	}
	catch (error) {
		console.error('Error:', error);
	}
	res.render('profile', { title: 'Profile', personalDB, countries });
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
  
  app.post('/profile', upload.single('image'), async (req, res) => {
	let personalDB;

	if(req.file) {
		const img = `uploads/${req.file.path.split('/').pop()}`;

		try {
			const document = { 'image': img, 'name': req.body.name, 'countries': req.body.countries, 'gender': req.body.gender, 'birthdate': req.body.date, 'sports': req.body.sports, 'interests': req.body.interests };

			if(await personal.countDocuments() > 0) {
				await personal.updateOne({}, {$set: { document }});
			}
			else {
				await personal.insertOne({ document });
			}

			personalDB = await personal.findOne({}, { sort: { _id: -1 }, limit: 1 });
		}
		catch (error) {
			console.error('Error:', error);
		}
	} 
	else{
		try {
			personalDB = await personal.findOne({}, { sort: { _id: -1 }, limit: 1 });
			const img = personalDB.document.image;

			const document = { 'image': img, 'name': req.body.name, 'countries': req.body.countries, 'gender': req.body.gender, 'birthdate': req.body.date, 'sports': req.body.sports, 'interests': req.body.interests };
			await personal.updateOne({}, {$set: { document }});

			personalDB = await personal.findOne({}, { sort: { _id: -1 }, limit: 1 });
		}
		catch (error) {
			console.error('Error:', error);
		}
	}
	res.render('profile', { title: 'Profile', personalDB, countries });
});

app.use(function (req, res) {
	res.status(404).send('Sorry, could not find this page.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});