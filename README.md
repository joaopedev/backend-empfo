# Backend EMPFO

This is API Restful for app services mobile Empfo.

## System dependencies 

- Node.js
- Docker

## Data Base

This application comes with a `docker-compose.yml` file used to configure a PostgreSQL database on the host.

To initialize the development database use the `startDB.sh` script in the project root. To pause, use `stopDB.sh`.

If you are familiar with `docker-compose`, everyday commands will work normally.

## Interact with the API using Postman

This application comes with a collection of Postman requests from the project root that will help you navigate this service.

Use Postman's `Import` function to import the collection.

**Attention:** the data in the requests body may need changes to work

## Importing the Collection into Postman

1. Make sure Postman is installed. Otherwise, you can download it [here](https://www.postman.com/downloads/).

2. Open the Postman.

3. In the top left corner, click the "Import" button to open the import window.

4. Selecione a opção "Import from Link."

5. Copy and paste the project collection URL:

6. Click the "Import" button and the collection will be added to your Postman.

For each request, check the following points:

- **Environment Variables:** If the collection uses environment variables, make sure they are configured correctly in Postman.

- **Authentication:** If the API requires authentication, make sure you have configured the necessary credentials in the request settings.

- **Request Body:** Some endpoints may require you to adjust the request body to meet your specific needs. Review and customize the request body as needed.

## Performing Requests

After importing the collection and making the necessary adaptations, you are ready to make requests to the API. Follow the steps below:

1. I recommend that for better use, you start first by creating the user.

2. Afterwards, you can search for all users to find the user ID created.

3. With the id, tests can be carried out on the search routes by ID and delete.

4. With created users, the routes for forgot password and update password can be used.

## Migrations e Seeding

With the database running, install the `knex` CLI to perform migrations and seeding.

```sh
knex migrate:latest
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

# Database port
PORT_BD=5432

# Database user 
USER_BD=you_adminer_user

# Database password
PASSWORD_BD=super_secret

# Database name
NAME_BD=myDataBase

# Jw token
JW_TOKEN='stringToken'

EOL
```

## Start development server

```sh
npm run dev
```

## Thanks

If you are interested in contributing to improving our API, feel free to contact us! We don't have much experience so we are always open to advice, thank you everyone!

