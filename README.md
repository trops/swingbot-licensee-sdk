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

## Installation via <script> tag

```
<html>
<head>
  <title>Swingbot Licensee SDK Test Page</title>
  <script src="swingbot-licensee-sdk.min.js"></script>
</head>
<body>
  <h1>Working Example</h1>
  <p>Select a file to upload and press submit to begin upload</p>
  <br />
  <input type="file" id="videoFile" name="files[]" onChange="handleChange()" />
</body>
<script type="text/javascript">
  /**
   * When a user chooses a video, this will be called
   * and the upload will begin!
   */
  function handleChange() {
    const file = document.getElementById('videoFile').files[0];
    // upload the file..
    SwingbotLicenseeSDK.uploadVideo(
      file,
      'golfers@email.com',
      'analyze', // process-type
      '<YOUR-API-KEY>'
    ).then((result, err) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }).catch(err => console.log('error', err));
  }
</script>
</html>
```
