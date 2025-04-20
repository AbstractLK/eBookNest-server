import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const server = express();
server.use(cors({origin: '*'}))

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

// Add a route to show a message at the root URL
server.get('/', (req, res) => {
    res.send('Welcome to the eBookNest API!');
});

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.db = router.db

const middlewares = jsonServer.defaults()
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

server.use(rules)
server.use(auth)
server.use(middlewares)
server.use(router)

server.listen(8000, () => {
    console.log('JSON Server is running on port 8000');
});