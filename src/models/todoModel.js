const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
   name: String,
   description: String,
   userId: String
})

const Todo = mongoose.model('todos', todoSchema)
const dbURI = process.env.dbURI


const getAllTodos = (userId) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Todo.find({userId})
         })
         .then(todos => {
            resolve(todos)
            mongoose.disconnect()
         })
         .catch(err => {
            reject(err)
            mongoose.disconnect()
         })
   })
}


const createTodo = (data) => {
   mongoose
      .connect(dbURI)
      .then(async () => {
         const todo = new Todo(data)
         return [await todo.save(), await mongoose.disconnect()]
      })
      .catch(async (err) => {
         await mongoose.disconnect()
         return err
      })
}


const deleteTodo = (todoId, userId) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
         .then(() => {
            return Todo.findOneAndDelete({_id: todoId, userId})
         })
         .then((todo) => {
            if (todo) {
               mongoose.disconnect()
               resolve({ msg: 'Todo deleted successfully' })
            } else {
               mongoose.disconnect()
               reject({ error: 'no todo match this id' })
            }
         })
         .catch(err => {
            mongoose.disconnect()
            reject({ error: 'Internal server error' })
         })
   })
}


const deleteAllTodos = (userId) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Todo.deleteMany({userId})
         })
         .then(() => {
            mongoose.disconnect()
            resolve()
         })
         .catch((err) => {
            mongoose.disconnect()
            reject(err)
         })
   })
}



const updateTodoById = (data, userId) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Todo.findOneAndUpdate({ _id: data._id, userId }, { name: data.name, description: data.description })
         })
         .then((todo) => { 
            if (todo) {
               mongoose.disconnect()
               resolve({ msg: 'Todo updated successfully' })
            } else {
               mongoose.disconnect()
               reject({ error: 'no todo match this id' })
            }
         })
         .catch(err => {
            console.log(err);
            mongoose.disconnect()
            reject({ error: 'Internal server error' })
         })
   })
}




module.exports = {
   Todo,
   getAllTodos,
   createTodo,
   deleteTodo,
   deleteAllTodos,
   updateTodoById,
}