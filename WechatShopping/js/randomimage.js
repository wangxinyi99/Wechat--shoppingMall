function checkRandNum (){
	var error;
	var inputVal = document.getElementById('randNum');
	//如果找不到对象则表示不用验证
	if(inputVal == null){
		return true;
	}
	
	if(inputVal.value==null||inputVal.value==''){; 
		  error = document.getElementById("cannonull").value;
		  //alert(error);
		  $("#authCode_error").text(error);
		  $("#randNum").attr("class","text highlight2");
		  //inputVal.focus() ;
		  return false; //验证失败
		 }
	 if(inputVal.value.length!=4){
		error = document.getElementById("charactors4").value
	 	//alert(error) ;
	 	$("#authCode_error").text(error);
		$("#randNum").attr("class","text highlight2");
	 	//inputVal.focus() ;
		return false; //验证失败
	 }

	 return true;
}

function validateRandNum (contextPath){
	var checkResult = checkRandNum();
	if(!checkResult){
		 //验证失败，返回
		return checkResult;
	}
	var randNum = document.getElementById("randNum").value;
	var result = true;
		var data = {
            	"randNum": randNum
            };
	    jQuery.ajax({
			url: contextPath + "/validateRandImg", 
			type:'post', 
			data:data,
			async : false, //默认为true 异步   
		    dataType : 'json', 
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success:function(retData){
				 if(!retData){
					 	result = retData;
					 	//alert(document.getElementById("errorImage").value) ;
					 	$("#authCode_error").text(document.getElementById("errorImage").value);
					 	 $("#randNum").attr("class","text highlight2");
					 	document.getElementById("randNum").value="";
					 	//document.getElementById('randNum').focus() ;
					 	changeRandImg(contextPath);
				 }
			}
			});	 
	 
	 return result;
}

    function changeRandImg(contextPath){
        var obj = document.getElementById("randImage") ;
        obj.src = contextPath + "/validCoder.random?d=" + new Date();
     }
     

    
    