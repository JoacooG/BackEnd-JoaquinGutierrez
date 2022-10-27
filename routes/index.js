const express = require('express')
const productosRouter = require('./productos')
const path = require('path')


const { Router } = express
const router = Router();






router.use('/', express.static('public'))
router.get('/', (req, res) =>{
    let error = false
    if(
        req.query.resultado === 'error'
    ){
    error = true
    }
res.render('main', {error})
})

router.use('/productos', productosRouter);

module.exports = router