const mongoose = require("mongoose");
const FEED_TYPES = ['PROTEST', 'SPORTS', 'SOCIAL', 'OTHER'];

const feedSchema = new mongoose.Schema({
    type: { type: String, enum: FEED_TYPES },
    population: { type: Number, min: 0, max: 1},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    name: {type: String},
    videos: [String]
});

const Feed = mongoose.model("Feed", feedSchema);
module.exports = Feed;