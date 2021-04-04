"use strict";
Words = function(){
  /*
  Used to access the words file.
  Returns a function to access a word on a given line.



  1 Get all words
  2 Check if its an array
    If not and set flag
  3 Return getter function to global scope
  */

  const ALLWORDS = JSON.parse(document.getElementById("dict").innerHTML);
  let wordsInArray = false;

  if (ALLWORDS.isArray()){
    console.log("Words in an acceptable format");
    wordsInArray = true;
  } else {
    console.log("Words not in acceptable format");
  }

  function getWord(index){
    /*
    Get a word with a given index

    Parameter validation
    ALLWORDS sanity check
    Access word with index index
    */

    console.log("Getting word..");
    if (isNaN(index) || !wordsInArray ) {
      console.log("Parameter is incorrect type! Returning nothing")
      return null;
    } else {
      const wordsLength = ALLWORDS.length;
      return ALLWORDS[index % wordsLength];
    }

  }

  return { getWord: getWord };
}();
