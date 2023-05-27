const { ApiError } = require("./apiError")

exports.handelGlobalError = (err, req, res, next) => {
   if(err.name == 'TokenExpiredError'){
      return next(new ApiError('error now'))
   }
   return res.json({ error: err })
}