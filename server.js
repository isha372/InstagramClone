const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const cors = require('cors');

app.use(cors());

const allRoutes = require('./routes/allroutes.routes');

app.use('/', allRoutes);

const port = 3000;

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
