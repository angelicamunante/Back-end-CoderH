const socket = io();
const productsTable = document.getElementById('products-table')
const messageBoard = document.getElementById('message-board')
const productAdd = document.getElementById('product-add')
const sendMessage = document.getElementById('send-message')

async function renderProducts(products) {
    const productsTemplate = await (await fetch('products.hbs')).text()
    const template = Handlebars.compile(productsTemplate)
    return template({ products })
}

function renderMessages(messages) {
    if (messages.length > 0) {
        const html = messages.map(message => {
            return `
                <p class="message">
                    <span class="message-sender">${message.email}</span>
                    <span class="message-date">[${message.date}]</span>
                    <span class="message-text">${message.message}</span>
                </p>
            `;
        }).join(' ');
        messageBoard.innerHTML = html
    } else {
        messageBoard.innerHTML = '<p class="message">No hay mensajes</p>'
    }
}

socket.on('products', function (products) {
    renderProducts(products).then(data => {
        productsTable.innerHTML = data
    });
})

socket.on('messages', function (messages) {
    renderMessages(messages)
})

productAdd.addEventListener('click', function (e) {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('NEW_PRODUCT', product)
})

sendMessage.addEventListener('click', function (e) {
    e.preventDefault();
    const message = {
        email: document.getElementById('email').value,
        date: new Date().toLocaleString(),
        message: document.getElementById('message').value
    }
    socket.emit('NEW_MESSAGE', message)
})