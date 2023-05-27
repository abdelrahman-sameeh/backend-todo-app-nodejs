const express = require('express')
const app = express()
require('dotenv').config()

const cors = require('cors')
const { corsMiddleware } = require('./src/middlewares/corsMiddleware')
// middlewares
app.use(express.json());
app.use(cors())
app.use(corsMiddleware);



// import routes
const todoRoute = require('./src/routes/todoRoute')
const authRoute = require('./src/routes/authRoute')
// routes
app.use('/', todoRoute)
app.use('/', authRoute)



// import global handle error 
const { ApiError } = require('./src/middlewares/errorMiddleware/apiError')
const { handelGlobalError } = require('./src/middlewares/errorMiddleware/handleGlobalError')
// Middleware to handle global errors
app.use(handelGlobalError);
app.use(ApiError);


const PORT = process.env.PORT

app.listen(PORT, () => {
   console.log(`server listen in http://localhost:${PORT}`);
})
