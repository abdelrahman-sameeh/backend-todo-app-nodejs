const { default: mongoose } = require("mongoose")

exports.connectDatabase = () => {
   const dbURI = process.env.dbURI
   mongoose.connect(dbURI)
} 
exports.disconnectDatabase = () => {
   mongoose.disconnect()
}