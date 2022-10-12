const Container = require("../Container")

class ProductosController {
  static listar = async (req, res) => {
    const container = new Container("src/database/productos.json")

    const productos = await container.getAll()
    

    res.status(200).json({ productos })
  }

  static random = async (req, res) => {
    const container = new Container("src/database/productos.json")

    const productos = await container.getAll()
    
    const producto = productos[Math.floor(Math.random() * productos.length)]

    res.status(200).json({ random: producto })
  }
}



module.exports = ProductosController