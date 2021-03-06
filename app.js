const express = require ('express');
const app = express();
const apiRoutes = require('./Routes/index');
const PORT = process.env.PORT || 8080;
const { ProductsApi } = require('./models/index')
const { products } = require('./data/productos')
const productsApi = new ProductsApi([]);

const { engine } = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
const arrPlantillas = ['handlebars', 'ejs', 'pug'];
app.set('view engine', arrPlantillas[2]);


app.set('views', './views/pug');
app.get('/productos', (req, res) => {
    productsData = productsApi.getAll();
    res.render('view', {
        products: productsData
    });
});


app.post('/productos', (req, res) => {
    const product = { title, thumbnail, price } = req.body;

    if (isNaN(product.price)) { return res.status(400).json({ error: 'Price debe ser un numero' }); }
    if (!title || !price || !thumbnail) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    }
    const productAdded = productsApi.addProduct({ ...product, price: +price })
    res.redirect('/')
})







const connectedServer = app.listen (PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`)
});

connectedServer.on('error', (error) => {
    console.log(error.message)
});

