const express = require('express');
/* eslint-disable-next-line no-unused-vars */
const ejs = require('ejs');
const app = express();
const port = 5555;
const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries);
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
/* eslint-disable-next-line no-unused-vars */
const FileReader = require('filereader');
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

app.get('/profile', (req, res) => {
	res.render('profile', {title: 'Profile', countries});
});

app.post('/profile', upload.single('image'), async (req, res) => {
	let personalDB;

	const img = `uploads/${req.file.path.split('/').pop()}`;

	try {
		const document = { 'image': img, 'name': req.body.name, 'countries': req.body.countries, 'gender': req.body.gender, 'birthdate': req.body.date, 'sports': req.body.sports, 'interests': req.body.interests };
		await personal.insertOne({ document });

		personalDB = await personal.findOne({}, { sort: { _id: -1 }, limit: 1 });
	}
	catch (error) {
		console.error('Error:', error);
	}
	res.render('profileAdded', { title: 'Profile', personalDB, countries });
});




app.use(function (req, res) {
	res.status(404).send('Sorry, could not find this page.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});