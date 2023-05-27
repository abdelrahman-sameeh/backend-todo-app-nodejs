exports.corsMiddleware = (req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080', 'https://frontend-todo-app-vue.netlify.app');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   next();
}