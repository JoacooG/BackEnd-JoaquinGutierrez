const express = require("express")
const ProductosController = require("./src/controllers/ProductosController");
const app = express()

app.get("/producto/agregar", ProductosController.agregar)
app.get("/producto/listar", ProductosController.listar)
app.get("/producto/random", ProductosController.random)

app.listen(8080, () => {
  console.log("Aplicación corriendo")
})