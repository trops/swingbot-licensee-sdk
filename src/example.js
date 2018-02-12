const uploadVideo = require('./upload.js');
/**
 * The form data from the file upload
 *
 * <input type="file" ... />
 */
const file = [/* from file input */];

/**
 * The email address of the person IN THE VIDEO
 */
const email = 'golfer@email.com';

/**
 * You can choose different processing for your uploaded videos
 *
 * Types include:
 * - detect - only detect the body points and swing positions
 * - anlayze - detect + perform the analysis on the detected data
 */
const processType = 'analyze'; // more options to come!

/**
 * The api key that was generated for you when you registered
 */
const apiKey = '<your-api-key>';

/**
 * You can create different analysis programs in the admin panel.
 * If you want to analyze different items, or have your data handled
 * differently, or branded with logos if sending email, you can create
 * different campaigns to accomplish this.
 *
 * Enter the campaign id you wish to use
 */
const licenseeCampaignId = '<your-campaign-id>';

/**
 * send the data using the Swingbot SDK
 * You will receive a success/fail response (check docs for more details)
 */
uploadVideo(file, email, processType, licenseeCampaignId, apiKey)
  .then(result => result)
  .catch(err => err);
