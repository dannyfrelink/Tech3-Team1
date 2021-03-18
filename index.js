const express = require('express'); 
const app = express(); 
const port = 2000;

app.set('view engine', 'ejs') // instellen voor view engine

app.use(express.static('static'))


app.get('/', (req,res)=>{
    res.render('index', {title: 'Explore'});
})
app.listen(port,() =>{
    console.log('luistert op port: ${port}');
})
