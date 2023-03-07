const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000

const app = express();
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

// import routes
const watchlistRoutes = require("./routes/watched")

app.use("/", watchlistRoutes)



app.listen(PORT, () => console.log("Server running at PORT: ", PORT))