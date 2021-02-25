# Local Setup and Deployment

## Dependencies

* `node`
* `npm`
* PostgreSQL / `psql`
* Postman

## Local

1. After cloning this repo install dependencies with:

    ```sh
    npm install
    ```

2. Make sure you have Postgres running in your machine. Revise [`db/todos_api_db.sql`](db/todos_api_db.sql)
and make sure the lines that drop, create and connect to a database are uncommented. Create database and 
tables with:

    ```sh
    psql -f db/todos_api_db.sql
    ```

3. Dev server will run at `http://localhost:3100`. Start it with:

    ```sh
    npm run start:dev
    ```

## Deployment

This server is to be deployed to Heroku. You will need a Heroku account and the Heroku
CLI to follow this steps.

1. Once this repository has been cloned to your machine and while you are inside its
directory. To create a Heroku app and automatically add a `heroku` remote to your repo, run. 
    ```sh
    heroku apps:create <your_app_name>
    ```

2. Provide the Heroku app with a Postgres database with
    ```sh
    heroku addons:create heroku-postgresql:hobby-dev -a <your_app_name>
    ```

3. To create the tables in the database, take a look at [`db/todos_api_db.sql`](db/todos_api_db.sql). For local development you would want to leave uncommented the lines that refer to creating, dropping and connecting to a database. For deployment you should comment those lines and leave only the drop and create table lines. Find more [here](https://devcenter.heroku.com/articles/heroku-postgresql).

    ```sh
    cat db/todos_api_db.sql | heroku pg:psql -a <your_app_name>
    ```

4. Push this repo to Heroku to be deployed

    ```sh
    git push heroku master 
    ```

    or if you want to push a feature branch of the repo

    ```sh
    git push heroku feature_branch:master
    ```

5. To test the API using Postman create a Postman environment and add the environment variable `server_address`. Set it's value to the url heroku gave your app e.g. `https://fsw62-todos-api.herokuapp.com`. More on this [here](https://learning.getpostman.com/docs/postman/environments_and_globals/intro_to_environments_and_globals/).

    Test the API with this Postman collection. Click to Download: 

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1142998a489d1da482b0)

6. Your url should look something similar to: `https://fsw62-todos-api2.herokuapp.com`
