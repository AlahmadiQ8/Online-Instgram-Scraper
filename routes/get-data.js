const express = require('express');
const errors = require('request-promise/errors');
// const debug = require('debug')('get-user');
const _ = require('lodash');
const request = require('request-promise').defaults({
  baseUrl: 'https://www.instagram.com',
  json: true,
});

const router = express.Router();


router.get('/:user', (req, res) => {
  if (!_.isEmpty(req.query) && !_.hasIn(req.query, 'max_id')) {
    res.redirect(`/get-data/${req.params.user}`).end();
  }

  const query = _.hasIn(req.query, 'max_id')
            ? `?max_id=${req.query.max_id}`
            : '';

  request.get(`/${req.params.user}/media${query}`)
    .then((instres) => {
      res.send(instres);
    }).catch((err) => {
      if (err instanceof errors.StatusCodeError) {
        const message = `${err.response.statusCode} - ${err.response.statusMessage}`;
        res.status(404).render('error', { message });
      }
    });
});

module.exports = router;
