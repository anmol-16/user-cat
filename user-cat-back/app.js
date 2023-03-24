const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const userRoutes = require('./routes/user.routes')
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded } = require('body-parser');
// TODO: db connection url should come from environment variable(via config);
const db_link = 'mongodb+srv://lexev:ChL30jWRxE3iJGnK@cluster0.v7vjoz9.mongodb.net/test';
mongoose.set("strictQuery", false);
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  var uploads = multer({ storage: storage });
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
// TODO: url must come from env variable
app.use(cors({origin: 'http://localhost:4200'}))

// TODO: should be /api/users/
app.use('/api',userRoutes);

app.listen(1010, ()=>{
    console.log("Server is set up on the server");
});
