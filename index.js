// server.js
import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Get directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express server
const server = express();

// Custom CORS middleware
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
});

// Set up json-server with database
const router = jsonServer.router(join(__dirname, 'data/db.json'));

// Make db accessible to json-server-auth
server.db = router.db;

// Set up json-server defaults
const middlewares = jsonServer.defaults();

// Define authorization rules
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

// Apply rules and auth middleware (must be before router)
server.use(rules);
server.use(auth);

// Apply json-server defaults
server.use(middlewares);

// Use router directly (no /api prefix)
server.use(router);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});