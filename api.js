const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const Todo = require('./db/models/todo');

router.use(bodyParser.json());

router.use(cors());

router
  .route('/todos')
  .get((req, res) => {
    console.log(Todo);
    Todo.find({})
    .then(result => {
      res.send({
        todos: result,
        success: true
      });
    })
    .catch(err => {
      if(err) {
        throw err;
      }
    });
  })
  .post((req, res) => {
    if(!req.body.task) {
      res.send({
        success: false,
        message: "Task is required"
      });
    } else {
      const todo = new Todo({task : req.body.task});
      todo.save()
      .then(result => {
        res.send({
          todo: result,
          success: true,
          message: "Successfully Created"
        });
      })
      .catch(err => {
        if(err)
          throw err;
      })
    }
  });

router
  .route('/todos/:id')
  .get((req, res)=>{
    Todo.findById(req.params.id)
    .then(result => {
      res.send({
        success: true,
        todo: result
      });
    })
    .catch(err => {
      if(err)
        throw err;
    })
  })
  .put((req, res) => {
    // error checks
    if(!req.body.task) {
      res.send({
        success: false,
        message: "Task is required"
      });
    } else {
      Todo.findByIdAndUpdate(req.params.id, {task: req.body.task})
      .then(result => {
        res.send({
          success: true,
          todo: result,
          message: "Successfully Update"
        });
      })
      .catch(err => {
        if(err){
          throw err;
        }
      })
    }
  })
  .delete((req, res) => {
    Todo.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({
        success: true,
        message: "Successfully Deleted"
      });  
    })
    .catch(err => {
      if(err) {
        throw err;
      }
    })
    
  });

module.exports = router;