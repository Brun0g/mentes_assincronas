const express = require("express");

const { registrationValidation } = require("./middleware/registration_validation");
const { userRegistration } = require("./controller/user_registration");
const insertCategories = require("./controller/insert_categories");
const listCategory = require("./controller/list_categories");
const routes = express();

routes.post("/usuario", registrationValidation, userRegistration);

routes.post("/insertCategory", insertCategories);
routes.get("/listCategory", listCategory);
module.exports = routes;
