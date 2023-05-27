const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
   username: String,
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: String,
   confirmPassword: String,
   todos: {
      type: Array
   }
})

const User = mongoose.model('users', userSchema)
const dbURI = process.env.dbURI


const createUser = (data) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return User.findOne({ email: data.email })
         })
         .then((user) => {
            if (user) {
               mongoose.disconnect()
               reject('email already used')
            } else {
               const newUser = new User(data)
               return newUser.save()
            }
         })
         .then((user) => {
            mongoose.disconnect()
            resolve(user)
         })
         .catch((err) => {
            mongoose.disconnect()
            reject('Internal server error')
         })
   })
}


const getUser = (data) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return User.findOne({ email: data.email })
         })
         .then((user) => {
            if (user) {
               return user
            } else {
               mongoose.disconnect()
               reject('email or password is incorrect')
            }
         })
         .then((user) => {
            // check password
            if (data.password == user.password) {
               mongoose.disconnect()
               resolve(user)
            } else {
               mongoose.disconnect()
               reject('email or password is incorrect')
            }
         })
         .catch((err) => {
            mongoose.disconnect()
            reject('Internal server error')
         })
   })
}


module.exports = {
   User,
   createUser,
   getUser
}

