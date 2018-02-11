# Swingbot Licensee SDK

The Swingbot Licensee SDK is a Javascript library that allows
a Licensee to upload and process videos with Swingbot Automated Swing
Analysis system.

To get an API Key for the system, please contact john@swingbot.com or visit http://www.swingbot.com for more details.

You can install this via the script tag in your HTML page, or via npm.

## Installation via npm

```
npm install swingbot-licensee-sdk --save
```

Example usage:

```
import uploadVideo from 'swingbot-licensee-sdk';

uploadVideo(file, email, processType, apiKey)
  .then(result => console.log(result))
  .catch(err => console.log(e));
```
