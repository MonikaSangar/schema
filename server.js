const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost/userdata');

// require('./model/userdata')

var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
});

const userdata = require('./model/userdata');
const noteData = require('../node/node')

hostname = 'localhost';
app.set('port', process.env.PORT || 3000);
var port = app.get('port');

app.use(express.static('public')).use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});


app.post('/usersignup', async (req, res) => {
    try {
        const getData = new userdata();
        getData.id = req.body.id;
        getData.name = req.body.name;
        getData.email = req.body.email;
        getData.phone = req.body.phone;
        getData.save();
        console.log('userdata', getData);
        await res.send({
            data: getData,
            status: "success"
        });
    } catch {
        res.send({
            status: "failed"
        })
    }
});
app.use('/signup', async (req, res) => {
    try {
        const contacts = await userdata.find({});
        res.send({
            results: contacts,
            status: 'success'
        })
    } catch {
        res.send({
            problem: 'Problem in getting data',
            status: 'failed'
        })
    }
});


app.listen(port, (req, res) => {
    console.log(`I am running at port number http://${hostname}:${port}`);
});