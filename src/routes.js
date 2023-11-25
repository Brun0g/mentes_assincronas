const express = require('express');
const { registrationValidation } = require('./middleware/registration_validation');
const { userRegistration } = require('./controller/user_registration')

const routes = express();

routes.post('/usuario', registrationValidation, userRegistration);

module.exports = routes;