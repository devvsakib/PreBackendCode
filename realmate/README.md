## <p align="center">RealMate</p>

## This API build with NodeJS, Express, MongoDB and JWT

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
mongodb://localhost:27017/realmate
```

### Create a .env file in the root directory and add the following:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/realmate
```
> In case, I added the .env file to this repository, but it is not recommended to do so. So I recommend you to modify the .env file according to your need. You can change port, url whatever you want. I don't have any sensitive data in this file. It is just for the sake of simplicity.


### Install dependencies:

```bash
npm install 
or
yarn install
```

### To run the API run the command:

```bash
npm run dev
or
yarn dev
```

### API Testing - Tools
You can test the API using Postman or Insomnia or any other API testing tool.

- #### Postman

  - ###### Download Postman from the [Postman](https://www.postman.com/downloads/) website

- #### Insomnia
    
  - ###### Download Insomnia from the [Insomnia](https://insomnia.rest/download/) website
    


## API Routes - Endpoints

Base URL: http://localhost:5000/api/ or your custom port

- ### Users

  - #### GET /users

    - ##### Get all users


- ### Authenticated Required to access the following routes
    
  - #### GET /users/:userID
    
    - ##### Get a user by ID

             ```bash
             url: /356263
             ```

  - #### POST /auth
    
    - ##### Login a user [not implemented yet]
        - ##### Request Body

             ```json
             {
               "username": "",
               "password": ""
             }
             ```

    
  - #### POST  /users
    
    - ##### Register a user
        - ##### Request Body

             ```json
                {
                  "basicInformation": {
                        "firstName": "John",
                        "lastName": "Doe",
                        "gender": "Male",
                        "dob": "1990-01-01",
                        "createProfileFor": "Self",
                        "photo": "https://example.com/photo.jpg",
                        "introduction": "I am a friendly and outgoing person.",
                        "firstLanguage": "English",
                        "email": "john.doe@example.com",
                        "phone": "987654321"
                    },
                    "address": {
                        "country": "Bangladesh"
                    },
                	"password": "0345f3"
                }

             ```

  - #### PATCH /:userID/ - Update information individually
    
    - ##### Update /basic-information
        - ##### Request Body

            ```json
            {
                "firstName": "Sakib",
                "lastName": "Ahmed",
                "gender": "Male",
                "dob": "1990-01-01T00:00:00.000Z",
                "createProfileFor": "Self",
                "photo": "https://example.com/photo.jpg",
                "introduction": "I am a friendly and outgoing person.",
                "firstLanguage": "English",
                "email": "john.doe@example.com",
                "phone": "987654321",
                "numberOfChildren": 0,
                "maritalStatus": "Single",
                "religion": "Islam",
                "caste": "Sunni"
            }
            ```

    - ##### Update /partner-expectation
        - ##### Request Body

            ```json
            {
                "generalRequirements": String,
                "residenceCountry": String,
                "minHeight": Number,
                "maxWeight": Number,
                "maritalStatus": String,
                "childrenAcceptable": Boolean,
                "religion": String,
                "caste": String,
                "language": String,
                "education": String,
                "profession": String,
                "smokingAcceptable": Boolean,
                "drinkingAcceptable": Boolean,
                "dietAcceptable": Boolean,
                "preferredCountry": String,
                "preferredState": String,
                "complexion": String
            }
            ```

    - ##### Update /family-information
        - ##### Request Body
            
            ```json
            {
                "father": Boolean,
                "mother": Boolean,
                "siblings": Boolean
            }
            ```