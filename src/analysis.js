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

/**
 * getAnalysisById
 * @param {string} id the analysis unique identifier (cid)
 * @param {string} apiKey Your api key
 */
export const getAnalysisById = (id, apiKey) => {
  return axios.get(`${apiUrl}/analysis/${id}`, {
    headers: { 'Authorization': apiKey }
  })
    .then(analysisResults => {
      return analysisResults !== undefined ?
        analysisResults : Promise.reject(new Error('Unable to get analysis results'));
    }).catch(err => handleError(err));
};
