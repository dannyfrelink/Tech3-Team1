const express = require('express'); 
const app = express(); 
const port = 3000;

app.set('view engine', 'ejs') // instellen voor view engine

app.use(express.static('static'))

app.listen(port,() =>{
    console.log('luistert op port: ${port}');
})

app.get('/', (req,res)=>{
    res.render('index', {title: 'Explore'});
})