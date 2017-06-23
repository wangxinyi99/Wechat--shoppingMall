$(document).ready(function() {
   
   $("#sousou").click(function(){
	   $(".order_top_count").show();
   });
   
   $("#nav-left_ll").click(function(){
	   $(".order_top_count").hide();
   });
});


function searchproduct(){
   var keyword = document.getElementById("keyword").value;
   if(keyword == undefined || keyword==null ||keyword ==""){
     alert("请输入搜索关键字！");
     return false;
   }
   document.getElementById("searchform").submit();
}