const express = require("express");

const { registrationValidation } = require("./middleware/registrationValidation");
const { userRegistration } = require("./controller/userRegistration");

const insertCategories = require("./controller/insertCategories");
const listCategory = require("./controller/listCategories");

const authenticateLogin = require("./middleware/authLogin");
const { loginUser } = require("./controller/userLogin");
const { userProfile } = require("./controller/userProfile");
const { updateUser } = require("./controller/updateUser");

const routes = express();

routes.post("/categoria", insertCategories);
routes.get("/categoria", listCategory);

routes.post("/usuario", registrationValidation, userRegistration);

routes.post("/login", loginUser);
routes.use(authenticateLogin);

routes.get("/usuario", userProfile);
routes.put("/usuario", updateUser);

module.exports = routes;
