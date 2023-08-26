# Explanation

This repo is just a documentation of my lesson on learning how to use expressjs and build an API out of it. There's no other use of this repo.

# How to use

### Requirements

* NodeJS
* ExpressJS
* body-parser
* Any database

### Installation

1. Clone this repo

   ```bash
   git clone https://github.com/rayzio-jax/express-learn.git
   ```
   then go to cloned directory

   ```bash
   cd express_learn/
   ```
2. Install depedencies

   ```bash
   npm install
   ```
3. Setup your server
   In my case, I'm using port 500 instead of 80 for running the express
   `const PORT = 500`

   ## In case if you're using SQL Query instead of MySQL GUI
4. Create a database

   ```bash
   CREATE DATABASE [DATABASE_NAME]
   ```
5. Create a db table

   ```bash
   CREATE TABLE [TABLE_NAME] (
       column1 datatype [CONSTRAINTS],
       column2 datatype,
       column3 datatype,
      .... [CONSTAINTS]
   );
   ```
6. Create a fake data in selected table

   ```bash
   INSERT INTO [TABLE_NAME] (column1, column2, column..),
   VALUES (value1, value2, value..)
   ```
7. Setup a connection to database

   You can view my default setup in `connect.js`

   ```
   const db = sql.createConnection({
       host: "[ADDRESS]", // your local ip / localhost
       user: "[DB_USERNAME]", // your db user (default = root)
       password: "[DB_PASSWORD]", // your db user password (default = none)
       database: "[DATABASE]" // your database
   })
   ```
8. Setup a response layout
   You can view my starter response setup in `response.js`
   ```
   const response = (statusCode, data, message, res) => {
    res.status(statusCode).json(
        [
            {
                payload: data,
                message,
                metadata: {
                    prev: "",
                    next: "",
                    current: "",
                }
            }
         ]
      )
   }
   ```
9. Run the server
   ```bash
   npm run dev
   ```

Done, now you can experiments with it by making changes on `app.js`.
