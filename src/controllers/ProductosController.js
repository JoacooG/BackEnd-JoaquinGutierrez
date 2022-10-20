const Container = require("../Container")

class ProductosController {
  static productosLista = async (req, res) => {
    const container = new Container("src/database/productos.json")

    const productos = await container.getAll()
    

    res.status(200).json({ productos })
  }

  static productoRandom = async (req, res) => {
    const container = new Container("src/database/productos.json")

    const productos = await container.getAll()
    
    const producto = productos[Math.floor(Math.random() * productos.length)]

    res.status(200).json({ random: producto })
  }

  static productoById = async (req, res) => {
    try {
      const container = new Container("src/database/productos.json")
      const idProducto = req.params.id
      const productos = await container.getById(Number(idProducto))
      res.status(200).json({ productos })
    } catch (error) {
      res.status(404).json({
        msg: 'No se encontro el producto seleccionado'
      })
    }
    
  }
  static postProduct = async (req, res) => {
    try {
      const container = new Container("src/database/productos.json")
    const nuevoProducto = {
      title: req.body.title,
      price: Number(req.body.price)
      
  }
  console.log(req)
   await container.save(nuevoProducto)
    
    res.status(201).json({
      msg: 'El producto se creo correctamente'
    })
      
    } catch (error) {
      res.status(400).json({
        msg: 'Datos invalidos: Title debe ser un string y Price un number'
      })
    }
    
  }
  static putProduct = async (req, res) => {
    try {
      const container = new Container("src/database/productos.json")
      const idProducto = req.params.id
      const nuevaDataProducto = {}
      if(req.body.title){
        nuevaDataProducto.title = req.body.title
      }
      if(req.body.price){
        nuevaDataProducto.price = req.body.price
      }
      await container.updateProduct(Number(idProducto), nuevaDataProducto)
      
      
      res.status(200).json({
        msg: 'El producto se modifico correctamente'
      })
    } catch (error) {
      res.status(404).json({
        msg: 'El producto seleccionado no existe'
      })
    }

  }
  static deleteById = async (req, res) => {
    try {
      const container = new Container("src/database/productos.json")
      const idProducto = req.params.id
      const productos = await container.deleteById(Number(idProducto))
      res.status(200).json({
        msg: "el producto seleccionado fue eliminado"
      })
    } catch (error) {
      res.status(404).json({
        msg: 'No se encontro el producto seleccionado'
      })
    }
    
  }
}

module.exports = ProductosController