const express = require('express');
const app = express();

// Load Models
const models = require('./models');
const User = models.users;

const PORT = 8000 || process.env.port;

// Access Body Data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    User.findAll()
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/', (req,res) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
    .then(user => {
        res.json({
            message : "User Created"
        })
    })
    .catch(() => {
        res.status(400).json({msg : "Error creating user"});
    });
})


models.sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT);
    console.log(`Server on localhost ${PORT} is running`);
  })
  .catch(err => console.log(err));
    
