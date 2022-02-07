const express = require ('express')
const app = express ()
const fs = require ('fs');
const path = require ('path')
const PORT = 8080

let visitas = 0


class Contenedor {

    constructor(file) {
        this.file = file
    }
    show() {
        let products = fs.readFileSync("./" + this.file, 'utf-8')
        const data = (JSON.parse(products, null, 2))
        return data
    }
    showRandom() {
        let data = this.show()
        let random = Math.floor((Math.random() * 5) + 1); 
        let result = data.filter( producto => producto.id === random)
        return result
    }
}
let container = new Contenedor('./productos.json')


app.get('/',(req, res) => {
    
    res.send('<h1>Desafío 3</h1>')
})
app.get('/visitas',(req, res) => {
    res.send(`La cantidad de visitas es ${++visitas}`)
})
app.get('/productos',(req, res) => {
    res.sendFile(path.resolve(__dirname, './productos.json'))
})
app.get('/productoRandom',async (req, res) => {
    const random = await container.showRandom()
    res.send(random)
})

async function consultarDesafio() {
    const newProduct = {
        id: 5,
        title: "campera",
        price: 8500,
        stock: 5,
        pictureUrl: "https://i.ibb.co/qp2R7wn/4.jpg",
        category: "Campera",
        description: "Campera negro"
    }

    await container.save(newProduct)
}

const server = app.listen(PORT, () => {
    console.log(`Corriendo en el servidor ${server.address().port}`);
})