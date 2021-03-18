const express = require('express');
/* eslint-disable-next-line no-unused-vars */
const ejs = require('ejs');
const app = express();
const port = 5555;

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
		/* eslint-disable-next-line no-unused-vars */
		db = client.db(process.env.DB_NAME);
		console.log('Connectie gelukt');
	}
});


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/profiel', (req, res) => {
	res.render('profiel', {title: 'profiel'});
});




app.use(function (req, res) {
	res.status(404).send('Sorry, deze pagina kon ik niet vinden.');
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});