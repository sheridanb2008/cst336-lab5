
$(document).ready(function(){
  
  $(".favoriteIcon").on("click", function(){
     favoriteOnClick(this); 

  });
  
  $(".keywordLink").on("click", function(){
   
//     alert($(this).text().trim());
    $.ajax({
        method: "get",
           url: "/api/displayFavorites",
          data: {"keyword":$(this).text().trim()},
      success: function(rows, status){
        $("#favorites").html("");
        
          rows.forEach(function(row){
            $("#favorites").append("<img class = 'image' src=" + row.imageURL +" width = '200' height='200'>");
            $("#favorites").append("<img class='favIcon' src='img/fav_on.png' width = '25'>")
          })
         $(".favIcon").on("click", function(){
            favoriteOnClick(this);  
          }); 
      }
       
  });
});
  
    function updateFavorite(action, imageURL){
      
      $.ajax({
        method: "get",
           url: "/api/updateFavorites",
          data: {"imageURL": imageURL,
               "keyword":$("#keyword").val(),
               "action" : action
              }
      })
    }
  
  function favoriteOnClick(param) {
    var imageURL = $(param).prev().attr("src")
    
    if ($(param).attr("src") == "img/fav_off.png"){
      $(param).attr("src", "img/fav_on.png");
      updateFavorite("add",imageURL); // inserts new record
    } else {
      $(param).attr("src", "img/fav_off.png");
      updateFavorite("delete", imageURL); // del record
  }
  }
});