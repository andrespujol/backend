const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hola mundo')
})


server.listen(8080, () => {
    console.log('servidor en el puerto 8080');
})