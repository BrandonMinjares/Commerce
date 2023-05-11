const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');


// Routes
const dummy = require('./dummy');
const auth = require('./auth');
const item = require('./item');

const app = express();
const apiSpec = path.join(__dirname, '../api/openapi.yaml');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/v0/dummy', dummy.get);
app.post('/v0/login', auth.login);
app.post('/v0/register', auth.register);

app.post('/v0/item', auth.check, item.uploadItem);

// Your routes go here

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;