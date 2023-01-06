const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user.routes')
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const db_link = 'mongodb+srv://lexev:ChL30jWRxE3iJGnK@cluster0.v7vjoz9.mongodb.net/test';
mongoose.set("strictQuery", false);
mongoose.connect(db_link,{useNewUrlParser:true}).then(
    ()=>{
        console.log("Database is connected");
    },

    (err) =>{
        console.log("can't connect to the database " +err);
    }
)
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))
app.use('/api',userRoutes);

app.listen(1010, ()=>{
    console.log("Server is set up on the server");
});
