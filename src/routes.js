const express = require("express");

const { registrationValidation } = require("./middleware/registrationValidation");
const { userRegistration } = require("./controller/userRegistration");

const insertCategories = require("./controller/insertCategories");
const listCategory = require("./controller/listCategories");
const productRegister = require("./controller/productRegister");

const authenticateLogin = require("./middleware/authLogin");
const { loginUser } = require("./controller/userLogin");
const { userProfile } = require("./controller/userProfile");
const { updateUser } = require("./controller/updateUser");
const categoryValidation = require("./middleware/categoryValidation");

const routes = express();

routes.post("/categoria", insertCategories);
routes.get("/categoria", listCategory);
routes.post("/produto", categoryValidation, productRegister);

routes.post("/usuario", registrationValidation, userRegistration);

routes.post("/login", loginUser);
routes.use(authenticateLogin);

routes.get("/usuario", userProfile);
routes.put("/usuario", registrationValidation, updateUser);

module.exports = routes;
