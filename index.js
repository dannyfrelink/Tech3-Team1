const express = require('express'); 
const app = express(); 
const port = 3000;
const dotenv = require('dotenv').config();
const {MongoClient} = require('mongodb');
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// console.log(req.body.name)



app.set('view engine', 'ejs') // instellen voor view engine

app.use(express.static('static'))

app.listen(port,() =>{
    console.log('luistert op port: port');
})

app.get('/', async (req,res)=>{
	let users = {}
	users = db.collection('profile').updateOne({"name":req.body.name}, {$set:{"like":true}});
	res.render('index', {title: 'explore'});
	console.log(req.body.name)
    
})