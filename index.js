const express = require('express'); 
const app = express(); 
const port = 3000;

let db = null
async function connectDB(){
const uri = process.env.DB_URI
const options = {useUnifiedTopology: true}
const client = new MongoClient(uri,options);
await client.connect(); // hierdoor worden geen andere taken uitgevoed totdat er verbonden is.
db = await client.db(process.env.DB_NAME)
}

connectDB()
	.then(() =>{
	console.log('gelukt om te verbinden met de database in .env bestand')
	})
	.catch(error =>{
		console.log(error)
	})



app.set('view engine', 'ejs') // instellen voor view engine

app.use(express.static('static'))

app.listen(port,() =>{
    console.log('luistert op port: ${port}');
})

app.get('/', (req,res)=>{
    res.render('index', {title: 'Explore'});
})