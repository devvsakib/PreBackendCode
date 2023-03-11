const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const useSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    watched: {
        type: Boolean,
        required: true
    }

})


const Watchlist = mongoose.model("Watchlist", useSchema);

module.exports = Watchlist;