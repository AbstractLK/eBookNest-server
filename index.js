import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})

// Important: Apply json-server defaults middleware
const middlewares = jsonServer.defaults()
server.use(middlewares)

// Set up the router with the database
// Note: json-server will automatically use routes.json if it's in the same directory as db.json
const router = jsonServer.router('./data/db.json');
server.db = router.db

// Apply auth middleware and router directly to the root path
server.use(auth)     // Apply auth middleware
server.use(router);  // Mount router at root

// Add a route to show a message at the root URL
// NOTE: This needs to come AFTER the router since we want to override the root endpoint
server.get('/', (req, res) => {
    res.send('Welcome to the eBookNest API!');
});

server.listen(8000, () => {
    console.log('JSON Server is running on port 8000');
});