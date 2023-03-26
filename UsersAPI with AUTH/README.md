## <p align="center">UsersAPI with AUTH</p>

## This API is made with NodeJS, Express, MongoDB and JWT

#### To run this API you need to have NodeJS and MongoDB installed

### MongoDB - Compass
You need MongoDB Compass to connect or see the database. Install MongoDB and MongoDB Compass and then run the API.

- #### To install MongoDB go to the [MongoDB](https://www.mongodb.com/try/download/community) website and download the version for your OS
- #### To install MongoDB Compass go to the [MongoDB Compass](https://www.mongodb.com/products/compass) website and download the version for your OS
- #### After installing MongoDB and MongoDB Compass, open MongoDB Compass and connect to the database

### Default MongoDB Connection String - localhost

```bash
mongodb://localhost:27017
```

add the database name to the connection string

```bash
mongodb://localhost:27017/users
```

### Create a .env file in the root directory and add the following:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/users
```
> In case, I added the .env file to this repository, but it is not recommended to do so. So I recommend you to modify the .env file according to your need. You can change port, url whatever you want. I don't have any sensitive data in this file. It is just for the sake of simplicity.


### Install dependencies:

```bash
npm install
```

### To run the API run the command:

```bash
npm run dev
```

### API Testing
You can test the API using Postman or Insomnia or any other API testing tool.

- #### Postman

  - ###### Download Postman from the [Postman](https://www.postman.com/downloads/) website

- #### Insomnia
    
  - ###### Download Insomnia from the [Insomnia](https://insomnia.rest/download/) website
    


## API Routes - Endpoints

Base URL: http://localhost:5000 or your custom port

- ### Users

  - #### GET /users

    - ##### Get all users

  - #### GET /user/:id

    - ##### Get a user by id

  - #### POST /user

    - ##### Create a user

  - #### PUT /user/:id

    - ##### Update a user by id

  - #### DELETE /user/:id

    - ##### Delete a user by id
