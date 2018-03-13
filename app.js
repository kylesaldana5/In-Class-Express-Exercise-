
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const logParams = (req, res, next) => {
    console.log('this is the middle' );
    console.log('req params', req.params.id );
    console.log('rq url form middle ware', req.url );
    next();
}
   

// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static(__dirname + '/public', {extensions: 'html'}))

app.use(logParams);

app.get('/chickens', function(req, res){
    res.send('<h3> no chickens for you</h3><form method="POST"><input name="chickenName" type="text"><button type="submit">push</button></form>')
})

app.post('/chickens', (req, res) => {
    console.log('posting a form for chickens' );
    res.send(`<h2> Come back later for dem ${req.body.chickenName} chicks  </h2>`);
});


app.use((req, res, next) =>{
    let err = new Error('not found bud');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    // one error handler to rule them all
    res.json({
        'message': 'you blew it',
        'err': 'this resources is not found'
    })
})

app.listen(8080, () => {
    console.log('listening on port 8080');
    
})
