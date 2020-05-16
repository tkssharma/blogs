MongoDB Mongoose Relationships
=============================

Mongoose ODM with Node JS latest features

### Getting started
```
$ git clone <this_repo_url>
$ cd app
$ npm install
```

### starting application

#### create env file 

```bash
cp example.env .env
```
content  of .env should be

```bash
ENV=development
PORT="3000"
DB="mongodb://mongo:27017/application"
```

### starting containers 
```
docker-compose up
```

### Seed database 
```
docker exec -it express-mongoose-api-master_node_1 bash
npm run seed
```