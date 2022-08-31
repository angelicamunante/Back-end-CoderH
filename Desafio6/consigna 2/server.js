// Imports and constants
const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const handlebars = require('express-handlebars')
const { Router } = express
const app = express()
const http = new HTTPServer(app)
const socketServer = new SocketServer(http)
const Container = require('./Contenedor')
const container = new Container('productos.json')
const messagesContainer = new Container('messages.json')

const routerProductos = Router()

// Server configuration
const port = 8080

// Router config
app.use('/api/productos', routerProductos)
app.use(express.static('public'))
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

// Handlebars config
const hbs = handlebars.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// Endpoints
app.get('/products', (req, res) => {
    container.getAll()
        .then(products => {
            res.send(JSON.stringify(products))
        })
        .catch(error => { res.status(500).json(error) })
})

app.get('/', (req, res) => {
    res.render('form')
})

routerProductos.get('/', (req, res) => {
    
    container.getAll()
        .then(products => { 
            res.render('products', { products })
        })
        .catch(error => { res.status(500).json(error) })
})

routerProductos.post('/', (req, res) => {
    let product = req.body
    if (!product.title || !product.price || !product.thumbnail) {
        res.status(400).json({ error: 'title, price and thumbnail are required' })
    } else {
        product.price = parseFloat(product.price)
        container.save(req.body)
            .then(data => {
                container.getById(data)
                    .then(prod => { res.redirect('/api/productos') })
                    .catch(error => { res.status(500).json(error) })
            })
            .catch(error => { res.status(500).json(error) })
    }
})

// Socket config
socketServer.on('connection', async socket => {
    console.log('New client connected')
    socket.emit('INIT', '')
    let products = await container.getAll()
    let messages = await messagesContainer.getAll()
    socket.emit('products', products)
    socket.emit('messages', messages)
    socket.on('NEW_PRODUCT', product => {
        container.save(product)
            .then(() => {
                container.getAll()
                    .then(data => {
                        products = data
                        socketServer.sockets.emit('products', products)
                    })
                    .catch(error => { console.log(error) })
            })
            .catch(error => { console.log(error) })
    })
    socket.on('NEW_MESSAGE', message => {
        messagesContainer.save(message)
            .then(() => {
                messagesContainer.getAll()
                    .then(data => {
                        messages = data
                        socketServer.sockets.emit('messages', messages)
                    })
                    .catch(error => { console.log(error) })
            })
            .catch(error => { console.log(error) })
    })
})

// Server start
const server = http.listen(port, () => {
    console.log(`Server is running on ${server.address().port}`)
})

// Server error
server.on('error', (err) => {
    console.error(`Error: ${err.message}`)
})