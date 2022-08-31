const socket = io();
const productsTable = document.getElementById('products-table');
const productAdd = document.getElementById('product-add');

async function renderProducts(products) {
    const productsTemplate = await (await fetch('products.hbs')).text();
    const template = Handlebars.compile(productsTemplate);
    return template({ products });
}

socket.on('products', function (products) {
    console.log(products);
    renderProducts(products).then(data => {
        productsTable.innerHTML = data;
    });
})

productAdd.addEventListener('click', function (e) {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('NEW_PRODUCT', product);
})