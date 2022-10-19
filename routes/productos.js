const { Router } = require('express');
const ProductosController = require('../src/controllers/ProductosController');
const router = Router();


router.get('/', ProductosController.productosLista)

router.get('/:id', ProductosController.productoById)


router.post('/', ProductosController.postProduct)

router.put('/:id', ProductosController.putProduct)

router.delete('/:id', ProductosController.deleteById)




module.exports = router;