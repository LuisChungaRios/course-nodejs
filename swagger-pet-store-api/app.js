const express = require("express");
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: 'https://petstore.swagger.io/v2/swagger.json',
  }
}));

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000/api-docs");
});