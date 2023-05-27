const router = require('express').Router()
const bodyParser = require('body-parser')
const { getAllTodos, addTodo, deleteTodo, updateTodo, deleteAllTodos } = require('../controllers/todoController')
const { isAuth } = require('./guards/authGuard')



router.get('/api/v1/allTodos', isAuth,getAllTodos) 
router.post('/api/v1/addTodo', isAuth, bodyParser.urlencoded({extended: false}), addTodo) 
router.delete('/api/v1/deleteTodo', isAuth, bodyParser.urlencoded({extended: false}), deleteTodo) 
router.delete('/api/v1/deleteAllTodos', isAuth, deleteAllTodos) 
router.put('/api/v1/updateTodo', isAuth, bodyParser.urlencoded({extended: false}), updateTodo) 



module.exports = router   