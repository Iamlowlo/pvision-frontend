const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

const baseURL = 'https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod';

app.get('/*', function (req, res) {
  request.get(`${baseURL}${req.url}`, {
    headers: {
      Authorization: req.headers.authorization
    }
  }, function(err, resp, body) {
    if (err) {
      console.err('ERRRRR');
      console.log(err);
    } else {
      res.send(body);
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});