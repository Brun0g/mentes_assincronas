const express = require("express");

const userRegistrationValidation = require("./middleware/userRegistrationValidation");
const userRegistration = require("./controller/userRegistration");

const insertCategories = require("./controller/insertCategories");
const listCategory = require("./controller/listCategories");
const productRegister = require("./controller/productRegister");

const authenticateLogin = require("./middleware/authLogin");
const { loginUser } = require("./controller/userLogin");
const { userProfile } = require("./controller/userProfile");
const { updateUser } = require("./controller/updateUser");
const categoryValidation = require("./middleware/categoryValidation");
const customerRegistration = require("./controller/customerRegistration");
const customerRegistrationValidation = require("./middleware/customerRegistrationValidation");
const { updateCustomer } = require("./controller/updateCustomer");

const routes = express();

routes.post("/categoria", insertCategories);
routes.get("/categoria", listCategory);
routes.post("/produto", categoryValidation, productRegister);

routes.post("/usuario", userRegistrationValidation, userRegistration);
routes.post("/login", loginUser);

routes.use(authenticateLogin);

routes.get("/usuario", userProfile);
routes.put("/usuario", userRegistrationValidation, updateUser);
routes.post("/cliente", customerRegistrationValidation, customerRegistration);
routes.put("/cliente/:id", customerRegistrationValidation, updateCustomer);

module.exports = routes;
