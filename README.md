# Demo Spring API
This is a demo node express.js api with some unit tests

## Features
 - Mongo DB Schema
 - Unit Tests
 - Dockerized (with docker-compose)
 - aws lambda docker configuration

## Cmds
```
    npm test
    node --watch src/index.mjs
    docker-compose build app
    docker-compose up
```

### test api: http://localhost:8080/
### test db: http://localhost:8080/h2-console # brew install h2 && brew services start h2
### Swagger: http://localhost:8080/swagger-ui/index.html

## Endpoints
### GET /products
### GET /products/{id}
### ### PUT /products/ 
 - req body: {"name": "name", "price": 10, "description": "test description"}
### Patch /products/{id}
 - req body: {"name": "name", "price": 10, "description": "test description"}
### DELETE /products/{id}


## To Do:
 - API Authentication and private endpoints
 - Complete Unit Tests
 - swagger docs
 - robust status codes/ error handling
 - cors policy and middleware
 - email endpoint

