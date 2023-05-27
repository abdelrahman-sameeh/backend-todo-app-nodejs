const { default: mongoose } = require("mongoose");

const blackListSchema = mongoose.Schema({
   token: String
})

const BlackListModel = mongoose.model('blackListTokens', blackListSchema)


module.exports = {
   BlackListModel
}