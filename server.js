const keyPublishable = "pk_test_qglYITXHpo49PPtffT2vQEcg"
const keySecret = "zf66Fic9htXi5nhoWfGAeQcwSkkAAJ5lofnJEEAK8zP+Sio7LiyLNiSkL3ML9Zw0hKxaDHebcdiIX2hBzph7cLej85fG82NIBrxki60XTkZrY4qLHAcA0TuT7Ts2tyrb"

var stripe = require("stripe")(keySecret);
var path = require('path');
var expressVideo = require('express-video')
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  User = require('./models/UserModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/iTA');

// app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/videos', expressVideo.stream(path.join(__dirname, '/')))

var routes = require('./routes/Routes');
routes(app);

app.listen(port, () => {
  console.log('iTA RESTful API server started on: ' + port);
});
