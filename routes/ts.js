const Router = require('express').Router();
const Feed = require('../db/models').Feed;
const Errors = require('../db').Errors;
const jsonResponse = require('../utils/api').jsonResponse;

Router.get('/:id', (req, res, next) => {
    let offset = req.query.offset || 0;
    Feed.get(req.params.id).getJoin({ ts: true }).run()
        .then((feed) => {
            const length = feed.ts ? feed.ts.length : 0;
            if (offset >= length) {
                offset = 0
            }
            jsonResponse(res, true, feed.ts[offset] || [], 'Successfully retrieved ts');
        })
        .catch(Errors.DocumentNotFound, () => {
           jsonResponse(res, false, [], 'TS not found', 404);
        })
        .catch(next);
});

module.exports = Router;