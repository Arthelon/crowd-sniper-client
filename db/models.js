const thinky = require('./index');
const FEED_TYPES = require('../constants').FEED_TYPES;
const FEED_EVENTS = require('../constants').FEED_EVENTS;
const type = thinky.type;

// Create a model - the table is automatically created
const Feed = thinky.createModel("Feed", {
    id: type.string(),
    name: type.string(),
    type: type.string().enum(FEED_TYPES),
    population: type.number().min(0).max(1),
    coordinates: "Point",
    videos: [type.string()]
});

const liveUpdates = (io) => {
    Feed.changes().then((feeds) => {
        feeds.each((err, feed) => {
           if (err) {
               console.log(err);
           } else {
               const data = JSON.stringify(feed);
               if (feed.isSaved() === false) {
                   io.emit(FEED_EVENTS.delete, data)
               }
               else if (feed.getOldValue() == null) {
                   io.emit(FEED_EVENTS.insert, data);
               }
               else {
                   io.emit(FEED_EVENTS.update, data);
               }
           }
        });
    }).error((err) => {
        console.log(err)
    })
};

exports.liveUpdates = liveUpdates;
exports.Feed = Feed;