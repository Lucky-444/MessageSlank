# Install all dependencies

like `nodemon , http-status-codes , dotenv, mongoose, express, body-parser, cors, bcrypt, jsonwebtoken, and morgan`

# SetUp esLint for expreess

Read This document
`https://medium.com/@sindhujad6/setting-up-eslint-and-prettier-in-a-node-js-project-f2577ee2126f`

# Adding extra Plugins in esLint

simple import sort

# Run With `npm start`

# Added zod for request validation

install -> `npm i zod`

# Postman Scripts (writing post response scripts in POSTMAN)

1-> pre request
2-> post request : ->

go to global variable section
create a authToken here
intial value : authToken = '' {empty}

inside postman -> pm is a global var
for parsing the response you use
`pm.response.json`

we set the token as collectionVariables
pm.collectionVariables.set("authToken" , pm.response.json());

or

{
const jsonResponse = pm.response.json();
console.log(jsonResponse.data);
pm.collectionVariables.set('authToken', jsonResponse.data.token);
}


# UUID (universaly unique identifier) 
read this blog => https://www.cockroachlabs.com/blog/what-is-a-uuid/


<!-- for joincode we use UUID and not take the whole UUID String
     we just parse out the first 6-chars from it
     in that we can maintain our joincode always unique -->



