const express = require("express")
const ProductosController = require("./src/controllers/ProductosController");
const app = express()

app.get("/productos", ProductosController.listar)
app.get("/productoRandom", ProductosController.random)

app.listen(8080, () => {
  console.log("Aplicación corriendo")
})