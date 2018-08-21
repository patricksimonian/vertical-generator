const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// routes for creating websites
const routes = require('./routes/routes');

const port = process.env.PORT || 3001;
// middle wares
app.use(cors());
app.use(bodyParser.json());
// routes
app.use('/', routes);
//server start
app.listen(port, () => {
  //eslint
	console.log('App running at http://localhost:' + port);
});
