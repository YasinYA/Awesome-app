const path = require('path');

const express = require('express');
const apiRoutes = require('./api');
const app = express();

const port = process.env.PORT||3000;

app.use('/api/', apiRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));