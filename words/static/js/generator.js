/*
Potentially unnecessary file: code moved to ./words.js


"use strict";
Token = function(){

  leftpad = function(str, len, pad) {
    if (len + 1 >= str.length) {
      str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
  }

  dec2hex = function(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  }

  calculateCode = function(timenow = new Date().getTime()){
    console.log("Calculating Code..");

      //Instantiate SHA object
      //Set its key
      //Calc time steps
      //Compute HMAC
      //Perform dynamic truncation
      //Return 4byte output (wordIndex) as a number
      //NOTE

      //wordIndex may be > Words.wordsLength
      //reduction is handled in Words.getWord()

    var shaObj, epochSecondsTime, timeT, offset;
    epochSecondsTime = Math.round(now/1000.0);


      //-T is 8-byte (16 Hex)
      //-Floor of (epochSecondsTime) / X
      //-Leftpadded

    timeT = leftpad(dec2hex(Math.floor(epochSecondsTime / Config.valid_time)),16, "0");

    shaObj = new jsSHA("SHA-1", "HEX", {
      hmacKey: { value: Config.key, format: "UINT8ARRAY" },
    });
    shaObj.update(timeT);
    const hmac = shaObj.getHMAC("UINT8ARRAY");

    // Do truncation and return 4-byte string NO DECIMAL REDUCTION
    // For my sanity
    console.log("For my sanity: " + hmac + " " + typeof(hmac));


    // SHA1 160-bit = 20 bytes = 20 wide Uint8Array
    // HOTP/TOTP dynamic truncation -> found in RFC4226
    // Get least significant bits of hmac to use as offset
    offset = hmac[19] & 0xf;
    // Return wordIndex by selecting bytes from hmac using offset -> most significant bit masked
    wordIndex = (hmac[offset]  & 0x7f) << 24 | (hmac[offset+1] & 0xff) << 16 | (hmac[offset+2] & 0xff) <<  8 | (hmac[offset+3] & 0xff);
    return wordIndex;
  }

  return {
    "calculateCode": calculateCode
  };
}();

*/
