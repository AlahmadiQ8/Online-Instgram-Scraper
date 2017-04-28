'use strict';

const errors = require('request-promise/errors');
const _ = require('lodash');
const request = require('request-promise').defaults({
  baseUrl: 'https://www.instagram.com',
  json: true,
});

const maxIdQuery = query => (
   _.hasIn(query, 'max_id')
    ? `?max_id=${query.max_id}`
    : ''
);

module.exports.getData = (event, context, callback) => {

  const user = event.pathParameters.user;
  const query = maxIdQuery(event.queryStringParameters);
  const commonHeaders = {
    "Access-Control-Allow-Origin" : "http://localhost:3000"
  };

  request.get(`/${user}/media${query}`)
    .then(instgramRes => {
      return {
        statusCode: 200,
        body: JSON.stringify(instgramRes),
        headers: commonHeaders
      }
    })
    .catch(err => {
      if (err instanceof errors.StatusCodeError) {
        const message = `${err.response.statusCode} - ${err.response.statusMessage}`;
        return {
          statusCode: 404,
          body: JSON.stringify(message),
          headers: commonHeaders
        }
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify(err),
          headers: commonHeaders
        }
      }
    }).then(responseObject => {
      callback(null, responseObject);
    })

};
