module.exports = {
   "type": process.env.DB_DIALECT,
   "host": process.env.MYSQL_DB_HOST,
   "port": process.env.MYSQL_DB_PORT,
   "username": process.env.MYSQL_USER,
   "password": process.env.MYSQL_PASSWORD,
   "database": process.env.MYSQL_DB,
   "charset": process.env.DB_CHARSET,
   "synchronize": false,
   "logging": true,
   "entities": [
      "src/app/module/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/app/module/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}