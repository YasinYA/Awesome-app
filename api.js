const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const db = require('./db/todos');

router.use(bodyParser.json());

router.use(express.cors());

router
  .route('/todos')
  .get((req, res) => {
    res.send({
      todos: db.getAll(),
      success: true
    });
  })
  .post((req, res) => {
    if(!req.body.task) {
      res.send({
        success: false,
        message: "Task is required"
      });
    } else {
      const todo = db.createTodo(req.body.task);
      res.send({
        todo,
        success: true,
        message: "Successfully Created"
      });
    }
  });

router
  .route('/todos/:id')
  .get((req, res)=>{
    const todo = db.getOneTodo(req.params.id);
    res.send({
      success: true,
      todo
    });
  })
  .put((req, res) => {
    const todo = db.editTodo(req.params.id, req.body.task);
    res.send({
      success: true,
      todo,
      message: "Successfully Update"
    });
  })
  .delete((req, res) => {
    db.deleteTodo(req.params.id);
    res.send({
      success: true,
      message: "Successfully Deleted"
    });
  });

module.exports = router;