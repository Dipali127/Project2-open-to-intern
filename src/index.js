const express = require('express');
const bodyParser = require('body-parser');//body parser is a middleware which parse the incoming request bodies before the 
//handler available on request bodies.
const route = require('./routes/route');
const { default: mongoose } = require("mongoose")

const app = express();

<<<<<<< HEAD
app.use(bodyParser.json());//use is a function of express middleware and app.use(bodyparser.json()) handle the json request bodies.
=======
app.use(bodyParser.json());

>>>>>>> f1e7ddb81eb28042949bf3a77a92e4c1958f0a58

mongoose.connect("mongodb+srv://BittuMishra:ZsLbBdUnCK.2jta@cluster0.2v1vzde.mongodb.net/Project2?retryWrites=true&w=majority",
    {
        useNewUrlParser: true  //you should set useNewUrlparser :true unless to prevent from connecting.
    })
    .then(() => { console.log("MongoDb is connected..."); })
    .catch(err => console.log(err))

<<<<<<< HEAD
app.use('/', route); //redirect the request to the specified path.


app.listen(process.env.PORT || 3000, () => {  //app.listen() listen the incoming request on specified port.
    console.log('express app started on the port ' + (process.env.PORT || 3000))
=======

app.use('/', route);


app.listen(process.env.PORT || 3000, () => {
    console.log('express app has started on the port ' + (process.env.PORT || 3000))
>>>>>>> f1e7ddb81eb28042949bf3a77a92e4c1958f0a58
});