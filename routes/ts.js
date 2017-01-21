const Router = require('express').Router();
const Feed = require('../db/models').Feed;
const Errors = require('../db').Errors;
const jsonResponse = require('../utils/api').jsonResponse;

const store = {};

Router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Feed.get(id).getJoin({ ts: true }).run()
        .then((feed) => {
            let counts = store[req.session.cookie];
            if (!counts) {
                store[req.session.cookie] = {};
            }
            counts[id] = store[req.session.cookie][id] = counts ? counts[id] + 1 : 0;
            const length = feed.ts ? feed.ts.data.length : 0;
            if (counts[id] >= length - 1) {
                counts[id] = 0;
            }
            jsonResponse(res, true, feed.ts.data[counts[id]], 'Successfully retrieved ts');

        })
        .catch(Errors.DocumentNotFound, () => {
           jsonResponse(res, false, [], 'TS not found', 404);
        })
        .catch(next);
});

module.exports = Router;