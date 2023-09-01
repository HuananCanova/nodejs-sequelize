const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 3000;
const app = express();

var corsOptions ={
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}))

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get('/', (req, res) =>{
    res.json({messege: "Welcome port 3000"});
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});