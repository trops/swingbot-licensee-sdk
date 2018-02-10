var uploadVideo = require('./upload.js');

const file = [/* from file input */];
const email = 'your@email.com';
const processType = 'analyze'; // more options to come!
const apiKey = '<your-api-key>';

uploadVideo(file, email, processType, apiKey)
  .then(result => result)
  .catch(err => err);
