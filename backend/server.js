const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Form = require('./models/Form');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;
 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'));;


// Create a new user or update an existing one based on the username
app.post('/api/submitForm', (req, res) => {
  const formData = req.body;
  const { username } = formData;

  // Check if the username already exists
  Form.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        // Username already exists, update the existing user's data
        Form.findOneAndUpdate({ username }, formData, { new: true })
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Internal Server Error' });
          });
      } else {
        // Username doesn't exist, create a new user
        const newUser = new Form(formData);
        newUser.save().then((result) => {
            res.json(result);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Internal Server Error' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


app.get('/api/getForm', (req, res) => {
  const { username } = req.query;

  // Retrieve form data from MongoDB based on username
  Form.findOne({ username })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
