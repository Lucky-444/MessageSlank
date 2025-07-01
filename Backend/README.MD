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


# Nodemailer 
install -> it
`npm i nodemailer`

read this blog => https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628


first of all goto the mail and do two-step-verification of mail on
and then go this url
`https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MRl4MIvcOttEg7UG95BSXYERt3jqGekjCHQ2yx3tFJZXyBZsAEgcNhjm_aMCwDXOOgKwnJ8Sj5hWZMSY7Ep_c6ruOx_-93b3SEFeZczYDldrYUE4A`

and then create a new app password 
and copy the password and paste it int .env , 
and export it in serverconfig.js


# message queue
reddis install redis from
`https://github.com/tporadowski/redis/releases`

we use redis as queuing system

to interact with redis we use 
`npm i ioredis` and `npm i bull`

ioredis -> helps in redis connection
bull-> helps in queuing system

you can add how many attempts you want for adding of mail in queue
add `retry in bullmq`


# add bullboard express
`npm i @bull-board/express`





