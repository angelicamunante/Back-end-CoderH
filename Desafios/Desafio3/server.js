const express = require('express');
const Contenedor = require('./Desafio2');

const app = express();
const contenedor = new Contenedor("productos.txt");

app.get('/', (req, res)=>{
  res.send('Bienvenido a mi servidor!')
});

app.get('/productos', async (req, res) => {
  const allProducts = await contenedor.getAll();
  res.send(allProducts);
});

app.get('/productoRandom', async (req, res) => {
  const allProducts = await contenedor.getAll();
  const  maxId = allProducts.length;
  const randomNumber = generateRandomNumber(1, maxId);
  const randomProduct = await contenedor.getById(randomNumber);
  res.send(randomProduct);
})

const generateRandomNumber = (min, max) => {
return Math.floor((Math.random() * (max - min + 1)) +min);
}

const PORT = 8080;
const server = app.listen(PORT, () =>{
  console.log(`Server on http://localhost:${PORT}/`)
})
