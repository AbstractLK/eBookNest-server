import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

const server = express();
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// Important: Apply json-server defaults middleware
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Set up the router with the database
const router = jsonServer.router('./data/db.json');
server.db = router.db;

// Apply auth middleware and router directly to the root path
server.use(auth);     // Apply auth middleware
server.use(router);   // Mount router at root

// Add a route to show a message at the root URL
server.get('/', (req, res) => {
    res.send('Welcome to the eBookNest API!');
});

// For local development
if (process.env.ENVIRONMENT !== 'production') {
    server.listen(PORT, () => {
        console.log(`JSON Server is running on port ${PORT}`);
    });
}

// Export for Vercel
export default server;