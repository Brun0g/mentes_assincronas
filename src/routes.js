









const express = require('express');
const { registerUser, loginUser, userProfile, updateUser } = require('./controller/userLogin');
const authenticateLogin = require('./middleware/authLogin');

const routes = express();

routes.post('/usuario', registerUser);
routes.post('/login', loginUser);
routes.use(authenticateLogin);
routes.get('/usuario', userProfile);
routes.put('/usuario', updateUser);

module.exports = routes;
