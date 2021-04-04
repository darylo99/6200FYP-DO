"use strict";
Token = function(){
  /*
    Using a similar naming convention as RFC6238 for vars
     TX -> Length of validity for OTPs
     K -> Key
     (T0 is unix epoch and infered from Date().getTime() method)
  */

  const TX = 10;
  /* !!!! UNKNOWN BEHAVIOUR !!!!! Possible cause of problems */
  const K = Uint8Array()[JSON.parse( {{ key }} )];

  calculateCode = function(){
    console.log("Calculating Code..");
  }

  return {
    "calculateCode": calculateCode
  };
}();
