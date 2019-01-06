const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash-messages');
const expressValidator = require('express-validator');
const favicon = require('express-favicon');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const csrfProtection = csrf({cookie: true});

const db =  require('./db/todos');

const port = process.env.PORT||3000;
const viewsPath = path.join(__dirname, '/views/');
const publicPath = path.join(__dirname, '/public/');
const faviconPath = path.join(publicPath, '/img/favicon.ico');

// templating engine
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Middlewares
app.use(session({
  secret: 'thisisverysecret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(csrfProtection);
app.use(expressValidator());

app.use('/static/', express.static(publicPath));
app.use(favicon(faviconPath));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  res.render('todos', {
    todos: db.getAll()
  });
});

app.get('/single/:id', (req, res) => {
  res.render('todo', {
    todo: db.getOneTodo(req.params.id)
  });
});

app.get('/edit/:id', (req, res) => {
  const messages = res.locals.getMessages();
  if (messages.error) {
    res.render('editTodo',  {
      todo: db.getOneTodo(req.params.id),
      messages: messages.error,
      _csrf: req.csrfToken()
    });
  } else {
    res.render('editTodo',  {
      todo: db.getOneTodo(req.params.id),
      messages: {},
      _csrf: req.csrfToken()
    });
  }
});

app.put('/edittodo/:id', (req, res) => {
  // error checks
  req.checkBody('task', 'Task is required').notEmpty();

  // result
  req.getValidationResult()
  .then((result) => {
    if(result.isEmpty() === false) {
      result.array().forEach(error => {
        req.flash('error', error.msg);
      });
      res.redirect('/edit/' + req.params.id);
    } else {
      const todo = db.editTodo(
        req.params.id, req.body.task
      );
      
      res.redirect('/single/' + req.params.id);
    }
  })
  .catch((err) => {
    if(err) {
      throw err;
    }
  });

}); 

app.get('/create', (req, res) => {
  const messages = res.locals.getMessages();
  if (messages.error) {
    res.render('createTodo',  {
      messages: messages.error,
      _csrf: req.csrfToken()
    });
  } else {
    res.render('createTodo',  {
      messages: {},
      _csrf: req.csrfToken()
    });
  }
});

app.post('/createtodo', (req, res) => {
  // error checks
  req.checkBody('task', 'Task is required').notEmpty();

  // results
  req.getValidationResult()
  .then(result => {
    if(result.isEmpty() === false) {
      result.array().forEach(error => {
        req.flash('error', error.msg);
      });
      res.redirect('/create');
    } else {
      db.createTodo(req.body.task);
      res.redirect('/todos');
    }
  })
  .catch(err => {
    if(err)
      throw err;
  });
});

app.delete('/deletetodo/:id', (req, res) => {
  db.deleteTodo(req.params.id);
  res.redirect('/todos');
});


app.listen(port, () => console.log(`Server is running on port ${port}`));