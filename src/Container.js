const fs = require('node:fs');
const path = require('node:path');

class Container {
    fileName
    constructor (fileName){
        this.fileName = fileName
    }

    obtenerProductos = async () => {
        const data = await fs.promises.readFile(this.fileName, 'utf-8')
        return JSON.parse(data);
    }

    guardarProductos = async (productos) => {
        const data = JSON.stringify(productos, null, '\t')
        await fs.promises.writeFile(this.fileName, data)
    };

    getAll = async () =>{
        const productos = await this.obtenerProductos();
        return productos;
    }

    getById = async (idBuscado) => {
        const productos = await this.obtenerProductos();
        const indice = productos.findIndex((producto) => producto.id === idBuscado);
        if(indice < 0){
            throw new Error('No existe el producto seleccionado')
        }
        return productos[indice];
    }

    save = async (data) => {
        if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
        const productos = await this.obtenerProductos();

        let id = 1;
        if(productos.length){
            id = productos[productos.length -1].id +1
        }
        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: id
        }
        productos.push(nuevoProducto);
        await this.guardarProductos(productos)
    }
    deleteById = async (idBuscado) => {
        const productos = await this.obtenerProductos();

        const indice = productos.findIndex((producto) => producto.id === idBuscado);

        if(indice < 0){
            throw new Error('No existe el producto seleccionado')
            
        }
        productos.splice(indice,1);
        await this.guardarProductos(productos);
    }
    deleteAll = async () =>{
        await this.guardarProductos([]);
    }
    updateProduct = async (idBuscado, dataModificada) =>{
        try {
            const productos = await this.getAll()
            const indice = productos.findIndex((producto) => producto.id === idBuscado);
            const productoModificado = {
                ...productos[indice],
                ...dataModificada
            }
            productos[indice] = productoModificado
            await this.guardarProductos(productos)
        } catch (error) {
            throw error
            }
        
    }
}

module.exports = Container