# Generic Express Template

This project intend to build a generic backend ready to use for small apps and mvp. Ideally only to write routes model and middlewares is the objective so a backend can be created in a few hours. 

- Current Version 0.0.4

## Installation
- Clone this repository
- Open your terminal and run cd server then run 
- developement mode : ```npm install > npm start```

## Stack 
- Node.js + Express
- Better-Sqlite3 (Prepared Statement)
- Socket.IO
- ES6 

## Current State
- [x] Dynamic Routes + Filters
- [x] Dynamic Statement & Transactions
- [x] Socket Communication (For Live App updates across multiple clients)
- [x] Dynamic Middlewares (Modify params/body before it reach database transactions)
- [x] Cleanup & Bug fixes
- [x] Added Postman.

# Roadmap 
- [ ] Passport/JWT & RBAC System
- [ ] Communication Module/Interceptors 
- [ ] Strict Mode filtering (Only allow certain params/body to be passed)
- [ ] e2e Tests & Dynamic tests? 
- [ ] Migrate to Sequelize
- [ ] Migrate to Websocket 
- [ ] Implement Caching
- [ ] Implement Broker?
- [ ] Migrate to newer version of babel
- [ ] Migrations
- [ ] Cleanup on V1.0.0