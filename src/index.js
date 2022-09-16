const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');



const app = express();
const { mongoose } = require("mongoose")



app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://BittuMishra:ZsLbBdUnCK.2jta@cluster0.2v1vzde.mongodb.net/Project2?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    })
    .then(() => { console.log("MongoDb is connected") })
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, () => {  //app.listen() listen the incoming request on specified port.
    console.log('express app started on the port ' + (process.env.PORT || 3000))
});