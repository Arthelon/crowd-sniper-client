const thinky = require('./index');
const FEED_TYPES = require('../constants').FEED_TYPES;
const FEED_EVENTS = require('../constants').FEED_EVENTS;
const type = thinky.type;

// Create a model - the table is automatically created
const Feed = thinky.createModel("Feed", {
    id: type.string(),
    name: type.string().required(),
    type: type.string().enum(FEED_TYPES).default('OTHER'),
    population: type.number(),
    coordinates: "Point",
    risk: type.number().min(0).max(1).default(0),
    video: type.string(),
    active: type.boolean().default(false),
    tsId: type.string()
});
const TS = thinky.createModel("TSData", {
    id: type.string(),
    data: [type.number().min(0).max(1)]
});
TS.belongsTo(Feed, 'ts', 'tsId', 'id')

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
                   console.log(data);
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