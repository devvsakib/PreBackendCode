<p align="center">
# Cheatsheet for MongoDB
</p>


1. Show All DataBase
```shell
show dbs
```

2. Create new/switch DataBase
```shell
use DBNAME
```

3. Show current DataBase
```shell
db
```

4. Delete DataBase
```shell
db.dropDatabase()
```

5. Show DataBase Collection
```shell
show collections
```

6. Create new Collection
```shell
db.createCollection("COLLECTION_NAME")
```

7. Delete Collection
```shell
db.COLLECTION_NAME.drop()
```

8. Insert rows in Collection
```shell
db.COLLECTION_NAME.insert({KEY: "VALUE"})
```

