const express = require('express')

const fs = require ('fs');

const app = express()



class Contenedor {
    constructor(nombreArchivo) {
        
        this.nombreArchivo = nombreArchivo;

    }

    async getAll() {

        try {

            let datos = await fs.promises.readFile('./' + this.nombreArchivo)
            datos = await JSON.parse(datos)
            return datos

        } catch (error) {

            console.log("El archivo esta vacio");

        }

    }
   
}

// const productos = [
//     {
//       "title": "Escuadra",
//       "price": 123.45,
//       "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//       "id": 1
//     },
//     {
//       "title": "Calculadora",
//       "price": 234.56,
//       "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//       "id": 2
//     },
//     {
//       "title": "Globo Terráqueo",
//       "price": 345.67,
//       "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//       "id": 3
//     }
//    ]



const PORT = 8080
const  productos =  new Contenedor('products.txt')

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send("Pagina en construccion")
 })

app.get('/productos', async (req, res) => {
    // const product = productos.map(product => product);
    const p = await productos.getAll()
    res.send(p)
    // res.send(product)
 })

 app.get('/productoRandom', async (req, res) => {
    const producto = await productos.getAll()
    // Obtenemos la cantidad de elementos
    const longitud = producto.length + 1
    // Obtenemos un numero aleatorio 
    const posicion = Math.floor(Math.random() * (longitud - 1) + 1);
    // console.log(numero)
    res.send(producto[posicion - 1])
 })
 