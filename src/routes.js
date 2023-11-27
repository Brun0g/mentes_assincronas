const express = require("express");

const { registrationValidation } = require("./middleware/registration_validation");
const { userRegistration } = require("./controller/user_registration");

const insertCategories = require("./controller/insert_categories");
const listCategory = require("./controller/list_categories");

const { registerUser, loginUser, userProfile, updateUser } = require('./controller/userLogin');
const authenticateLogin = require('./middleware/authLogin');

const routes = express();

routes.post("/usuario", registrationValidation, userRegistration);

routes.post("/insertCategory", insertCategories);
routes.get("/listCategory", listCategory);

routes.post('/usuario', registerUser);
routes.post('/login', loginUser);
routes.use(authenticateLogin);
routes.get('/usuario', userProfile);
routes.put('/usuario', updateUser);

module.exports = routes;



















