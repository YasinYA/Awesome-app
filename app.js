const path = require('path');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, '/views/');

// templating engine
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));