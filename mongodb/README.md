# <p align="center">Cheatsheet for MongoDB</p>
For better use, create a collection name **content** <br>
In this cheatsheet, ***content*** is a collection name.
> db.content.drop(); content is collection name


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
db.createCollection("content")
```

7. Delete Collection
```shell
db.content.drop()
```

8. Insert rows in Collection
```shell
db.content.insert({
    name: "DevvSakib",
    role: "Frontend Developer",
    fvstack: "React",
    tool: "vscode"
})
```

9. Insert multiple rows in Collection
```shell
db.content.insertMany([
    {
    name: "DevvSakib",
    role: "Frontend Developer",
    fvstack: "React",
    tool: "vscode"
},
    {
    name: "Unknown",
    role: "Frontend Developer",
    fvstack: "React",
    tool: "figma"
}
])
```
<img src="./img/insertManyRows.png">

10. Find all rows in Collection
```shell
db.content.find()
db.content.find().pretty()
```
> pretty()  for better view

11. Find specific rows in Collection
```shell
db.content.find({name: "DevvSakib"})
db.content.find({role: "Frontend Developer", name: "DevvSakib"}) 
```
<img src="./img/findrow.png">

12. Find rows with limit
```shell
db.content.find().limit(1)
```

13. Count rows in Collection
```shell
db.content.find().count()
db.content.find({name: "DevvSakib"}).count()
```

```shell
db.content.find().sort({name: 1})
db.content.find().sort({id: 1})
```
> 1 for ascending order and -1 for descending order

15. Update row
```shell
db.content.update({name: "DevvSakib"}, {$set: {name: "0xDevvSakib"}})
```
<img src="./img/update.png">

In case if there are no matching row then it will create a new row if you add upsert: true
```shell
db.content.update({name: "NotInCollection"}, {$set: {name: "0xDevvSakib"}}. {upsert: true})
```
> {name: "NotInCollection"} is the query and {$set: {name: "0xDevvSakib"}} is the update. {upsert: true} is the option. In case query doesn't match any row then it will create a new row.
<img src="./img/upsert.png">

16. Delete row in Collection
```shell
db.content.remove({name: "0xDevvSakib"})
```

17. Delete all rows in Collection
```shell
db.content.remove({})
```

### Update Operators

18. Increament operator
```shell
db.content.update({name: "0xDevvSakib"}, {$inc: {age: 4}})
```
<img src="./img/increament.png">

19. Rename operator
```shell
db.content.update({name: "0xDevvSakib"}, {$rename: {age: "newAge"}})
```
<img src="./img/rename.png">
```shell
db.content.update({}, {$rename: {age: "newAge"}})
```
> {} for all rows

20. Push operator
```shell
db.content.update({name: "0xDevvSakib"}, {$push: {skills: "MongoDB"}})
```
<img src="./img/push.png">

21. Delete operator
```shell
db.content.remove({name: "Unknown"})
```

22. Less than operator
```shell
db.content.find({age: {$lt: 30}})
```

22. Greater than operator
```shell
db.content.find({age: {$gt: 30}})
```


## Connecting online MongoDB Cluster

1. Create a account in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project
3. Create a new cluster
4. Create a new database user

<img src="./img/c1.png">
<img src="./img/c2.png">

### Copy this url and paste it in Compass
<img src="./img/c3.png">

### Remove the < > from the connection string and replace the password with your password
<img src="./img/c4.png">

### Here you will see your Database name
<img src="./img/c5.png">

**DONE! Now you can connect your MongoDB Cluster with Compass**