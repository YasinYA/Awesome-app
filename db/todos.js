const _ = require('lodash');

const todos = [
  {
    id: "1",
    task: "Clean the house"
  },
  {
    id: "2",
    task: "Code"
  },
  {
    id: "3",
    task: "Make a coffee"
  },
  {
    id: "4",
    task: "Cook Lunch"
  },
  {
    id: "5",
    task: "Go to GYM"
  },
  {
    id: "6",
    task: "Take a nap"
  },
  {
    id: "7",
    task: "Call the boss"
  },
  ,
  {
    id: "8",
    task: "Meeting"
  },
  {
    id: "9",
    task: "Client Call"
  },
  {
    id: "10",
    task: "Prepare tomorrow's todo list"
  }
];

const generateIds = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(
      Math.floor(
        Math.random() * possible.length
      ));

  return text;
}

const db = {
  getAll: function() {
    return todos;
  },

  getOneTodo: function(id) {
    return _.find(todos, {id: id});
  },

  createTodo: function(task) {
    const todo = {
      id: generateIds(),
      task: task
    }
    
    todos.push(todo);
    return todo;
  },

  deleteTodo: function(id) {
    _.remove(todos, {id: id});
  },

  editTodo: function(id, task) {
    let index = _.findIndex(todos, {id: id});

    todos.splice(index, 1, {id: id, task: task});
    return _.find(todos, {id: id});
  }
};

module.exports = db;