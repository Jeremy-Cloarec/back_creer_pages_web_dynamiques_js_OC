const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors({
    origin: 'http://13.60.40.71:8080',
}));
server.use(middlewares);
server.use(router);

server.listen(8080, () => {
    console.log('JSON Server is running on port 8080');
});
