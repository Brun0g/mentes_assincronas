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
const validateBodyRequest = require("./middleware/validateBodyRequest");
const esquemaPedido = require("./middleware/esquemaRequest");
const clientRegistration = require("./controller/clientRegistration");
const clientValidation = require("./middleware/clientValidation");
const updateClient = require("./controller/updateClient");
const detailClient = require("./controller/detailClient");
const productUpdate = require("./controller/productUpdate");
const productDelete = require("./controller/productDelete");
const productDetail = require("./controller/productDetail");
const listProducts = require("./controller/listProducts");
const requests = require("./controller/requests");
const listClient = require("./controller/listClients");
const requestList = require("./controller/requestList");
const validationDeleteProduct = require("./middleware/validationDeleteProduct");

const routes = express();

routes.post("/categoria", insertCategories);
routes.get("/categoria", listCategory);
routes.post("/usuario", userRegistrationValidation, userRegistration);
routes.post("/login", loginUser);

routes.use(authenticateLogin);

routes.get("/usuario", userProfile);
routes.put("/usuario", userRegistrationValidation, updateUser);
routes.post("/cliente", clientValidation, clientRegistration);
routes.put("/cliente/:id", clientValidation, updateClient);
routes.get("/cliente", listClient);
routes.get("/cliente/:id", detailClient);
routes.post("/produto", categoryValidation, productRegister);
routes.get("/produto", listProducts);
routes.get("/produto/:id", productDetail);
routes.put("/produto/:id", categoryValidation, productUpdate);
routes.delete("/produto/:id", validationDeleteProduct, productDelete);
routes.post("/pedido", requests);
routes.get("/pedido", requestList);

module.exports = routes;
