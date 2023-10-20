# Backend EMPFO

This is API Restful for app services mobile Empfo.

## System dependencies 

- Node.js
- Docker

## Data Base

This application comes with a `docker-compose.yml` file used to configure a PostgreSQL database on the host.

To initialize the development database use the `startDB.sh` script in the project root. To pause, use `stopDB.sh`.

If you are familiar with `docker-compose`, everyday commands will work normally.

## Migrations e Seeding

With the database running, install the `knex` CLI to perform migrations and seeding.

```sh
knex migrate:latest
knex seed:run
```

## Environment variables 

```sh
cat > ./.env <<EOL

# Server port
PORT= exemple 

# Secret for authorizing private routes
AUTHORIZATION= secret

# Database host
HOST_BD=thisIsMyLocalHost

# Database name
NOME_BD=myDataBase

# Database user 
USER_BD=you_adminer_user

# Database password
PASSWORD_BD=super_secret
EOL
```

## Start development server

```sh
npm run dev
```

## Interact with the API via Postman

This application comes with a collection of Postman requests from the project root that will help you navigate this service.

Use Postman's `Import` function to import the collection.


