const fs = require('fs');
const path = require('path');

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
deleteById = async (idBuscado) => {
    const productos = await obtenerProductos();

    const indice = productos.findIndex((producto) => producto.id === idBuscado);

    if(indice < 0){
        return;
    }
    productos.splice(indice,1);
    await guardarProductos(productos);
}
deleteAll = async () =>{
    await guardarProductos([]);
}
}
let productos1 = new Container('productos.json')
productos1.getAll();


// si pones un console.log dentro del metodo getAll si muestras los productos pero creo que deberia traerlos sin necesidad de eso