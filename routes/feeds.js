const router = require('express').Router();
const jsonResponse = require('../utils/api').jsonReponse;
const Feed = require('../db/models').Feed;
const Errors = require('../db').Errors;

router.get('/', (req, res, next) => {
    Feed.run().then((feeds) => {
        jsonResponse(res, true, feeds, 'Successfully retrieved feeds');
    })
        .catch(next)
});
router.get('/:id', (req, res, next) => {
    Feed.get(req.params.id).run().then((feed) => {
        jsonResponse(res, true, feed, 'Successfully retrieved feed');
    }).catch(Errors.DocumentNotFound, (err) => {
        jsonResponse(res, false, {}, 'Document not found', 404)
    }).catch(next)
});
router.put('/:id', (req, res, next) => {
    Feed.get(req.params.id).run().then((feed) =>
        feed.merge(req.body).save()
    ).catch(Errors.DocumentNotFound, (err) => {
        jsonResponse(res, false, {}, 'Document not found', 404)
    }).error(next)
        .then((result) => {
            jsonResponse(res, true, result, 'Successfully updated feed', 200);
        })
        .catch(next)
});
router.post('/', (req, res, next) => {
    const feed = new Feed(req.body);
    feed.save()
        .then((resp) => {
            jsonResponse(res, true, resp, 'Successfully created feed', 200);
        })
        .catch(next)
});

module.exports = router;
