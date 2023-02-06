const express = require("express");
const mongoose = require("mongoose");

const mongoseUrl = "mongodb://localhost:27017/TUTORIAL"
// base url - mongodb://localhost:27017
// db name - TUTORIAL

mongoose.connect(mongoseUrl, (error, db) => {
    // find one
    // db.collection("content").findOne({name: "0xDevvSakib"},(err, res)=>{
    //     if(err) throw new Error(err);
    //     console.log(res);
    // });

    // find all
    db.collection("content").find({}).toArray((err, res) => {
        if (err) throw new Error(err);
        console.log(res);
        db.close();
    });
})

const app = express();

app.listen(5050, () => {
    console.log("Server running...");
})