const Router = require('express').Router();
const Feed = require('../db/models').Feed;
const Errors = require('../db').Errors;
const jsonResponse = require('../utils/api').jsonResponse;

Router.get('/:id', (req, res, next) => {
    Feed.get(req.params.id).getJoin({ ts: true }).run()
        .then((feed) => {
            jsonResponse(res, true, feed.ts || [], 'Successfully retrieved ts');
        })
        .catch(Errors.DocumentNotFound, () => {
           jsonResponse(res, false, [], 'TS not found', 404);
        })
        .catch(next);
});

module.exports = Router;