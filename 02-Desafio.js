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
        return;
    }
    productos.splice(indice,1);
    await this.guardarProductos(productos);
}
deleteAll = async () =>{
    await this.guardarProductos([]);
}
}


// LLAMADO A LOS METODOS //

/* let productos1 = new Container('productos.json')
const main = async () =>{
    const productos = await productos1.getAll();
    console.log(productos);

    const nuevoProducto = {title: 'Lost Ark', price: 3000};
    await productos1.save(nuevoProducto);
    console.log(await productos1.getAll());

    const productoId = await productos1.getById(3);
    console.log(productoId);

    await productos1.deleteById(3);
    console.log(await productos1.getAll());

    await productos1.deleteAll();
    console.log(await productos1.getAll());
}
main(); */