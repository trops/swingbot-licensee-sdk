//
// Swingbot SDK
// Author: John P. Giatropoulos <john@swingbot.com>
//
const axios = require('axios');
const apiUrl = 'https://rth7ytu7ak.execute-api.us-east-1.amazonaws.com/dev';

const handleError = (e) => {
  if ('response' in e) {
    return Promise.reject({
      response: e.response,
      message: 'Make sure your API key is valid'
    });
  }
  return Promise.reject(e);
};

//
// Step 1: Get the signed URL to upload the video
//
const getSignedUrl = (filename, apiKey) => {
  return axios.get(`${apiUrl}/upload?filename=${filename}`, {
    headers: { 'Authorization': apiKey }
  })
    .then(uploadUrlData => {
      return (uploadUrlData !== undefined) ?
        uploadUrlData.data : Promise.reject(uploadUrlData.msg);
    })
    .catch(err => handleError(err));
};
//
// Step 2: Upload the video file to S3 bucket
//
const uploadVideoFile = (uploadUrl, file) => {
  return axios.put(`${uploadUrl}`, file, {
    headers: { 'Content-Type': file.type }
  })
    .then(uploadUrl => uploadUrl)
    .catch(err => handleError(err));
};

//
// Step 3: Submit for processing
//
const processVideoFile = (filename, email, processType, licenseeCampaignId, apiKey) => {
  const body = { filename, email, processType, licenseeCampaignId };

  return axios({
    method: 'post',
    data: body,
    url: `${apiUrl}/process`,
    headers: { 'Authorization': apiKey }
  })
    .then(uploadUrl => uploadUrl)
    .catch(err => handleError(err));
};

/**
 * the main function!
 */
const uploadVideo = (file, email, processType, apiKey) => {
  return getSignedUrl(file.name, apiKey)
    .then(urlResults => uploadVideoFile(urlResults.data.url, file))
    .then(uploadResult => processVideoFile(file.name, email, processType, 50, apiKey))
    .catch(err => err);
};

export default uploadVideo;
