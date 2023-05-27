const { createUser, getUser } = require("../models/authModel")

const jwt = require('jsonwebtoken');

const invalidatedTokens = []

const generateToken = (payload) => {
   const secret = process.env.SECRET
   return jwt.sign({ userId: payload }, secret, {
      expiresIn: '90d' // Set an appropriate expiration time
   });
}


const postSignup = (req, res, next) => {
   const data = req.body
   createUser(data)
      .then((user) => {
         return res.json({
            user,
            token: generateToken(user._id),
         })
      })
      .catch(err => {
         return res.json({ error: err })
      })
}


const postLogin = (req, res, next) => {
   getUser(req.body)
      .then((user) => {
         return res.json({
            user,
            token: generateToken(user._id)
         })
      })
      .catch(err => {
         return res.json({ error: err })
      })
}


const logout = async (req, res, next) => {

   const token = req.headers.authorization;
   // Add the token to the blacklist or mark it as invalidated
   invalidatedTokens.push(token);
   res.json({ message: 'Logged out successfully' });

}


module.exports = {
   invalidatedTokens,
   postSignup,
   postLogin,
   logout,
}