const db = require("../../config/database.js");

/**
 * CompanyLogin Data
 */
class CompanyLoginData {
  /**
   * *Get Company By CompanyCode
   * @param {model} companyLogin.validators
   * @returns {object}
   */
  async getCompanyByCompanyCode(req) {
    try {
      const companyCode = req.body.companyCode;
      const procedure = "usp_getCompanyByCompanyCode";

      const result = await db.query(`CALL ${procedure}(:companyCode)`, {
        replacements: { companyCode },
        type: db.QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * *Update Company
   * @param {model} companyLogin.validators
   * @returns {Object}
   */
  async updateCompanyLogin(req) {
    try {
      const { companyID, companyName, companyCode, companyLogo, actionType } =
        req.body;
      const procedure = "usp_updateCompanyLogin";

      const result = await db.query(
        `CALL ${procedure}(:companyID, :companyName, :companyCode, :companyLogo, :actionType)`,
        {
          replacements: {
            companyID,
            companyName,
            companyCode,
            companyLogo,
            actionType,
          },
          type: db.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CompanyLoginData;
