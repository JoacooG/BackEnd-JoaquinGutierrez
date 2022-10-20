const express = require('express')
const productosRouter = require('./productos')
const path = require('path')


const { Router } = express
const router = Router();



router.use('/', express.static('public'))


router.use('/productos', productosRouter);

module.exports = router