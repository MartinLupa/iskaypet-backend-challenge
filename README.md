# Iskaypet Backend Challenge

Author: Martin I. Lupa Groppelli, March 2022.

Node API done using Express, documented with Swagger and deployed to Heroku.
Endpoints:

- GET api/mascotas: returns JSON with the full list of pets in the database.
- POST api/mascotas: allows to add pets. Check schema in models/Mascota.JSON
- GET api/mascotas/kpimascotas: returns JSON with calculated KPIs.

## Deployment

https://iskaypet-backend-challenge.herokuapp.com/

## Repository

https://github.com/MartinLupa/iskaypet-backend-challenge

## How to use

Create a .env file inside api folder and replace:

```bash
MONGO_URL = database connection url
```

Navigate to project folder and run:

```bash
npm install
npm start
```

## Project info

Tested with Node v14.16.1 and npm 6.14.12.
