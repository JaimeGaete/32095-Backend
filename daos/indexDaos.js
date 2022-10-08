let productosDao
let carritosDao

switch (process.env.PERS) {
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
    case 'mongodb':
        const { default: productosDaoMongo } = await import('./productos/productosDaoMongo.js')
        const { default: carritoDaoMongo } = await import('./carritos/carritoDaoMongo.js')

        productosDao = new productosDaoMongo()
        carritosDao = new carritoDaoMongo()
        break
}

export { productosDao, carritosDao }
