# Campaign Project - Server
This application is built on Node (Express) and PostgreSQL db

This is the server for this application. Please set up the client via [this](https://github.com/oluwatoyinca/realign-client) repository.

## Setting Up
- Install dependencies `npm i`
- Add desired port as PORT to local .env file (e.g: `PORT=8000`)
- Create local instance of postgresql database for this application
- Add database connection string as DATABASE_URL to local .env file (e.g: `DATABASE_URL=postgres://dbusername:dbuserpassword@localhost:5432/dbname`)
- Run `npm run migrate up` to run migrations and create db entities
- Run `npm run start` and you should be up and running

## Endpoints
- POST `/conversions` `body: { name!, email!, product_choice! }`
- GET `/conversions`
- GET `/conversions?email=xxxxx&product_choice=xxxxxx`
- PATCH `/conversions/:id` `body: { status?, notes? }`
- POST `/ads-visit` `body: { utm_campaign!, page! }`
- GET `/ads-visit`