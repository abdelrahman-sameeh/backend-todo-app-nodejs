




const jwt = require("jsonwebtoken");
const { ApiError } = require("../../middlewares/errorMiddleware/apiError");
const { invalidatedTokens } = require("../../controllers/authController");


//// pug in this @line 52 
// const checkIfItUser = async (userId) => {
//    connectDatabase()
//    const currantUser = await User.findById(userId)
//    disconnectDatabase()

//    if (!currantUser) {
//       return next(ApiError('no user matches this token', req, res, next))
//    }
// }


exports.isAuth = async (req, res, next) => {

   let token;
   // check if have token ? get it 
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
   }

   // check if not have token ? return error 
   if (!token) {
      return res.json({
         err: 'you are not login, please login'
      })
   }


   try {

      // check if token is invalid
      if (invalidatedTokens.includes(`Bearer ${token}`)) {
         return res.status(401).json({ error: 'Token revoked' });
      }

      const decoded = jwt.verify(token, process.env.SECRET);
      const userId = decoded.userId

      //// pug in this @line 20
      // checkIfItUser(userId)

      req.userId = userId
      return next();

   } catch (err) {
      return next(ApiError('expired token', req, res, next))
   }


   // let decode;

   // // verify token 
   // jwt.verify(token, process.env.SECRET, (err, decoded) => {

   //    if (err) {
   //       // check is user match this token (in expires data )
   //       if (err instanceof jwt.TokenExpiredError) {
   //          // Token has expired
   //          return res.json({ err });
   //       }
   //       // Other error occurred
   //       return res.status(403).json({ error: 'Forbidden' });
   //    }

   //    decode = decoded

   // });




   // if (decode) {
   //    try {
   //       await connectDatabase()
   //       const currantUser = await User.findById(decode.userId)
   //       disconnectDatabase()


   //       if (!currantUser) {
   //          return next(ApiError('no user matches this token', req, res, next))
   //       }
   //       req.user = currantUser

   //       next()
   //    } catch (err) {
   //       return next(ApiError('something went wrong', req, res, next))
   //    }
   // }

} 



exports.notAuth = (req, res, next) => {
   if (!req.headers.authorization) next()
   else next(this.isAuth)
}