const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config()

require('./database/database.connection');
const categoriesRouter = require('./routes/categories.router');
const { errorHandler } = require('./middleware/error-handler.middleware');

if (['staging', 'development'].includes(process.env.environment)) {
  app.use(cors())
}

app.use('/api', categoriesRouter);
app.use(errorHandler);


app.listen(3003, () => {
  console.log(`Server is listening on port ${3003}`);
});