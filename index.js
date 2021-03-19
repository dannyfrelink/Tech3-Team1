const express = require('express');
/* eslint-disable-next-line no-unused-vars */
const ejs = require('ejs');
const app = express();
const port = 5555;
const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries);
const bodyParser = require('body-parser');

// const multer = require('multer');

/* eslint-disable-next-line no-unused-vars */
const dotenv = require('dotenv').config();
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



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/profile', (req, res) => {
	res.render('profile', {title: 'Profile', countries});
});

app.post('/profile', async (req, res) => {
	let personalDB;

	try {
		const document = { 'name': req.body.name, 'countries': req.body.countries, 'gender': req.body.gender, 'birthdate': req.body.date, 'sports': req.body.sports, 'interests': req.body.interests };
		await personal.insertOne({ document });

		personalDB = await personal.findOne({}, { sort: { _id: -1 }, limit: 1 });
	}
	catch (error) {
		console.error('Error:', error);
	}




	res.render('profileAdded', { personalDB });
});




app.use(function (req, res) {
	res.status(404).send('Sorry, could not find this page.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});