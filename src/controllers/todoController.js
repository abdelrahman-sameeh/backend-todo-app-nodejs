const { getAllTodos, createTodo, deleteTodo, updateTodoById, deleteAllTodos } = require("../models/todoModel")



exports.getAllTodos = (req, res, next) => {
   const userId = req.userId
   getAllTodos(userId)
      .then((todos) => {
         res.status(200).json({
            todos,
            todosCount: todos.length
         })
      })
      .catch(err => {
         res.status(500).json({
            msg: 'Error, something wrong while fetch todos'
         })
      })
}


exports.addTodo = async (req, res, next) => {

   const data = {
      ...req.body,
      userId: req.userId
   }

   createTodo(data)
   res.status(200).json({
      msg: 'todo added successfully',
   })
}


exports.deleteTodo = (req, res, next) => {
   const { todoId } = req.query
   const userId = req.userId

   deleteTodo(todoId, userId)
      .then((msg) => {
         return res.status(200).json(msg)
      })
      .catch(err => {
         return res.status(404).json(err)
      })

}



exports.deleteAllTodos = (req, res, next) => {
   const userId = req.userId
   deleteAllTodos(userId)
      .then(() => {
         return res.status(200).json({ msg: 'deleted all todos successfully' })
      })
      .catch(err => {
         return res.status(404).json({ err: 'something wrong while delete' })
      })
}


exports.updateTodo = (req, res, next) => {
   const data = req.body
   const userId = req.userId

   updateTodoById(data, userId)
      .then((msg) => {
         return res.status(200).json(msg)
      })
      .catch(err => {
         console.log(err);
         return res.status(404).json(err)
      })

}


