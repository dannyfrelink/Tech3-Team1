const express = require(`express`);
const expHandlebars = require(`express-handlebars`);
const app = express();
const port = process.env.PORT || 5555;
const multer = require(`multer`);
const { v4: uuidv4 } = require(`uuid`);
const countriesList = require(`countries-list`);
/* eslint-disable-next-line no-unused-vars */
const bodyParser = require(`body-parser`);
/* eslint-disable-next-line no-unused-vars */
const FileReader = require(`filereader`);
/* eslint-disable-next-line no-unused-vars */
const dotenv = require(`dotenv`).config();
const { MongoClient } = require(`mongodb`);

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;

let db;
let users;
let photos;
let search;
let travel;

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

MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.log(`MongoDB Error:` + err);
	} else {
		db = client.db(process.env.DB_NAME);
		users = db.collection(`persoonsgegevens`);
		photos = db.collection(`fotos`);
		search = db.collection(`zoekopdracht`);
		travel = db.collection(`landen`);
	}
});

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, `./static/public/uploads/`);
	},
	filename: (req, file, callback) => {
		callback(null, `${uuidv4(options.random)}.jpg`);
	}
});

const upload = multer({
	storage: storage
});

const countries = Object.values(countriesList.countries);
const continents = Object.values(countriesList.continents);

const hbs = expHandlebars.create({
	helpers: {
		equals: (value1, value2) => { return value1 === value2; }
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`static/public`));

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.get(`/persoonsgegevens`, (req, res) => {
	res.render(`profiel-1`, { countries });
});

app.post(`/fotos`, async (req, res) => {
	try {
		const document = { "name": req.body.name, "nationaliteit": req.body.nation, "geboortedatum": req.body.geboorte, "geslacht": req.body.geslacht, "bio": req.body.bio };
		await users.insertOne({ document });
	}
	catch (error) {
		console.error(`Error:`, error);
	}

	res.render(`addFoto`);
});

app.post(`/profiel/fotos`, upload.array(`fotos`), async (req, res) => {
	let paths = [];
	paths = req.files.map(file => file.path.split(`/`).pop());

	let usersDB = {};
	let photosDB = {};

	try {
		const document = { "pfImage": paths[0], "extraImages": paths.slice(1)};
		await photos.insertOne({ document });

		usersDB = await users.findOne({}, { sort: { _id: -1 }, limit: 1 });
		photosDB = await photos.findOne({}, { sort: { _id: -1 }, limit: 1 });
	}
	catch (error) {
		console.error(`Error:`, error);
	}

	res.render(`profiel-2`, { usersDB, photosDB });
});

app.get(`/zoekopdracht`, async (req, res) => {
	res.render(`addZoekopdracht`, { countries});
});

app.post(`/profiel/zoekopdracht`, async (req, res) => {
	let usersDB = {};
	let photosDB = {};
	let searchDB = {};

	try {
		const document = { "geslacht": req.body.geslacht, "nationaliteit": req.body.nation, "leeftijd": req.body.leeftijd, "interesses": req.body.interesses };
		await search.insertOne({ document });

		usersDB = await users.findOne({}, { sort: { _id: -1 }, limit: 1 });
		photosDB = await photos.findOne({}, { sort: { _id: -1 }, limit: 1 });
		searchDB = await search.findOne({}, { sort: { _id: -1 }, limit: 1 });
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	res.render(`profiel-3`, { usersDB, photosDB, searchDB });
});

app.get(`/reizen`, async (req, res) => {
	res.render(`addReizen`, { continents, countries, hbs });
});

app.post(`/profiel/reizen`, async (req, res) => {
	let usersDB = {};
	let photosDB = {};
	let searchDB = {};
	let countriesDB = {};

	try {
		const document = { "landen": req.body.landen };
		await travel.insertOne(document);

		usersDB = await users.findOne({}, { sort: { _id: -1 }, limit: 1 });
		photosDB = await photos.findOne({}, { sort: { _id: -1 }, limit: 1 });
		searchDB = await search.findOne({}, { sort: { _id: -1 }, limit: 1 });
		countriesDB = await travel.findOne({}, { sort: { _id: -1 }, limit: 1 });
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	res.render(`profiel-4`, { countries, usersDB, photosDB, searchDB, countriesDB });
});


app.use(function (req, res) {
	res.status(404).send(`Sorry, deze pagina kon ik niet vinden.`);
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});