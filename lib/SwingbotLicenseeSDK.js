(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"));
	else if(typeof define === 'function' && define.amd)
		define("SwingbotLicenseeSDK", ["axios"], factory);
	else if(typeof exports === 'object')
		exports["SwingbotLicenseeSDK"] = factory(require("axios"));
	else
		root["SwingbotLicenseeSDK"] = factory(root["axios"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideo = undefined;

var _upload = __webpack_require__(1);

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.uploadVideo = _upload2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
// Swingbot SDK
// Author: John P. Giatropoulos <john@swingbot.com>
//
var axios = __webpack_require__(2);
var apiUrl = 'https://rth7ytu7ak.execute-api.us-east-1.amazonaws.com/dev';

var handleError = function handleError(e) {
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
var getSignedUrl = function getSignedUrl(filename, apiKey) {
  return axios.get(apiUrl + '/upload?filename=' + filename, {
    headers: { 'Authorization': apiKey }
  }).then(function (uploadUrlData) {
    return uploadUrlData !== undefined ? uploadUrlData.data : Promise.reject(uploadUrlData.msg);
  }).catch(function (err) {
    return handleError(err);
  });
};
//
// Step 2: Upload the video file to S3 bucket
//
var uploadVideoFile = function uploadVideoFile(uploadUrl, file) {
  return axios.put('' + uploadUrl, file, {
    headers: { 'Content-Type': file.type }
  }).then(function (uploadUrl) {
    return uploadUrl;
  }).catch(function (err) {
    return handleError(err);
  });
};

//
// Step 3: Submit for processing
//
var processVideoFile = function processVideoFile(filename, email, processType, licenseeCampaignId, apiKey) {
  var body = { filename: filename, email: email, processType: processType, licenseeCampaignId: licenseeCampaignId };

  return axios({
    method: 'post',
    data: body,
    url: apiUrl + '/process',
    headers: { 'Authorization': apiKey }
  }).then(function (uploadUrl) {
    return uploadUrl;
  }).catch(function (err) {
    return handleError(err);
  });
};

/**
 * the main function!
 */
var uploadVideo = function uploadVideo(file, email, processType, apiKey) {
  return getSignedUrl(file.name, apiKey).then(function (urlResults) {
    return uploadVideoFile(urlResults.data.url, file);
  }).then(function (uploadResult) {
    return processVideoFile(file.name, email, processType, 50, apiKey);
  }).catch(function (err) {
    return err;
  });
};

module.exports = uploadVideo;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=SwingbotLicenseeSDK.js.map