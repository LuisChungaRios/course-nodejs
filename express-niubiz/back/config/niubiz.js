const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  merchantId: process.env.NIUBIZ_MERCHANT_ID,
  accessTokenUrl: process.env.NIUBIZ_ACCESS_TOKEN_URL,
  sessionTokenUrl: process.env.NIUBIZ_SESSION_TOKEN_URL,
  username: process.env.NIUBIZ_USERNAME,
  password: process.env.NIUBIZ_PASSWORD
};