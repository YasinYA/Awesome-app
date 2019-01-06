const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const apiRoutes = require('./api');
const dbConfig = require('./config');
const app = express();

const port = process.env.PORT||3000;


// connect to the db
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log('Connected to the Database');
});


app.use('/api/', apiRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));