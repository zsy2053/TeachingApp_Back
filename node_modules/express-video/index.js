// Requiring needed modules
const fs = require('fs');
const path = require('path');

module.exports = {
  stream: function(basePath) {
    return function(req, res, next) { // Exporting the middleware
      let ext = path.extname(String(req.url)).substr(1);
      if (ext == 'mp4' || ext == 'webm') { // Checking if file format is valid
        let filePath = path.join(basePath, req.url); // Saving file path
        if(!fs.existsSync(filePath)) {
          res.status('404').end('File not found');
          return;
        }
        let stat = fs.statSync(filePath); // Getting file info
        let fileSize = stat.size; // Getting file size
        let range = req.headers.range; // Getting stream range

        if (range) { // Checking if range headers are passed
          // Calculating streaming range
          let parts = range.replace(/bytes=/, "").split("-");
          let start = parseInt(parts[0], 10);
          let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
          let chunkSize = (end - start) + 1;
          let file = fs.createReadStream(filePath, {
            start,
            end
          }); // Reading the file from range
          let headers = { // Creating HTTP Headers
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': `video/${ext}`,
          };

          res.writeHead(206, headers); // Writing the headers
          file.pipe(res); // Piping the video to the user
        } else { // If no range headers are sent, piping the whole video instead
          const head = {
            'Content-Length': fileSize,
            'Content-Type': `video/${ext}`,
          }
          res.writeHead(200, head);
          fs.createReadStream(filePath).pipe(res);
        }
      } else { // Returning an error if the format is invalid
        res.status(500).send('Invalid file format');
      }
      next(); // Calling the next handler
    }
  }
}
