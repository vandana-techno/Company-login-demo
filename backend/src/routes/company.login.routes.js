const {Router} = require("express");
const CompanyLoginController = require("../controllers/companyLogin.controller");

const companyLoginController = new CompanyLoginController();

const router = Router();

router.post("/createCompnayLogin", companyLoginController.updateCompanyLogin );

module.exports = router;