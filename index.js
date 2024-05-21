const fs = require('fs');
const path = require('path');
const axios = require('axios');
const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === '/api/posts') {
        ;(async () => {
            try {
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(data));

                fs.writeFile(path.resolve(__dirname, '1.json'), JSON.stringify(data), 'utf-8', (err) => {
                    if (err) throw err;
                    console.log('Данные записаны!');
                });
            } catch (error) {
                console.error(error);
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Internal Server Error');
            }
        })();
    } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello world!');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
