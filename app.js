const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const connectToDatabase = require('./database/connect');
const cors = require('./middlewares/cors');
const apiRouter = require('./routes/api');
const app = express();
const cookieParser = require("cookie-parser");
const pagesRouter = require('./routes/pages');
const PORT = 3001;


connectToDatabase();

app.use(
  cors,
  cookieParser(),
    bodyParser.json(),
    pagesRouter,  
    express.static(path.join(__dirname, 'public')),
    apiRouter
  );
  

app.listen(PORT, () => {
    console.log(`Приложение запущено тут: http://localhost:${PORT}`);
  });