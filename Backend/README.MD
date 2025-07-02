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

# WHy use ExpressAdapter
👇 Why use ExpressAdapter in bull-board?
When you use bull-board, you’re creating a web dashboard to monitor your queues.

But that dashboard needs to be served over HTTP, like a regular webpage. Since you're probably using an Express server (most Node.js apps do), the ExpressAdapter is a simple bridge that:

📦 connects bull-board to your Express server

🔧 What ExpressAdapter does:
It gives bull-board a way to say:

“Hey Express, here’s a dashboard. Please serve it when someone visits /admin/queues (or any route you pick).”

🧠 Without ExpressAdapter, bull-board wouldn’t know:
how to expose its UI to the browser

how to hook into your existing app server

Sure! Let's simplify the idea of an **adapter** 🔌:

---

### 🔧 **What is an Adapter (in simple terms)?**

An **adapter** is a piece of code that helps two things **work together**, even if they don’t naturally fit.

Think of it like:

> **A phone charger adapter** that lets your phone plug into a foreign wall socket.

In code:

> An **adapter** helps connect two systems (like `bull-board` and Express, or a queue and a dashboard).

---

### 📦 In `bull-board`, there are two types of adapters:

1. **Queue Adapter** – connects bull-board to the queue.

   * Example: `BullAdapter` or `BullMQAdapter`
   * 🔌 "Hey, this is how you read jobs from this kind of queue."

2. **Server Adapter** – connects bull-board to your web server (like Express).

   * Example: `ExpressAdapter`
   * 🔌 "Hey, serve the dashboard here in your app."

---

### 🧠 Super simple example:

Imagine:

* You have a **job queue** (like a kitchen).
* You have a **dashboard** (like a menu screen showing what’s being cooked).
* You have an **Express server** (like a restaurant website).

You need:

* A **Queue Adapter** to read what’s cooking.
* A **Server Adapter** to show it on the restaurant website.

---

### ✅ So:

| Adapter                         | Job                                 |
| ------------------------------- | ----------------------------------- |
| `BullAdapter` / `BullMQAdapter` | Talks to the job queue              |
| `ExpressAdapter`                | Shows dashboard on your Express app |

---

Let me know if you want a visual analogy or code walkthrough.

#### Must Read->  ***adapter design pattern*** { LLD }



