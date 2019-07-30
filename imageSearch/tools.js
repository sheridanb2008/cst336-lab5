const request = require("request");
const mysql = require('mysql');

module.exports = {
  
  
/**
* Return random image URLs from an API
* @param string keyword - search term
* @param int    imageCount - number of random images
* @return array of images
*/
getRandomImages_cb: function (keyword, imageCount, callback){
   var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=5017c55d92f58c7fb8d1d7ed08b85bccc894d6fee0608e8db565b0aa7629984c&orientation=landscape"
  request(requestURL, function (error, response, body) {
    var parsedData =JSON.parse(body);
//     console.log("image url:", parsedData["urls"]["regular"])
  if(!error){
    var imageURLs = [];
    
    for ( let i = 0; i < 9; i++){
      imageURLs.push(parsedData[i].urls.regular);
    }
//       console.log(imageURLs);
//     return imageURLs;
    callback(imageURLs);
  } else {
    console.log("error", error);
  }  
  });// request
},

/**
* Return random image URLs from an API
* @param string keyword - search term
* @param int    imageCount - number of random images
* @return array of images
*/
getRandomImages: function (keyword, imageCount, callback){
   var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=5017c55d92f58c7fb8d1d7ed08b85bccc894d6fee0608e8db565b0aa7629984c&orientation=landscape"
   
   return new Promise( function(resolve, reject){
     request(requestURL, function (error, response, body) {
       var parsedData =JSON.parse(body);
//     console.log("image url:", parsedData["urls"]["regular"])
       if(!error){
         var imageURLs = [];
         for ( let i = 0; i < imageCount; i++){
           imageURLs.push(parsedData[i].urls.regular);
         }
//     console.log(imageURLs);
//     return imageURLs;
           resolve(imageURLs);
         } else {
           console.log("error", error);
         }  
      });// request
  })
}, // function
  
  /** 
  * creates database connection
  * @returns dc connedtion
  */
  createConnection : function(){
     var conn = mysql.createConnection({
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "babc494ffa0832",
    password: "97d39b26",
    database: "heroku_6cdb3628dd1b89a"
  })
     return conn;
  } // createConnection
}