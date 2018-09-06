# express-video 1.0.4
A video streaming middleware for express.js

**Note:** Currently, this can only stream files in mp4 and webm format.

## Usage
Installation: `npm install express-video --save`

Code Sample:
```javascript
const express = require('express');
const path = require('path');
const expressVideo = require('../index.js');
const app = express();

app.use('/videos', expressVideo.stream(path.join(__dirname, '/' /* The folder with the files you'd like to stream when accessed */)));

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
```
