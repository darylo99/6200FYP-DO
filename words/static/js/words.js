var Words = (function() {
  "use strict";
  /*
  Used to select words for use as OTP and access the words file.
  Returns a function to calculate an OTP word.
  */

  // Check if dictionary has been set by dict.js
  if (Config.dict === null) {
    // Freak out!
    throw("Dictionary is null!");
  }

  function leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
      str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
  }

  function dec2hex(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  }

  function truncate(hmac){
    /*
    Do truncation and return 4-byte string NO DECIMAL REDUCTION
    SHA1 160-bit = 20 bytes = 20 wide Uint8Array
    HOTP/TOTP dynamic truncation -> found in RFC4226
    */

    let offset = hmac[19] & 0xf;
    let wordIndex = (hmac[offset] & 0x7f) << 24 |
      (hmac[offset+1] & 0xff) << 16 |
      (hmac[offset+2] & 0xff) <<  8 |
      (hmac[offset+3] & 0xff);
    return wordIndex;
  }

  function calculateIndexes(client = false, timenow = new Date().getTime()){
    console.log("Calculating wordIndex");
    /*
      Slightly modified TOTP algorthm to generate index for word
      Uses jsSHA to handle crypto operations
      Time provided by JS inbuilt Date().getTime()

      Business challenges using T
      Client should reply with T-1


      Instantiate SHA object
      Set its key
      Calc time steps
      Compute HMAC
      Perform dynamic truncation
      Return 4byte output (wordIndex) as a number
      NOTE

      wordIndex may be > Words.wordsLength
      reduction is handled in getWord()
    */

    let shaObjBusiness;
    let shaObjClient;
    let epochSecondsTime;
    let decTsteps;
    let hexBusinessT;
    let hexClientT;
    epochSecondsTime = Math.round(timenow/1000.0);

    /*
      -T is 8-byte (16 Hex)
      -Floor of (epochSecondsTime) / X
      -Leftpadded
    */
    decTsteps = Math.floor(epochSecondsTime / Config.time_step);
    hexBusinessT = leftpad(dec2hex(decTsteps), 16, "0");
    hexClientT = leftpad(dec2hex(decTsteps - 1), 16, "0");


    // !!! See if text can be removed from a jsSHA object
    shaObjBusiness = new jsSHA("SHA-1", "HEX");
    shaObjClient = new jsSHA("SHA-1", "HEX");
    shaObjBusiness.setHMACKey(Config.key, "UINT8ARRAY");
    shaObjClient.setHMACKey(Config.key, "UINT8ARRAY");

    shaObjBusiness.update(hexBusinessT);
    shaObjClient.update(hexClientT);

    const hmacBusiness = shaObjBusiness.getHMAC("UINT8ARRAY");
    const hmacClient = shaObjClient.getHMAC("UINT8ARRAY");

    return [
      truncate(hmacBusiness),
      truncate(hmacClient)
    ];
  }

  function getWords(){
    /*
    Get the OTP word
    Uses calculateIndex() to generate index to get word
    Access word with index index -> (wordIndex mod wordsLength
    */

    console.log("Getting word..");
    let indexes = calculateIndexes();
    if (Number.isNaN(indexes[0] || Number.isNaN(indexes[1]))) {
      throw("Invalid index");
    } else {
      return [
        Config.dict[indexes[0] % Config.dictlen],
        Config.dict[indexes[1] % Config.dictlen]
      ];
    }

  }

  return { getWords: getWords };
})();
