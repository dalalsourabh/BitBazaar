const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// database connected----------------------------------------------------------------
mongoose.connect(process.env.DBurl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("Database Connected!");
})
.catch((err) =>{
    console.log("Not connected");
    console.log(err);
})

// routes connected----------------------------------------------------------------
app.use('/user', userRoute);
app.use('/item', itemRoute);

// server running--------------------------------------------------------------------
app.get('/', (req, res) => res.send("hello"));
app.listen(8000, () => console.log("Server running"));