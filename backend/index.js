const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  })
);

require('./app/routes/customer.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
