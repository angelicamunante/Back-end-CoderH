const express = require('express');
const Contenedor = require('./src/Contenedor')
const contenedor = new Contenedor("productos.txt");
const app = express();
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = express.Router();


app.use('/api/productos', router);

// GET /api/productos
router.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products)
})

// GET /api/productos/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(parseInt(id));
    product
        ? res.status(200).json(product)
        : res.status(404).json({error: "Producto no encontrado"});
    
})

// POST /api/productos
router.post('/', async (req,res) => {
    const {body} = req;
    const newProductId = await contenedor.save(body);
    res.status(200).send(`Producto agregado con el ID: ${newProductId}`)
})

// PUT /api/productos/:id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const Updated = await contenedor.updateById(id,body);
    res.status(200).send(`El producto de ID: ${id} fue actualizado`)
})

// DELETE /api/productos/:id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await contenedor.deleteById(id);

    result === undefined
        ? res.status(204).send()
        : res.status(404).send(result);
})


const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(`Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));