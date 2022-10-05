const fs = require('fs');
const path = require('path');

const archivo = 'productos.json'

const obtenerProductos = async () => {
    const data = await fs.promises.readFile(archivo, 'utf-8')
    return JSON.parse(data);
}

const guardarProductos = async (productos) => {
    const data = JSON.stringify(productos, null, '\t')
    await fs.promises.writeFile(archivo, data)
};

const getAll = async () =>{
    const productos = await obtenerProductos();
    return productos;
}

const getById = async (idBuscado) => {
    const productos = await obtenerProductos();
    const indice = productos.findIndex((producto) => producto.id === idBuscado);
    if(indice < 0){
        throw new Error('No existe el producto seleccionado')
    }
    return productos[indice];
}

const save = async (data) => {
    if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
    const productos = await obtenerProductos();
    
    let id = 1;
    if(productos.lenght){
        id = productos[productos.lenght -1].id +1
    }
    const nuevoProducto = {
        title: data.title,
        price: data.price,
        id: id
    }
    productos.push(nuevoProducto);
    await guardarProductos(productos)
}

const deleteById = async (idBuscado) => {
    const productos = await obtenerProductos();

    const indice = productos.findIndex((producto) => producto.id === idBuscado);

    if(indice < 0){
        return;
    }
    productos.splice(indice,1);
    await guardarProductos(productos);
}

const deleteAll = async () =>{
    await guardarProductos([]);
}


